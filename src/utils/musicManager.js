// src/utils/musicManager.js
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} = require("@discordjs/voice");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Ytdl, parseVideoId, parsePlaylistId } = require("@distube/ytdl-core");

const ytdl = new Ytdl();
const musicQueues = new Map();

/**
 * Truncate string to max length with ellipsis
 * @param {string} str 
 * @param {number} max 
 * @returns {string}
 */
function truncate(str, max) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max - 3) + "..." : str;
}

/**
 * Create basic action row with uniform dark buttons (No stop button)
 * @param {boolean} isPaused 
 * @returns {ActionRowBuilder}
 */
function createMusicActionRow(isPaused = false) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("music_back")
      .setLabel("|◀")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_playpause")
      .setLabel(isPaused ? "▶" : "❚❚")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_skip")
      .setLabel("▶|")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("music_list")
      .setLabel("☰")
      .setStyle(ButtonStyle.Secondary)
  );
}

/**
 * Parse time string (e.g. "1:14:07" or "04:53") to total seconds
 * @param {string} str 
 * @returns {number}
 */
function parseTimeString(str) {
  if (!str) return 0;
  const parts = str.trim().split(":").map(Number);
  if (parts.some(isNaN)) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 1) return parts[0];
  return 0;
}

/**
 * Format seconds to HH:MM:SS or MM:SS (with leading zeros)
 * @param {number|string} seconds 
 * @returns {string}
 */
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "00:00";
  const sec = parseInt(seconds, 10);
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const remainingSecs = sec % 60;
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
}

/**
 * Get paginated queue data with distinct Now Playing indicator and navigation buttons
 * @param {MusicQueue} queue 
 * @param {import("discord.js").User} user 
 * @param {number} page 
 * @returns {{ embed: EmbedBuilder, row: ActionRowBuilder|null }}
 */
function getQueuePageData(queue, user, page = 0) {
  const PAGE_SIZE = 10;
  const totalWaiting = queue.tracks.length;
  const totalPages = Math.max(1, Math.ceil(totalWaiting / PAGE_SIZE));
  const safePage = Math.min(Math.max(0, page), totalPages - 1);

  let totalSecs = 0;
  if (queue.currentTrack?.rawDuration) totalSecs += queue.currentTrack.rawDuration;
  queue.tracks.forEach((t) => {
    if (t.rawDuration) totalSecs += t.rawDuration;
  });

  const totalLengthStr = formatDuration(totalSecs);
  const totalTracks = (queue.currentTrack ? 1 : 0) + totalWaiting;

  const embed = new EmbedBuilder()
    .setColor("#5865F2")
    .setTitle("📑 Queue");

  // Clearly marked current track
  if (queue.currentTrack) {
    embed.addFields({
      name: "Đang phát",
      value: `**[${queue.currentTrack.title}](${queue.currentTrack.url})**\nThời lượng: **${queue.currentTrack.duration}** • Yêu cầu bởi: <@${queue.currentTrack.requester.id}>`,
    });
  }

  // Paginated upcoming tracks list
  if (totalWaiting > 0) {
    const startIndex = safePage * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, totalWaiting);
    const pageTracks = queue.tracks.slice(startIndex, endIndex);

    const lines = pageTracks.map((t, idx) => {
      const pos = startIndex + idx + 1;
      const shortTitle = truncate(t.title, 45);
      return `\`${pos}.\` [${shortTitle}](${t.url}) (${t.duration})`;
    });

    embed.addFields({
      name: `Danh sách chờ (Trang ${safePage + 1}/${totalPages})`,
      value: lines.join("\n"),
    });
  } else {
    embed.addFields({
      name: "Danh sách chờ",
      value: "*Không còn bài nào trong hàng đợi.*",
    });
  }

  embed.setFooter({
    text: `Trang ${safePage + 1}/${totalPages} • Tổng cộng: ${totalTracks} bài (${totalLengthStr})`,
  });

  let row = null;
  if (totalPages > 1) {
    row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`queue_prev_${safePage}`)
        .setLabel("◀")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(safePage <= 0),
      new ButtonBuilder()
        .setCustomId(`queue_page_indicator`)
        .setLabel(`${safePage + 1}/${totalPages}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId(`queue_next_${safePage}`)
        .setLabel("▶")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(safePage >= totalPages - 1)
    );
  }

  return { embed, row };
}

/**
 * Fetch a YouTube Mix / Radio playlist using YouTube's next Innertube endpoint
 * @param {string} playlistId 
 * @param {string|null} videoId 
 * @param {import("discord.js").User} requester 
 * @returns {Promise<object|null>}
 */
async function fetchYouTubeMix(playlistId, videoId, requester) {
  try {
    const vid = videoId || (playlistId.startsWith("RD") ? playlistId.replace(/^RD/i, "") : null);
    const res = await fetch("https://www.youtube.com/youtubei/v1/next?prettyPrint=false", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: { client: { clientName: "WEB", clientVersion: "2.20240101.00.00" } },
        playlistId,
        videoId: vid,
      }),
    });
    const data = await res.json();
    const pl = data?.contents?.twoColumnWatchNextResults?.playlist?.playlist;
    if (!pl || !pl.contents) return null;

    let totalDurationSec = 0;
    const videos = pl.contents
      .map((c) => {
        const v = c.playlistPanelVideoRenderer;
        if (!v) return null;
        const durStr = v.lengthText?.simpleText || "00:00";
        const sec = parseTimeString(durStr);
        totalDurationSec += sec;
        return {
          title: v.title?.simpleText || v.title?.runs?.[0]?.text || "Unknown Title",
          url: `https://www.youtube.com/watch?v=${v.videoId}`,
          duration: durStr,
          rawDuration: sec,
          thumbnail: v.thumbnail?.thumbnails?.[v.thumbnail.thumbnails.length - 1]?.url || null,
          requester,
          type: "youtube",
        };
      })
      .filter(Boolean);

    if (videos.length === 0) return null;

    return {
      title: pl.title || "YouTube Mix",
      url: vid
        ? `https://www.youtube.com/watch?v=${vid}&list=${playlistId}`
        : `https://www.youtube.com/playlist?list=${playlistId}`,
      tracks: videos,
      totalDuration: formatDuration(totalDurationSec),
      thumbnail: videos[0]?.thumbnail || null,
    };
  } catch (error) {
    console.error("[Music] Error fetching YouTube Mix:", error);
    return null;
  }
}

