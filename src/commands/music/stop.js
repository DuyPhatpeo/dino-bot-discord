// src/commands/music/stop.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getQueue } = require("../../utils/musicManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Dừng phát nhạc, xóa hàng đợi và rời kênh thoại"),

  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: "Bạn cần phải tham gia một kênh thoại trước khi dùng lệnh này.",
        ephemeral: true,
      });
    }

    const queue = getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({
        content: "Bot hiện không phát nhạc trong máy chủ này.",
        ephemeral: true,
      });
    }

    queue.destroy();

    const embed = new EmbedBuilder()
      .setColor("#ef4444")
      .setDescription("⏹️ Stopped playing and left the voice channel");

    await interaction.reply({ embeds: [embed] });
  },
};
