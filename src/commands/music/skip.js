// src/commands/music/skip.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getQueue } = require("../../utils/musicManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Bỏ qua bài hát đang phát hiện tại"),

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
        content: "Hiện không có bài hát nào đang phát để bỏ qua.",
        ephemeral: true,
      });
    }

    const skippedTitle = queue.currentTrack.title;
    queue.skip();

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setDescription(`⏭️ Skipped **${skippedTitle}**`);

    await interaction.reply({ embeds: [embed] });
  },
};
