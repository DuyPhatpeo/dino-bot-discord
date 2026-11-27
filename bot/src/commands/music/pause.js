// src/commands/music/pause.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getQueue } = require("../../utils/musicManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Tạm dừng bài hát đang phát"),

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
        content: "Hiện không có bài hát nào đang phát để tạm dừng.",
        ephemeral: true,
      });
    }

    const paused = queue.pause();
    if (!paused) {
      return interaction.reply({
        content: "Không thể tạm dừng bài hát (bài hát có thể đã bị tạm dừng trước đó).",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#f59e0b")
      .setDescription(`⏸️ Paused **${queue.currentTrack.title}**`);

    await interaction.reply({ embeds: [embed] });
  },
};