/**
 * Fetch a standard YouTube playlist
 * @param {string} playlistId 
 * @param {import("discord.js").User} requester 
 * @returns {Promise<object|null>}
 */
async function fetchStandardPlaylist(playlistId, requester) {
  try {
    const pl = await ytdl.getPlaylist(playlistId);
    if (!pl || !pl.videos || pl.videos.length === 0) return null;

    let totalDurationSec = 0;
    const videos = pl.videos.map((v) => {
      const sec = Number(v.lengthSeconds) || 0;
      totalDurationSec += sec;
      return {
        title: v.title,
        url: v.url || `https://www.youtube.com/watch?v=${v.id}`,
        duration: formatDuration(sec),
        rawDuration: sec,
        thumbnail: v.thumbnails?.[v.thumbnails.length - 1]?.url || null,
        requester,
        type: "youtube",
      };
    });

    return {
      title: pl.title || "YouTube Playlist",
      url: pl.url || `https://www.youtube.com/playlist?list=${playlistId}`,
      tracks: videos,
      totalDuration: formatDuration(totalDurationSec),
      thumbnail: pl.thumbnails?.[pl.thumbnails.length - 1]?.url || videos[0]?.thumbnail || null,
    };
  } catch (error) {
    console.error("[Music] Error fetching Standard Playlist:", error);
    return null;
  }
}

/**
 * Resolve single track from YouTube URL, search term, or direct audio link
 * @param {string} query 
 * @param {import("discord.js").User} requester 
 * @returns {Promise<object>}
 */
