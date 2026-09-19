const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Tung xúc xắc")
    .addIntegerOption((option) =>
      option
        .setName("sides")
        .setDescription("Số mặt của xúc xắc (mặc định 6)")
        .setRequired(false)
    ),

  async execute(interaction) {
    const sides = interaction.options.getInteger("sides") || 6;
    if (sides < 2) {
      return interaction.reply({
        content: "❌ Xúc xắc phải có ít nhất 2 mặt.",
        ephemeral: true,
      });
    }

    const result = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor("#2ec99d")
      .setAuthor({ name: "MINI GAMES" })
      .setTitle("🎲 Tung Xúc Xắc")
      .addFields(
        {
          name: "Số Mặt",
          value: `${sides} mặt (1 - ${sides})`,
          inline: true,
        },
        {
          name: "Kết Quả",
          value: `🎉 **${result}**`,
          inline: true,
        }
      )
      .setFooter({ text: `Người tung: ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

