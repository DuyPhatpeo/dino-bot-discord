const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Xem thông tin chi tiết và thống kê của máy chủ"),

  async execute(interaction) {
    const { guild } = interaction;
    const owner = await guild.fetchOwner();

    // Thống kê thành viên
    const totalMembers = guild.memberCount;
    const botCount = guild.members.cache.filter((m) => m.user.bot).size;
    const humanCount = totalMembers - botCount;

    // Thống kê kênh
    const textChannels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size;
    const voiceChannels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size;
    const categoryChannels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size;

    // Thống kê vai trò & emoji
    const rolesCount = guild.roles.cache.size - 1; // Loại trừ @everyone
    const emojisCount = guild.emojis.cache.size;
    const stickersCount = guild.stickers.cache.size;

    // Boost tier
    const boostTier = guild.premiumTier ? `Level ${guild.premiumTier}` : "Chưa có Level";
    const boostCount = guild.premiumSubscriptionCount || 0;

    const embed = new EmbedBuilder()
      .setColor("#2ec99d")
      .setAuthor({
        name: "THÔNG TIN MÁY CHỦ",
        iconURL: guild.iconURL({ dynamic: true }),
      })
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .addFields(
        {
          name: "Chủ Sở Hữu",
          value: `${owner.user} (\`${owner.user.tag}\`)`,
          inline: true,
        },
        {
          name: "Ngày Thành Lập",
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>\n(<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "ID Máy Chủ",
          value: `\`${guild.id}\``,
          inline: true,
        },
        {
          name: `Thành Viên (${totalMembers})`,
          value: `👤 Người: **${humanCount > 0 ? humanCount : totalMembers}**\n🤖 Bot: **${botCount}**`,
          inline: true,
        },
        {
          name: `Kênh (${guild.channels.cache.size})`,
          value: `Text: **${textChannels}** • Voice: **${voiceChannels}** • Danh mục: **${categoryChannels}**`,
          inline: true,
        },
        {
          name: "Server Boost",
          value: `Cấp độ: **${boostTier}**\nLượt boost: **${boostCount}**`,
          inline: true,
        },
        {
          name: "Vai Trò & Biểu Cảm",
          value: `Emojis: **${emojisCount}** • Stickers: **${stickersCount}** • Roles: **${rolesCount}**`,
          inline: false,
        }
      )

      .setFooter({
        text: `Yêu cầu bởi ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    if (guild.bannerURL()) {
      embed.setImage(guild.bannerURL({ size: 1024 }));
    }

    await interaction.reply({ embeds: [embed] });
  },
};

