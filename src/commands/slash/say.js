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
      .setColor("#2ec99d")
      .setAuthor({ name: "LỜI NHẮN" })
      .setTitle("📢 Thông Điệp")
      .addFields(
        {
          name: "Người Gửi",
          value: `${interaction.user} (\`${interaction.user.tag}\`)`,
          inline: true,
        },
        {
          name: "Nội Dung",
          value: `>>> ${message}`,
          inline: false,
        }
      )
      .setFooter({
        text: `Gửi qua DinoBot`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

