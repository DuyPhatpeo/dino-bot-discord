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
      .setColor("#2ec99d")
      .setAuthor({ name: "TIỆN ÍCH" })
      .setTitle(`🖼️ Ảnh Đại Diện: ${user.username}`)
      .setURL(avatarURL)
      .setImage(avatarURL)
      .setDescription(`[Tải xuống ảnh chất lượng cao](${avatarURL})`)
      .setFooter({ text: `Yêu cầu bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
