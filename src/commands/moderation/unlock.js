const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
  category: "moderation",
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Mở khóa kênh chat (cho phép thành viên gửi tin nhắn trở lại)")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Kênh cần mở khóa (mặc định là kênh hiện tại)")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Lý do mở khóa kênh")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel") || interaction.channel;
    const reason = interaction.options.getString("reason") || "Không có lý do";

    const botMember = interaction.guild.members.me;
    if (!botMember.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: "❌ Bot không có quyền `Quản lý kênh` (Manage Channels) để thực hiện lệnh này.",
        ephemeral: true,
      });
    }

    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: null, // Reset về mặc định
      }, { reason: `Mở khóa bởi ${interaction.user.tag}: ${reason}` });

      const embed = new EmbedBuilder()
        .setColor("#57f287")
        .setTitle("🔓 Kênh Đã Được Mở Khóa")
        .setDescription(`Kênh ${channel} đã được mở khóa bởi ${interaction.user}. Mọi người có thể trò chuyện bình thường.`)
        .addFields(
          { name: "Lý do", value: `> ${reason}`, inline: false }
        )
        .setTimestamp();

      if (channel.id !== interaction.channelId) {
        await channel.send({ embeds: [embed] });
        return interaction.reply({
          content: `✅ Đã mở khóa thành công kênh ${channel}.`,
          ephemeral: true,
        });
      } else {
        return interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error("Lỗi khi unlock channel:", error);
      return interaction.reply({
        content: "❌ Đã xảy ra lỗi khi cố gắng mở khóa kênh này.",
        ephemeral: true,
      });
    }
  },
};
