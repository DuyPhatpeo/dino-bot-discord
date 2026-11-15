// src/commands/music/play.js
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { resolveInput, getOrCreateQueue } = require("../../utils/musicManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Phát nhạc từ YouTube (bài hát hoặc playlist) hoặc link nhạc trực tiếp")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Link YouTube/Playlist, từ khóa tìm kiếm hoặc link audio trực tiếp (.mp3, v.v.)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const query = interaction.options.getString("query");
    const voiceChannel = interaction.member.voice.channel;

    // Check if user is in a voice channel
    if (!voiceChannel) {
      return interaction.reply({
        content: "Bạn cần phải tham gia một kênh thoại trước khi dùng lệnh này.",
        ephemeral: true,
      });
    }

    // Check bot permissions in voice channel
    const permissions = voiceChannel.permissionsFor(interaction.client.user);
    if (!permissions.has(PermissionsBitField.Flags.Connect) || !permissions.has(PermissionsBitField.Flags.Speak)) {
      return interaction.reply({
        content: "Bot không có quyền kết nối hoặc phát âm thanh trong kênh thoại của bạn.",
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    try {
      // Resolve query: handles Playlist, YouTube Mix, single video, direct URL, or search
      const result = await resolveInput(query, interaction.user);
      const queue = getOrCreateQueue(interaction.guildId, voiceChannel, interaction.channel);

      if (result.isPlaylist) {
        const playlist = result.playlist;
        queue.enqueueMany(playlist.tracks);

        // Added Playlist with clean link and single-line metadata
        const embed = new EmbedBuilder()
          .setColor("#2ec99d")
          .setTitle("Added Playlist")
          .setDescription(
            `[**${playlist.title}**](${playlist.url})\nThời lượng: **${playlist.totalDuration}** • Số bài hát: **${playlist.tracks.length} bài**`
          );

        return await interaction.editReply({ embeds: [embed] });
      }

      // Single track
      const track = result.track;
      const isAlreadyPlaying = Boolean(queue.currentTrack);
      const queuePosition = isAlreadyPlaying ? queue.tracks.length + 1 : 1;
      queue.enqueue(track);

      // Added Track with clean link and single-line metadata
      const embed = new EmbedBuilder()
        .setColor("#2ec99d")
        .setTitle("Added Track")
        .setDescription(
          `[**${track.title}**](${track.url})\nThời lượng: **${track.duration}** • Vị trí: **${isAlreadyPlaying ? `#${queuePosition}` : "Đang phát ngay"}**`
        );

      return await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("[Music Command Error]:", error);
      await interaction.editReply({
        content: `Không thể tìm thấy hoặc phát nội dung này: \`${error.message}\``,
      });
    }
  },
};
