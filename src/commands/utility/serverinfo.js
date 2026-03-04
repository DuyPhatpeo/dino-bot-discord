const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Xem thông tin chi tiết của server"),

  async execute(interaction) {
    const { guild } = interaction;
    const owner = await guild.fetchOwner();

    // Lấy số lượng bot và user thực
    const totalMembers = guild.memberCount;
    // (Optional: có thể đếm member thường và bot nếu fetch members, nhưng để tối ưu thì dùng tổng)

    const textChannels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size;
    const voiceChannels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size;
    const roles = guild.roles.cache.size;

    const embed = new EmbedBuilder()
      .setColor("#2b2d31") // Màu chuẩn của Discord tối
      .setAuthor({
        name: `${guild.name}`,
        iconURL: guild.iconURL({ dynamic: true }),
      })
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .addFields(
        {
          name: "Chủ sở hữu",
          value: `${owner.user} (\`${owner.user.tag}\`)`,
          inline: true
        },
        {
          name: "Ngày tạo",
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>\n(<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)`,
          inline: true
        },
        { name: "\u200B", value: "\u200B", inline: false }, // Dòng trống chia layout
        {
          name: `Thành viên (${totalMembers})`,
          value: `Lưu trữ tổng cộng **${totalMembers}** thành viên.`,
          inline: true
        },
        {
          name: `Kênh (${guild.channels.cache.size})`,
          value: `**${textChannels}** Text | **${voiceChannels}** Voice`,
          inline: true
        },
        {
          name: `Vai trò (${roles})`,
          value: `Tổng số vai trò được cấp phát trong server.`,
          inline: true
        }
      )
      .setFooter({ text: `ID Máy chủ: ${guild.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
