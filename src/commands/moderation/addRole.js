const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Cấp role cho một thành viên")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Thành viên nhận role")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("Role cần cấp").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const target = interaction.options.getMember("target");
    const role = interaction.options.getRole("role");

    // Kiểm tra bot có quyền ManageRoles
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.ManageRoles
      )
    ) {
      return interaction.reply({
        content: "❌ Bot không có quyền quản lý role!",
        ephemeral: true,
      });
    }

    // Kiểm tra role có thể được gán (role của bot phải cao hơn)
    if (role.position >= interaction.guild.members.me.roles.highest.position) {
      return interaction.reply({
        content:
          "❌ Không thể cấp role này vì role của bot thấp hơn hoặc bằng role cần cấp!",
        ephemeral: true,
      });
    }

    // Kiểm tra thành viên đã có role chưa
    const memberHighestRole = target.roles.highest;
    const everyoneRoleId = interaction.guild.id;

    if (
      memberHighestRole.id !== everyoneRoleId &&
      role.position >= memberHighestRole.position
    ) {
      return interaction.reply({
        content:
          "❌ Không thể cấp role này cho thành viên vì role cao hơn hoặc bằng role hiện tại của họ!",
        ephemeral: true,
      });
    }

    try {
      await target.roles.add(role);

      const embed = new EmbedBuilder()
        .setColor("#57f287")
        .setAuthor({ name: "QUẢN TRỊ VIÊN" })
        .setTitle("Cấp Vai Trò Thành Viên")
        .addFields(
          { name: "Thành viên", value: `${target}`, inline: true },
          { name: "Vai trò", value: `${role}`, inline: true },
          { name: "Quản trị viên", value: `${interaction.user}`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "❌ Có lỗi xảy ra khi cấp role!",
        ephemeral: true,
      });
    }
  },
};
