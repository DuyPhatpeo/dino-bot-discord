const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
  category: "moderation",
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Cài đặt thời gian làm chậm (giãn cách gửi tin nhắn) cho kênh")
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("Số giây giãn cách (0 để tắt slowmode, tối đa 21600 giây = 6 giờ)")
        .setMinValue(0)
        .setMaxValue(21600)
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Kênh cần cài đặt (mặc định là kênh hiện tại)")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const seconds = interaction.options.getInteger("seconds");
    const channel = interaction.options.getChannel("channel") || interaction.channel;

    const botMember = interaction.guild.members.me;
    if (!botMember.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: "❌ Bot không có quyền `Quản lý kênh` (Manage Channels) để thực hiện lệnh này.",
        ephemeral: true,
      });
    }

    try {
      await channel.setRateLimitPerUser(seconds, `Cài đặt bởi ${interaction.user.tag}`);

      const embed = new EmbedBuilder()
        .setColor(seconds > 0 ? "#fee75c" : "#57f287")
        .setTitle("⏱️ Cài Đặt Slowmode")
        .setDescription(
          seconds > 0
            ? `Đã bật chế độ làm chậm cho ${channel}: **${seconds} giây**/tin nhắn.`
            : `Đã tắt chế độ làm chậm cho ${channel}.`
        )
        .setFooter({ text: `Thực hiện bởi ${interaction.user.tag}` })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Lỗi khi cài đặt slowmode:", error);
      return interaction.reply({
        content: "❌ Đã xảy ra lỗi khi cố gắng cài đặt slowmode cho kênh này.",
        ephemeral: true,
      });
    }
  },
};
