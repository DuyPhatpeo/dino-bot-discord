const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nickname")
    .setDescription("Đổi biệt hiệu của thành viên")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Thành viên cần đổi biệt hiệu")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("Biệt hiệu mới")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const newNickname = interaction.options.getString("nickname");
    const member = interaction.guild.members.cache.get(target.id);

    // Kiểm tra quyền
    if (!member.manageable) {
      return interaction.reply({
        content: "❌ Không thể đổi biệt hiệu cho thành viên này!",
        ephemeral: true,
      });
    }

    try {
      await member.setNickname(newNickname);

      const embed = new EmbedBuilder()
        .setColor("#57f287")
        .setAuthor({ name: "QUẢN TRỊ VIÊN" })
        .setTitle("Đổi Biệt Hiệu Thành Viên")
        .addFields(
          { name: "Thành viên", value: `${target}`, inline: true },
          { name: "Biệt hiệu mới", value: `\`${newNickname}\``, inline: true },
          { name: "Người đổi", value: `${interaction.user}`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      return interaction.reply({
        content: "❌ Đã có lỗi khi đổi biệt hiệu!",
        ephemeral: true,
      });
    }
  },
};
