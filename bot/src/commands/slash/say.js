const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Bot sẽ gửi lại lời nhắn của bạn")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Nội dung bot sẽ nói")
        .setRequired(true)
    ),

  async execute(interaction) {
    const message = interaction.options.getString("message");

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setDescription(message)
      .setFooter({ text: `Gửi bởi ${interaction.user.tag}` });

    await interaction.reply({ embeds: [embed] });
  },
};
