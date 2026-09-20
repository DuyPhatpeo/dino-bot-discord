const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Xem thông tin chi tiết về một người dùng trong server")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Người dùng cần xem thông tin (mặc định là chính bạn)")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("target") || interaction.user;
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    const embed = new EmbedBuilder()
      .setColor(member?.displayHexColor || "#2ec99d")
      .setTitle(`Thông Tin Người Dùng • ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        {
          name: "Tên & Tag",
          value: `\`${user.tag}\`${user.bot ? " `[BOT]`" : ""}`,
          inline: true,
        },
        {
          name: "ID Người Dùng",
          value: `\`${user.id}\``,
          inline: true,
        },
        {
          name: "Biệt danh server",
          value: member?.nickname ? `\`${member.nickname}\`` : "*Không có*",
          inline: true,
        },
        {
          name: "Ngày tạo tài khoản",
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>\n(<t:${Math.floor(user.createdTimestamp / 1000)}:R>)`,
          inline: false,
        }
      );

    if (member) {
      embed.addFields(
        {
          name: "Ngày tham gia server",
          value: member.joinedTimestamp
            ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>\n(<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`
            : "*Không xác định*",
          inline: false,
        },
        {
          name: `Vai trò [${member.roles.cache.size - 1}]`,
          value:
            member.roles.cache
              .filter((r) => r.id !== interaction.guildId)
              .map((r) => `${r}`)
              .slice(0, 15)
              .join(", ") || "*Không có vai trò*",
          inline: false,
        }
      );
    }

    embed
      .setFooter({
        text: `Yêu cầu bởi ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
