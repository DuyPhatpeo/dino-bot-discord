const { EmbedBuilder } = require("discord.js");
const { getGuildConfig } = require("../utils/configManager");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const config = getGuildConfig(member.guild.id);

    // Gửi tin nhắn chào mừng nếu có cấu hình kênh
    if (config.welcomeChannelId) {
      try {
        const channel = await member.guild.channels.fetch(config.welcomeChannelId);
        if (channel && channel.isTextBased()) {
          const embed = new EmbedBuilder()
            .setColor("#2ec99d")
            .setTitle("Chào Mừng Thành Viên Mới!")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(
              `Chào mừng ${member} đã tham gia **${member.guild.name}**!\n` +
              `Hãy đọc kỹ quy tắc của server và có những phút giây vui vẻ nhé.`
            )
            .addFields(
              {
                name: "Thành viên thứ",
                value: `**#${member.guild.memberCount}**`,
                inline: true,
              },
              {
                name: "Tài khoản tạo lúc",
                value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
                inline: true,
              }
            )
            .setFooter({ text: `ID: ${member.id}` })
            .setTimestamp();

          await channel.send({ content: `Chào mừng ${member}! 🎉`, embeds: [embed] });
        }
      } catch (err) {
        console.error(`Không thể gửi tin nhắn welcome tại guild ${member.guild.id}:`, err);
      }
    }
  },
};
