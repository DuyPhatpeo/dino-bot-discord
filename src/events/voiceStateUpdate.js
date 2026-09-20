const { ChannelType, PermissionFlagsBits } = require("discord.js");
const { getGuildConfig } = require("../utils/configManager");

// Tập hợp lưu các ID phòng voice tạm đang hoạt động
const activeTempChannels = new Set();

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    const guild = newState.guild || oldState.guild;
    const config = getGuildConfig(guild.id);
    const triggerChannelId = config.tempVoiceChannelId;

    // 1. Khi người dùng tham gia kênh kích hoạt Join-to-Create
    if (triggerChannelId && newState.channelId === triggerChannelId) {
      const member = newState.member;
      const triggerChannel = newState.channel;

      try {
        // Tạo phòng voice tạm mới trong cùng danh mục (Category)
        const tempChannel = await guild.channels.create({
          name: `🔊 Phòng của ${member.displayName || member.user.username}`,
          type: ChannelType.GuildVoice,
          parent: triggerChannel.parentId || null,
          permissionOverwrites: [
            {
              id: member.id,
              allow: [
                PermissionFlagsBits.ManageChannels,
                PermissionFlagsBits.MuteMembers,
                PermissionFlagsBits.DeafenMembers,
                PermissionFlagsBits.MoveMembers,
              ],
            },
          ],
          reason: `Tạo phòng voice tạm thời cho ${member.user.tag}`,
        });

        // Đánh dấu phòng tạm
        activeTempChannels.add(tempChannel.id);

        // Di chuyển thành viên vào phòng mới
        await member.voice.setChannel(tempChannel);
      } catch (error) {
        console.error("Lỗi khi tạo phòng voice tạm thời:", error);
      }
    }

    // 2. Khi người dùng rời khỏi phòng voice
    if (oldState.channelId && oldState.channelId !== newState.channelId) {
      const oldChannel = oldState.channel;

      // Kiểm tra nếu là phòng voice tạm và không còn ai trong phòng
      if (
        oldChannel &&
        (activeTempChannels.has(oldChannel.id) ||
          oldChannel.name.startsWith("🔊 Phòng của ")) &&
        oldChannel.id !== triggerChannelId
      ) {
        if (oldChannel.members.size === 0) {
          activeTempChannels.delete(oldChannel.id);
          await oldChannel.delete().catch(() => null);
        }
      }
    }
  },
};