async function resolveTrack(query, requester) {
  const trimmed = query.trim();
  const videoId = parseVideoId(trimmed);

  // Case 1: Valid YouTube video URL or ID
  if (videoId) {
    const info = await ytdl.getInfo(trimmed);
    return {
      title: info.videoDetails.title,
      url: info.videoDetails.video_url || `https://www.youtube.com/watch?v=${videoId}`,
      duration: formatDuration(info.videoDetails.lengthSeconds),
      rawDuration: Number(info.videoDetails.lengthSeconds) || 0,
      thumbnail: info.videoDetails.thumbnails?.[0]?.url || null,
      requester,
      type: "youtube",
    };
  }

  // Case 2: Direct HTTP/HTTPS audio URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    let title = "Audio Stream";
    try {
      const urlObj = new URL(trimmed);
      const filename = urlObj.pathname.split("/").pop();
      if (filename && filename.length > 0) {
        title = decodeURIComponent(filename);
      }
    } catch {
      // Use fallback title
    }
    return {
      title,
      url: trimmed,
      duration: "Stream",
      rawDuration: 0,
      thumbnail: null,
      requester,
      type: "direct",
    };
  }

  // Case 3: YouTube search query
  const searchResults = await ytdl.search(trimmed);
  if (!searchResults || searchResults.length === 0) {
    throw new Error(`Không tìm thấy bài hát nào trên YouTube với từ khóa: "${trimmed}"`);
  }
  const first = searchResults[0];
  return {
    title: first.title,
    url: first.url,
    duration: formatDuration(first.lengthSeconds),
    rawDuration: Number(first.lengthSeconds) || 0,
    thumbnail: first.thumbnails?.[0]?.url || null,
    requester,
    type: "youtube",
  };
}

/**
 * Resolve user query to either a Playlist (Mix/Standard) or a Single Track
 * @param {string} query 
 * @param {import("discord.js").User} requester 
 * @returns {Promise<{ isPlaylist: boolean, playlist?: object, track?: object }>}
 */
async function resolveInput(query, requester) {
  const trimmed = query.trim();

  // Check if query is a URL with playlist or mix parameters
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const urlObj = new URL(trimmed);
      const listId = urlObj.searchParams.get("list");
      const videoId = urlObj.searchParams.get("v");

      if (listId) {
        // If it's a YouTube Mix (starts with RD)
        if (listId.startsWith("RD")) {
          const mix = await fetchYouTubeMix(listId, videoId, requester);
          if (mix && mix.tracks.length > 0) {
            return { isPlaylist: true, playlist: mix };
          }
        }

        // Try standard playlist
        const pl = await fetchStandardPlaylist(listId, requester);
        if (pl && pl.tracks.length > 0) {
          return { isPlaylist: true, playlist: pl };
        }
      }
    } catch {
      // Fallback
    }
  }

  // Check if query is a bare playlist ID or pure playlist URL
  const directPlaylistId = parsePlaylistId(trimmed);
  if (directPlaylistId) {
    const pl = await fetchStandardPlaylist(directPlaylistId, requester);
    if (pl && pl.tracks.length > 0) {
      return { isPlaylist: true, playlist: pl };
    }
  }

  // Fallback to single track resolution
  const singleTrack = await resolveTrack(trimmed, requester);
  return { isPlaylist: false, track: singleTrack };
}

/**
 * Create AudioResource from resolved track
 * @param {object} track 
 * @returns {Promise<import("@discordjs/voice").AudioResource>}
 */
async function createTrackResource(track) {
  if (track.type === "youtube") {
    const stream = await ytdl.download(track.url, {
      filter: { hasAudio: true, hasVideo: false },
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    });
    return createAudioResource(stream);
  }
  // Direct HTTP/HTTPS audio stream
  return createAudioResource(track.url);
}

/**
 * Guild Music Queue representation
 */
class MusicQueue {
  constructor(guildId, voiceChannel, textChannel) {
    this.guildId = guildId;
    this.voiceChannel = voiceChannel;
    this.textChannel = textChannel;
    this.tracks = [];
    this.previousTracks = [];
    this.isGoingBack = false;
    this.currentTrack = null;
    this.connection = null;
    this.player = createAudioPlayer();
    this.disconnectTimeout = null;

    this.setupConnection();
    this.setupPlayer();
  }

