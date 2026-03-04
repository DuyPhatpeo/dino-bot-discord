const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Xem ảnh đại diện của một thành viên")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Người bạn muốn xem ảnh đại diện")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("target") || interaction.user;
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setAuthor({ name: user.tag, iconURL: avatarURL })
      .setTitle("Ảnh Đại Diện")
      .setURL(avatarURL)
      .setImage(avatarURL)
      .setDescription(`[Tải xuống ảnh đại diện chất lượng cao](${avatarURL})`)
      .setFooter({ text: `Yêu cầu bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
