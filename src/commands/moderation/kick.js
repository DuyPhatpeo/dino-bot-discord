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
        content: "❌ Không thể kick thành viên này! (Họ có thể có quyền cao hơn tôi hoặc là Chủ Sở Hữu)",
        ephemeral: true,
      });
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor("#fee75c") // Màu vàng của Discord
      .setAuthor({
        name: `Lệnh Phạt Kick Đã Được Thực Thi`
      })
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        { name: "Người bị đuổi", value: `${target} (\`${target.id}\`)`, inline: true },
        { name: "Quản trị viên", value: `${interaction.user}`, inline: true },
        { name: "Lý do", value: `> ${reason}`, inline: false }
      )
      .setFooter({
        text: `Kick bởi ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
