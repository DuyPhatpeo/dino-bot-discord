const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Kiểm tra độ trễ của bot"),

  async execute(interaction) {
    const wsPing = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor("#10b981")
      .setTitle("📶 Ping")
      .setDescription(`Độ trễ WebSocket: **${wsPing}ms**`);

    await interaction.reply({ embeds: [embed] });
  },
};
