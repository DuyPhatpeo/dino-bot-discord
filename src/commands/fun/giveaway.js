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
      .setColor("#2ec99d")
      .setAuthor({ name: "MINI GAMES" })
      .setTitle("Giveaway Máy Chủ")
      .addFields(
        {
          name: "Phần Thưởng",
          value: `🎁 **${prize}**`,
          inline: true,
        },
        {
          name: "Thời Gian",
          value: `⏳ **${duration} giây**`,
          inline: true,
        },
        {
          name: "Cách Tham Gia",
          value: "Bấm nút **Tham gia** bên dưới để nhận vé may mắn.",
          inline: false,
        }
      )
      .setFooter({ text: `Tạo bởi ${interaction.user.tag}` })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("giveaway_join")
        .setLabel("Tham gia")
        .setStyle(ButtonStyle.Success),
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
          content: "Bạn đã tham gia giveaway thành công!",
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
          content: `**Danh sách người tham gia (${participants.size}):**\n${list}`,
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

      // Vô hiệu hóa nút trên tin nhắn giveaway gốc
      const disabledRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("giveaway_ended")
          .setLabel("Đã kết thúc")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      );

      try {
        await message.edit({ components: [disabledRow] });
      } catch (e) {
        // Bỏ qua nếu tin nhắn bị xóa
      }

      const resultEmbed = new EmbedBuilder()
        .setColor(winner ? "#57f287" : "#ed4245")
        .setAuthor({ name: "MINI GAMES" })
        .setTitle("Kết Quả Giveaway")
        .addFields(
          {
            name: "Phần Thưởng",
            value: `🎁 **${prize}**`,
            inline: true,
          },
          {
            name: "Người May Mắn",
            value: winner ? `🏆 ${winner}` : "Không có ai tham gia",
            inline: true,
          }
        )
        .setFooter({ text: "Giveaway đã kết thúc" })
        .setTimestamp();

      // Gửi thông báo MỚI vào kênh
      await interaction.channel.send({
        content: winner
          ? `🎉 Chúc mừng ${winner} đã may mắn trúng giải thưởng **${prize}**!`
          : undefined,
        embeds: [resultEmbed],
      });
    });
  },
};



