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
        content: "❌ Không thể ban thành viên này!",
        ephemeral: true,
      });
    }

    await member.ban({ reason });

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🚫 Thành viên đã bị BAN")
      .setDescription(
        `**Người bị ban:** ${target}\n**Lý do:** ${reason}\n**Người thực hiện:** ${interaction.user}`,
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
