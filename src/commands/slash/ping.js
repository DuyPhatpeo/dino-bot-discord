const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Kiểm tra độ trễ của bot"),
  async execute(interaction) {
    const wsPing = interaction.client.ws.ping;

    // Tạo embed
    const embed = new EmbedBuilder()
      .setColor("#2ec99d")
      .setAuthor({ name: "HỆ THỐNG" })
      .setTitle("🏓 Độ Trễ Bot")
      .addFields({
        name: "WebSocket Ping",
        value: `📶 **${wsPing}ms**`,
        inline: false,
      })
      .setFooter({
        text: `Yêu cầu bởi ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

