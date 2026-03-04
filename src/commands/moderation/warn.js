const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Cảnh báo một thành viên trong server")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Người bạn muốn cảnh báo")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Lý do cảnh báo")
        .setRequired(false)
    )
    // đổi ModerateMembers -> KickMembers (hoặc BanMembers tuỳ quyền mod bạn chọn)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "Không có lý do";

    // Không cho cảnh báo chính mình hoặc bot
    if (target.id === interaction.user.id) {
      return interaction.reply({
        content: "❌ Bạn không thể tự cảnh báo chính mình.",
        ephemeral: true,
      });
    }
    if (target.bot) {
      return interaction.reply({
        content: "❌ Bạn không thể cảnh báo bot.",
        ephemeral: true,
      });
    }

    try {
      // Gửi DM cho user bị cảnh báo
      await target
        .send(
          `Bạn đã bị cảnh báo trong server **${interaction.guild.name}**.\n**Lý do:** ${reason}`
        )
        .catch(() => {
          console.log("Không thể gửi DM cho user này.");
        });

      // Thông báo trong kênh
      await interaction.reply(
        `${target} đã bị cảnh báo.\n**Lý do:** ${reason}`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Có lỗi xảy ra khi cảnh báo user.",
        ephemeral: true,
      });
    }
  },
};
