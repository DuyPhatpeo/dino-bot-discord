// src/commands/music/resume.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getQueue } = require("../../utils/musicManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Tiếp tục phát bài hát đang tạm dừng"),

  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: "Bạn cần phải tham gia một kênh thoại trước khi dùng lệnh này.",
        ephemeral: true,
      });
    }

    const queue = getQueue(interaction.guildId);
    if (!queue || !queue.currentTrack) {
      return interaction.reply({
        content: "Hiện không có bài hát nào để tiếp tục phát.",
        ephemeral: true,
      });
    }

    const resumed = queue.resume();
    if (!resumed) {
      return interaction.reply({
        content: "Không thể tiếp tục phát (bài hát đang phát bình thường).",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#10b981")
      .setDescription(`▶️ Resumed **${queue.currentTrack.title}**`);

    await interaction.reply({ embeds: [embed] });
  },
};
