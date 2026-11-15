// src/commands/music/list.js
const { SlashCommandBuilder } = require("discord.js");
const { getQueue, getQueuePageData } = require("../../utils/musicManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Hiển thị danh sách phát và hàng đợi các bài hát"),

  async execute(interaction) {
    const queue = getQueue(interaction.guildId);

    if (!queue || (!queue.currentTrack && queue.tracks.length === 0)) {
      return interaction.reply({
        content: "Hàng đợi nhạc hiện đang trống.",
        ephemeral: true,
      });
    }

    const { embed, row } = getQueuePageData(queue, interaction.user, 0);
    const replyOptions = { embeds: [embed] };
    if (row) replyOptions.components = [row];

    await interaction.reply(replyOptions);
  },
};