  setupConnection() {
    this.connection = joinVoiceChannel({
      channelId: this.voiceChannel.id,
      guildId: this.guildId,
      adapterCreator: this.voiceChannel.guild.voiceAdapterCreator,
    });

    this.connection.subscribe(this.player);

    this.connection.on(VoiceConnectionStatus.Disconnected, async () => {
      try {
        await Promise.race([
          entersState(this.connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(this.connection, VoiceConnectionStatus.Connecting, 5_000),
        ]);
      } catch {
        // Permanently disconnected or kicked
        if (this.textChannel) {
          const kickedEmbed = new EmbedBuilder()
            .setColor("#64748b")
            .setDescription("I have been kicked from the voice channel");
          this.textChannel.send({ embeds: [kickedEmbed] }).catch(() => {});
        }
        this.destroy();
      }
    });

    this.connection.on("error", (error) => {
      console.error(`[Music] Connection error in guild ${this.guildId}:`, error);
    });
  }

  setupPlayer() {
    this.player.on(AudioPlayerStatus.Idle, () => {
      if (this.currentTrack && !this.isGoingBack) {
        this.previousTracks.push(this.currentTrack);
        if (this.previousTracks.length > 50) {
          this.previousTracks.shift();
        }
      }
      this.isGoingBack = false;
      this.currentTrack = null;
      this.playNext();
    });

    this.player.on("error", (error) => {
      console.error(`[Music] Player error in guild ${this.guildId}:`, error);
      if (this.textChannel) {
        const errorEmbed = new EmbedBuilder()
          .setColor("#ef4444")
          .setDescription(
            `Lỗi khi phát **${this.currentTrack?.title || "Không rõ"}**: \`${error.message || "Unknown error"}\``
          );
        this.textChannel.send({ embeds: [errorEmbed] }).catch(() => {});
      }
      this.currentTrack = null;
      this.playNext();
    });
  }

  async playNext() {
    if (this.tracks.length === 0) {
      // Auto-disconnect after 3 minutes if queue remains empty
      if (!this.disconnectTimeout) {
        this.disconnectTimeout = setTimeout(() => {
          if (this.tracks.length === 0 && !this.currentTrack) {
            if (this.textChannel) {
              const idleEmbed = new EmbedBuilder()
                .setColor("#64748b")
                .setDescription("Không còn bài hát nào trong hàng đợi. Bot đã rời kênh thoại.");
              this.textChannel.send({ embeds: [idleEmbed] }).catch(() => {});
            }
            this.destroy();
          }
        }, 3 * 60 * 1000);
      }
      return;
    }

    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = null;
    }

    const track = this.tracks.shift();
    this.currentTrack = track;

    try {
      const resource = await createTrackResource(track);
      this.player.play(resource);

      if (this.textChannel) {
        // Minimalist "Started playing" embed with accent color
        const playEmbed = new EmbedBuilder()
          .setColor("#2ec99d")
          .setDescription(`Started playing **${track.title}**`);

        const actionRow = createMusicActionRow(false);
        this.textChannel.send({ embeds: [playEmbed], components: [actionRow] }).catch(() => {});
      }
    } catch (err) {
      console.error(`[Music] Failed to stream track "${track.title}":`, err);
      if (this.textChannel) {
        const errEmbed = new EmbedBuilder()
          .setDescription(`Lỗi khi tải luồng phát cho **${track.title}**: \`${err.message}\``);
        this.textChannel.send({ embeds: [errEmbed] }).catch(() => {});
      }
      this.currentTrack = null;
      this.playNext();
    }
  }

  enqueue(track) {
    this.tracks.push(track);
    if (!this.currentTrack && this.player.state.status === AudioPlayerStatus.Idle) {
      this.playNext();
    }
  }

  enqueueMany(tracks) {
    this.tracks.push(...tracks);
    if (!this.currentTrack && this.player.state.status === AudioPlayerStatus.Idle) {
      this.playNext();
    }
  }

  skip() {
    this.player.stop();
  }

  back() {
    if (this.previousTracks.length === 0) return false;
    const prev = this.previousTracks.pop();
    if (this.currentTrack) {
      this.tracks.unshift(this.currentTrack);
    }
    this.tracks.unshift(prev);
    this.isGoingBack = true;
    this.currentTrack = null;
    this.player.stop();
    return true;
  }

  pause() {
    return this.player.pause();
  }

  resume() {
    return this.player.unpause();
  }

