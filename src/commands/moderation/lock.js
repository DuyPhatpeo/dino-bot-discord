const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
  category: "moderation",
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Khóa kênh chat (ngăn thành viên gửi tin nhắn)")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Kênh cần khóa (mặc định là kênh hiện tại)")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Lý do khóa kênh")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel") || interaction.channel;
    const reason = interaction.options.getString("reason") || "Không có lý do";

    // Kiểm tra quyền của bot trong server/kênh
    const botMember = interaction.guild.members.me;
    if (!botMember.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: "❌ Bot không có quyền `Quản lý kênh` (Manage Channels) để thực hiện lệnh này.",
        ephemeral: true,
      });
    }

    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: false,
      }, { reason: `Khóa bởi ${interaction.user.tag}: ${reason}` });

      const embed = new EmbedBuilder()
        .setColor("#ed4245")
        .setTitle("🔒 Kênh Đã Bị Khóa")
        .setDescription(`Kênh ${channel} đã bị khóa bởi ${interaction.user}. Thành viên tạm thời không thể gửi tin nhắn.`)
        .addFields(
          { name: "Lý do", value: `> ${reason}`, inline: false }
        )
        .setTimestamp();

      if (channel.id !== interaction.channelId) {
        await channel.send({ embeds: [embed] });
        return interaction.reply({
          content: `✅ Đã khóa thành công kênh ${channel}.`,
          ephemeral: true,
        });
      } else {
        return interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error("Lỗi khi lock channel:", error);
      return interaction.reply({
        content: "❌ Đã xảy ra lỗi khi cố gắng khóa kênh này.",
        ephemeral: true,
      });
    }
  },
};
