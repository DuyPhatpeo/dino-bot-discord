const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Bot sẽ chào lại người dùng")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Nội dung bot sẽ nói")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");

    // Tạo embed để trả về
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setAuthor({
        name: `${interaction.user.username} nói rằng:`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setDescription(`>>> ${message}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
