const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Tạo một giveaway")
    .addStringOption((option) =>
      option
        .setName("prize")
        .setDescription("Phần thưởng cho giveaway")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Thời gian diễn ra (tính bằng giây)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const prize = interaction.options.getString("prize");
    const duration = interaction.options.getInteger("duration");

    const embed = new EmbedBuilder()
      .setColor("#9b59b6") // Xanh tím mộng mơ
      .setTitle("Giveaway!")
      .setDescription(
        `**Phần thưởng:** ${prize}\n⌛ Kết thúc sau: **${duration} giây**\n\nBấm nút bên dưới để tham gia!`
      )
      .setFooter({ text: `Tạo bởi ${interaction.user.tag}` })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("giveaway_join")
        .setLabel("Tham gia")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("giveaway_list")
        .setLabel("Danh sách")
        .setStyle(ButtonStyle.Secondary)
    );

    const message = await interaction.reply({
      embeds: [embed],
      components: [row],
      fetchReply: true,
    });

    // Lưu danh sách người tham gia
    const participants = new Set();
    const collector = message.createMessageComponentCollector({
      time: duration * 1000,
    });

    collector.on("collect", async (btnInteraction) => {
      if (btnInteraction.customId === "giveaway_join") {
        participants.add(btnInteraction.user.id);
        await btnInteraction.reply({
          content: `Bạn đã tham gia giveaway!`,
          ephemeral: true,
        });
      }

      if (btnInteraction.customId === "giveaway_list") {
        const list =
          participants.size > 0
            ? Array.from(participants)
              .map((id) => `<@${id}>`)
              .join(", ")
            : "Chưa có ai tham gia.";

        await btnInteraction.reply({
          content: `**Danh sách người tham gia:**\n${list}`,
          ephemeral: true,
        });
      }
    });

    collector.on("end", async () => {
      let winner = null;
      if (participants.size > 0) {
        const ids = Array.from(participants);
        const randomId = ids[Math.floor(Math.random() * ids.length)];
        winner = `<@${randomId}>`;
      }

      const resultEmbed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle("Giveaway Kết Thúc")
        .setDescription(
          winner
            ? `Chúc mừng ${winner} đã thắng **${prize}**!`
            : "Không có ai tham gia giveaway."
        )
        .setTimestamp();

      await message.edit({ embeds: [resultEmbed], components: [] });
    });
  },
};