  destroy() {
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = null;
    }
    this.tracks = [];
    this.previousTracks = [];
    this.currentTrack = null;
    try {
      this.player.stop(true);
    } catch {}
    try {
      if (this.connection) {
        this.connection.destroy();
      }
    } catch {}
    musicQueues.delete(this.guildId);
  }
}

/**
 * Handle music button interactions (back, play/pause, skip, list, pagination)
 * @param {import("discord.js").ButtonInteraction} interaction 
 */
async function handleMusicButton(interaction) {
  try {
    const guildId = interaction.guildId;
    const queue = getQueue(guildId);

    if (!queue) {
      return interaction.reply({
        content: "Bot hiện không phát nhạc trong máy chủ này.",
        ephemeral: true,
      });
    }

    const userVoice = interaction.member.voice?.channel;
    if (!userVoice || userVoice.id !== queue.voiceChannel?.id) {
      return interaction.reply({
        content: "Bạn cần phải ở trong cùng kênh thoại với bot để điều khiển nhạc.",
        ephemeral: true,
      });
    }

    const customId = interaction.customId;

    if (customId === "music_back") {
      const success = queue.back();
      if (!success) {
        return interaction.reply({
          content: "Không có bài hát trước đó để quay lại.",
          ephemeral: true,
        });
      }
      return interaction.deferUpdate();
    }

    if (customId === "music_playpause") {
      if (queue.player.state.status === AudioPlayerStatus.Paused) {
        queue.resume();
        const row = createMusicActionRow(false);
        return interaction.update({ components: [row] }).catch(() => interaction.deferUpdate());
      } else {
        queue.pause();
        const row = createMusicActionRow(true);
        return interaction.update({ components: [row] }).catch(() => interaction.deferUpdate());
      }
    }

    if (customId === "music_skip") {
      queue.skip();
      return interaction.deferUpdate();
    }

    // Open first page of queue
    if (customId === "music_list") {
      const { embed, row } = getQueuePageData(queue, interaction.user, 0);
      const options = { embeds: [embed], ephemeral: true };
      if (row) options.components = [row];
      return interaction.reply(options);
    }

    // Queue pagination: Previous page
    if (customId.startsWith("queue_prev_")) {
      const currentPage = parseInt(customId.replace("queue_prev_", ""), 10);
      const newPage = Math.max(0, currentPage - 1);
      const { embed, row } = getQueuePageData(queue, interaction.user, newPage);
      return interaction.update({ embeds: [embed], components: row ? [row] : [] });
    }

    // Queue pagination: Next page
    if (customId.startsWith("queue_next_")) {
      const currentPage = parseInt(customId.replace("queue_next_", ""), 10);
      const newPage = currentPage + 1;
      const { embed, row } = getQueuePageData(queue, interaction.user, newPage);
      return interaction.update({ embeds: [embed], components: row ? [row] : [] });
    }
  } catch (err) {
    console.error("[Music Button Error]:", err);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: `Có lỗi xảy ra: \`${err.message}\``,
        ephemeral: true,
      }).catch(() => {});
    }
  }
}

/**
 * Get active queue for a guild
 * @param {string} guildId 
 * @returns {MusicQueue|undefined}
 */
function getQueue(guildId) {
  return musicQueues.get(guildId);
}

/**
 * Get existing queue or create a new one
 * @param {string} guildId 
 * @param {import("discord.js").VoiceBasedChannel} voiceChannel 
 * @param {import("discord.js").TextBasedChannel} textChannel 
 * @returns {MusicQueue}
 */
function getOrCreateQueue(guildId, voiceChannel, textChannel) {
  let queue = musicQueues.get(guildId);
  if (!queue || queue.connection.state.status === VoiceConnectionStatus.Destroyed) {
    queue = new MusicQueue(guildId, voiceChannel, textChannel);
    musicQueues.set(guildId, queue);
  } else if (textChannel) {
    queue.textChannel = textChannel;
  }
  return queue;
}

module.exports = {
  resolveInput,
  resolveTrack,
  getQueue,
  getOrCreateQueue,
  formatDuration,
  handleMusicButton,
  createMusicActionRow,
  getQueuePageData,
};
