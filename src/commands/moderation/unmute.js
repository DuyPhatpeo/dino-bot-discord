const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Gỡ mute (timeout) khỏi một thành viên")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Người cần gỡ mute")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getMember("target");

    if (!target) {
      return interaction.reply({
        content: "❌ Không tìm thấy thành viên này trong server.",
        ephemeral: true,
      });
    }

    if (!target.isCommunicationDisabled()) {
      return interaction.reply({
        content: "❌ Thành viên này hiện không bị tắt tiếng.",
        ephemeral: true,
      });
    }

    try {
      await target.timeout(null);

      const embed = new EmbedBuilder()
        .setColor("#57f287")
        .setAuthor({ name: "QUẢN TRỊ VIÊN" })
        .setTitle("🔊 Gỡ Tắt Tiếng Thành Viên")
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .addFields(
          {
            name: "Thành Viên",
            value: `${target} (\`${target.user.tag}\`)`,
            inline: true,
          },
          {
            name: "Quản Trị Viên",
            value: `${interaction.user}`,
            inline: true,
          }
        )
        .setFooter({
          text: `Thực hiện bởi ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "❌ Không thể gỡ mute. Hãy kiểm tra quyền của bot.",
        ephemeral: true,
      });
    }
  },
};

