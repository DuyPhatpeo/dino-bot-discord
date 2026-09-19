const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("baobuakeo")
    .setDescription("Chơi Oẳn Tù Tì (Bao – Búa – Kéo) với bot"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#2ec99d")
      .setAuthor({ name: "MINI GAMES" })
      .setTitle("Bao – Búa – Kéo")
      .addFields(
        {
          name: "Thử Thách",
          value: "Bấm nút bên dưới để ra đòn đối đầu với DinoBot.",
          inline: false,
        },
        {
          name: "Quy Tắc",
          value: "Búa đập Kéo • Kéo cắt Bao • Bao bọc Búa",
          inline: false,
        }
      )
      .setFooter({ text: "Chọn nước đi bên dưới" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("rock")
        .setLabel("Búa")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("scissors")
        .setLabel("Kéo")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("paper")
        .setLabel("Bao")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};

