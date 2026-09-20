const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

/** Phân tích chuỗi thời gian thành milliseconds */
function parseDuration(str) {
  const regex = /(\d+)\s*(s|m|h|d|giây|phút|giờ|ngày)/gi;
  let totalMs = 0;
  let match;

  while ((match = regex.exec(str)) !== null) {
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    if (["s", "giây"].includes(unit)) totalMs += value * 1000;
    else if (["m", "phút"].includes(unit)) totalMs += value * 60 * 1000;
    else if (["h", "giờ"].includes(unit)) totalMs += value * 60 * 60 * 1000;
    else if (["d", "ngày"].includes(unit)) totalMs += value * 24 * 60 * 60 * 1000;
  }

  // Nếu người dùng chỉ nhập số thuần túy (mặc định là phút)
  if (totalMs === 0 && !isNaN(str)) {
    totalMs = parseInt(str) * 60 * 1000;
  }

  return totalMs;
}

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("remindme")
    .setDescription("Đặt lịch hẹn giờ để bot nhắc nhở công việc")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("Thời gian chờ (Ví dụ: 10m, 1h, 30s, 1d hoặc 15)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Nội dung cần nhắc nhở")
        .setRequired(true)
    ),

  async execute(interaction) {
    const timeStr = interaction.options.getString("time");
    const message = interaction.options.getString("message");

    const durationMs = parseDuration(timeStr);

    if (durationMs <= 0 || durationMs > 14 * 24 * 60 * 60 * 1000) {
      return interaction.reply({
        content: "❌ Định dạng thời gian không hợp lệ! Vui lòng nhập từ 5 giây đến tối đa 14 ngày (Ví dụ: `10m`, `1h30m`, `30s`).",
        ephemeral: true,
      });
    }

    const targetTimestamp = Math.floor((Date.now() + durationMs) / 1000);

    const embed = new EmbedBuilder()
      .setColor("#2ec99d")
      .setTitle("⏰ Đã Đặt Lịch Nhắc Nhở")
      .setDescription(`DinoBot sẽ nhắc bạn sau: <t:${targetTimestamp}:R> (<t:${targetTimestamp}:F>)`)
      .addFields(
        {
          name: "Nội dung",
          value: `> ${message}`,
          inline: false,
        }
      )
      .setFooter({ text: `Người đặt: ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    // Hẹn giờ gửi thông báo
    setTimeout(async () => {
      try {
        const reminderEmbed = new EmbedBuilder()
          .setColor("#fee75c")
          .setTitle("⏰ Lời Nhắc Của Bạn!")
          .setDescription(`Chào ${interaction.user}, đây là nội dung bạn đã nhờ tôi nhắc:`)
          .addFields(
            {
              name: "Nội dung",
              value: `> ${message}`,
              inline: false,
            }
          )
          .setTimestamp();

        // Ưu tiên gửi vào kênh gốc, nếu không được thì thử DM
        const channel = interaction.channel;
        if (channel) {
          await channel.send({
            content: `🔔 ${interaction.user} ơi, bạn có một lời nhắc!`,
            embeds: [reminderEmbed],
          });
        } else {
          await interaction.user.send({ embeds: [reminderEmbed] });
        }
      } catch (err) {
        console.error("Lỗi khi gửi reminder:", err);
      }
    }, durationMs);
  },
};
