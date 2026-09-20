const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Tạo cuộc bình chọn với các nút bấm tương tác trực tiếp")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Câu hỏi hoặc chủ đề bình chọn")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("option1")
        .setDescription("Lựa chọn 1")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("option2")
        .setDescription("Lựa chọn 2")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("option3")
        .setDescription("Lựa chọn 3")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("option4")
        .setDescription("Lựa chọn 4")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("option5")
        .setDescription("Lựa chọn 5")
        .setRequired(false)
    ),

  async execute(interaction) {
    const question = interaction.options.getString("question");
    const options = [
      interaction.options.getString("option1"),
      interaction.options.getString("option2"),
      interaction.options.getString("option3"),
      interaction.options.getString("option4"),
      interaction.options.getString("option5"),
    ].filter(Boolean);

    const pollId = `${Date.now()}_${interaction.user.id.slice(-4)}`;

    const row = new ActionRowBuilder();
    options.forEach((opt, index) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`poll_${pollId}_${index}`)
          .setLabel(`${index + 1}. ${opt.slice(0, 75)}`)
          .setStyle(ButtonStyle.Primary)
      );
    });

    const description = options
      .map((opt, index) => `**${index + 1}. ${opt}**\n⬜ 0 vote (0%)`)
      .join("\n\n");

    const embed = new EmbedBuilder()
      .setColor("#2ec99d")
      .setTitle("📊 " + question)
      .setDescription(description)
      .setFooter({
        text: `Bình chọn tạo bởi ${interaction.user.tag} • Bấm nút bên dưới để vote`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    const replyMessage = await interaction.reply({
      embeds: [embed],
      components: [row],
      fetchReply: true,
    });

    // Lưu poll vào cache client
    if (!interaction.client.polls) {
      interaction.client.polls = new Map();
    }

    interaction.client.polls.set(pollId, {
      question,
      choices: options,
      votes: {},
      message: replyMessage,
    });
  },
};
