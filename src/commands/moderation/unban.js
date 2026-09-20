const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  category: "moderation",
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Gỡ cấm (Unban) thành viên bằng User ID")
    .addStringOption((option) =>
      option
        .setName("user_id")
        .setDescription("ID của người dùng cần gỡ ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Lý do gỡ ban")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString("user_id").trim();
    const reason = interaction.options.getString("reason") || "Không có lý do";

    const botMember = interaction.guild.members.me;
    if (!botMember.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({
        content: "❌ Bot không có quyền `Cấm thành viên` (Ban Members) để thực hiện lệnh này.",
        ephemeral: true,
      });
    }

    try {
      // Kiểm tra xem user có đang trong danh sách ban không
      const banInfo = await interaction.guild.bans.fetch(userId).catch(() => null);

      if (!banInfo) {
        return interaction.reply({
          content: `❌ Không tìm thấy người dùng có ID \`${userId}\` trong danh sách cấm của server.`,
          ephemeral: true,
        });
      }

      await interaction.guild.members.unban(userId, reason);

      const embed = new EmbedBuilder()
        .setColor("#57f287")
        .setTitle("Gỡ Cấm Thành Viên (Unban)")
        .addFields(
          {
            name: "Người được gỡ cấm",
            value: `${banInfo.user.tag} (\`${userId}\`)`,
            inline: true,
          },
          {
            name: "Quản trị viên",
            value: `${interaction.user}`,
            inline: true,
          },
          {
            name: "Lý do",
            value: `> ${reason}`,
            inline: false,
          }
        )
        .setFooter({
          text: `Unban bởi ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Lỗi khi unban:", error);
      return interaction.reply({
        content: "❌ Đã xảy ra lỗi khi cố gắng gỡ cấm cho người dùng này.",
        ephemeral: true,
      });
    }
  },
};
