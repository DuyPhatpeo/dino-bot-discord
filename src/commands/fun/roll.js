const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

// Emoji xúc xắc 6 mặt tiêu chuẩn
const DICE_EMOJIS = {
  1: "⚀",
  2: "⚁",
  3: "⚂",
  4: "⚃",
  5: "⚄",
  6: "⚅",
};

/** Tạo embed kết quả đổ xúc xắc */
function createDiceEmbed(user, count, sides, rolls) {
  const total = rolls.reduce((acc, val) => acc + val, 0);

  const rollDetails = rolls
    .map((val, idx) => {
      const emoji = sides === 6 && DICE_EMOJIS[val] ? `${DICE_EMOJIS[val]} ` : "";
      return count > 1 ? `• Xúc xắc ${idx + 1}: **${emoji}${val}**` : `**${emoji}${val}**`;
    })
    .join("\n");

  const embed = new EmbedBuilder()
    .setColor("#2ec99d")
    .setAuthor({ name: "MINI GAMES" })
    .setTitle("Tung Xúc Xắc")
    .addFields(
      {
        name: "Thông Số",
        value: `Số lượng: **${count}** viên\nSố mặt: **${sides}** mặt`,
        inline: true,
      },
      {
        name: count > 1 ? "Tổng Điểm" : "Kết Quả",
        value: count > 1 ? `🎯 **${total}** điểm` : rollDetails,
        inline: true,
      }
    );

  if (count > 1) {
    embed.addFields({
      name: "Chi Tiết Từng Viên",
      value: rollDetails,
      inline: false,
    });
  }

  embed
    .setFooter({ text: `Người tung: ${user.tag}` })
    .setTimestamp();

  return embed;
}

module.exports = {
  createDiceEmbed,
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Tung xúc xắc ngẫu nhiên (chọn số lượng và số mặt)")
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("Số lượng viên xúc xắc (1 - 6, mặc định 1)")
        .setMinValue(1)
        .setMaxValue(6)
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("sides")
        .setDescription("Số mặt của xúc xắc (2 - 100, mặc định 6)")
        .setMinValue(2)
        .setMaxValue(100)
        .setRequired(false)
    ),

  async execute(interaction) {
    const count = interaction.options.getInteger("count") || 1;
    const sides = interaction.options.getInteger("sides") || 6;

    const rolls = Array.from(
      { length: count },
      () => Math.floor(Math.random() * sides) + 1
    );

    const embed = createDiceEmbed(interaction.user, count, sides, rolls);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`dice_reroll_${count}_${sides}`)
        .setEmoji("🎲")
        .setLabel("Đổ lại")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
