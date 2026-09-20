const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const SUITS = ["♠️", "♥️", "♦️", "♣️"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

/** Tạo bộ bài 52 lá đã xáo */
function getShuffledDeck() {
  const deck = [];
  for (const s of SUITS) {
    for (const v of VALUES) {
      deck.push({ rank: v, suit: s, display: `[${v}${s}]` });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

/** Tính điểm bài Xì Dách (A = 11 hoặc 1) */
function getScore(hand) {
  let score = 0;
  let aces = 0;

  for (const card of hand) {
    if (["J", "Q", "K"].includes(card.rank)) score += 10;
    else if (card.rank === "A") { score += 11; aces++; }
    else score += parseInt(card.rank);
  }

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

/** Tạo embed giao diện sạch, loại bỏ icon thừa */
function renderEmbed(user, playerHand, dealerHand, hideDealer, message, color = "#2ec99d") {
  const pScore = getScore(playerHand);
  const pCards = playerHand.map((c) => c.display).join(" ");
  const dCards = hideDealer
    ? `${dealerHand[0].display} [?]`
    : dealerHand.map((c) => c.display).join(" ");
  const dScore = hideDealer ? "?" : `**${getScore(dealerHand)}**`;

  return new EmbedBuilder()
    .setColor(color)
    .setTitle("Xì Dách (Blackjack)")
    .setDescription(
      `**DinoBot**: ${dCards} • Điểm: ${dScore}\n` +
      `**${user.username}**: ${pCards} • Điểm: **${pScore}**\n\n` +
      `${message}`
    );
}

module.exports = {
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Chơi Xì Dách (Blackjack) nhanh với DinoBot"),

  async execute(interaction) {
    const user = interaction.user;
    const deck = getShuffledDeck();

    const player = [deck.pop(), deck.pop()];
    const dealer = [deck.pop(), deck.pop()];

    // Kiểm tra Xì Dách ngay lượt đầu
    const pScore = getScore(player);
    const dScore = getScore(dealer);

    if (pScore === 21 || dScore === 21) {
      let msg = "**XÌ DÁCH!** Bạn thắng!";
      let color = "#57f287";

      if (pScore === 21 && dScore === 21) {
        msg = "**Hòa!** Cả 2 cùng đạt Xì Dách 21 điểm.";
        color = "#fee75c";
      } else if (dScore === 21) {
        msg = "**DinoBot đạt Xì Dách!** Bạn thua.";
        color = "#ed4245";
      }

      return interaction.reply({
        embeds: [renderEmbed(user, player, dealer, false, msg, color)],
      });
    }

    // 2 Nút bấm sạch, không icon
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("bj_hit")
        .setLabel("Rút bài")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("bj_stand")
        .setLabel("Dằn")
        .setStyle(ButtonStyle.Secondary)
    );

    const msg = await interaction.reply({
      embeds: [renderEmbed(user, player, dealer, true, "Bấm **Rút bài** hoặc **Dằn**.")],
      components: [row],
      fetchReply: true,
    });

    const collector = msg.createMessageComponentCollector({
      filter: (i) => i.customId.startsWith("bj_"),
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== user.id) {
        return i.reply({ content: "Đây không phải ván của bạn!", ephemeral: true });
      }

      if (i.customId === "bj_hit") {
        player.push(deck.pop());
        const score = getScore(player);

        // Bị quắc (> 21)
        if (score > 21) {
          collector.stop("end");
          return i.update({
            embeds: [renderEmbed(user, player, dealer, false, `**Quắc (${score} điểm)!** DinoBot thắng.`, "#ed4245")],
            components: [],
          });
        }

        return i.update({
          embeds: [renderEmbed(user, player, dealer, true, `Đã rút thêm lá. Điểm hiện tại: **${score}**`)],
          components: [row],
        });
      }

      if (i.customId === "bj_stand") {
        collector.stop("end");

        // DinoBot rút bài đến khi >= 17
        while (getScore(dealer) < 17) dealer.push(deck.pop());

        const finalP = getScore(player);
        const finalD = getScore(dealer);

        let result = "";
        let color = "#2ec99d";

        if (finalD > 21) {
          result = `**DinoBot bị Quắc (${finalD} điểm)!** Bạn thắng!`;
          color = "#57f287";
        } else if (finalP > finalD) {
          result = `**Bạn thắng!** (${finalP} vs ${finalD})`;
          color = "#57f287";
        } else if (finalP < finalD) {
          result = `**DinoBot thắng!** (${finalD} vs ${finalP})`;
          color = "#ed4245";
        } else {
          result = `**Hòa nhau!** (${finalP} điểm)`;
          color = "#fee75c";
        }

        return i.update({
          embeds: [renderEmbed(user, player, dealer, false, result, color)],
          components: [],
        });
      }
    });

    collector.on("end", async (_, reason) => {
      if (reason === "time") {
        try {
          await msg.edit({
            embeds: [renderEmbed(user, player, dealer, false, "**Hết thời gian!** Ván bài đã kết thúc.", "#747f8d")],
            components: [],
          });
        } catch (e) {}
      }
    });
  },
};
