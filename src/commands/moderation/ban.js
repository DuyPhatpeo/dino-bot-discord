const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Cấm thành viên khỏi server")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Thành viên cần ban")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Lý do ban").setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "Không có lý do";

    // Fetch member để tránh lỗi nếu không có trong cache
    const member = await interaction.guild.members
      .fetch(target.id)
      .catch(() => null);

    if (!member) {
      return interaction.reply({
        content: "❌ Không tìm thấy thành viên này trong server!",
        ephemeral: true,
      });
    }

    if (!member.bannable) {
      return interaction.reply({
        content: "❌ Không thể ban thành viên này! (Họ có thể có quyền cao hơn tôi hoặc là Chủ Sở Hữu)",
        ephemeral: true,
      });
    }

    await member.ban({ reason });

    const embed = new EmbedBuilder()
      .setColor("#ed4245")
      .setAuthor({ name: "QUẢN TRỊ VIÊN" })
      .setTitle("🔨 Cấm Thành Viên (Ban)")
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        { name: "Người bị cấm", value: `${target} (\`${target.id}\`)`, inline: true },
        { name: "Quản trị viên", value: `${interaction.user}`, inline: true },
        { name: "Lý do", value: `> ${reason}`, inline: false }
      )
      .setFooter({
        text: `Ban bởi ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
