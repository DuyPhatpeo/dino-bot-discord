const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Đá thành viên khỏi server")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Thành viên cần kick")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Lý do kick").setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

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

    if (!member.kickable) {
      return interaction.reply({
        content: "❌ Không thể kick thành viên này!",
        ephemeral: true,
      });
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor(0xffa500)
      .setTitle("👢 Thành viên đã bị KICK")
      .setDescription(
        `**Người bị kick:** ${target}\n**Lý do:** ${reason}\n**Người thực hiện:** ${interaction.user}`,
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
