const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Xóa nhiều tin nhắn cùng lúc")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Số lượng tin nhắn cần xóa (1-100)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages), // Chỉ người có quyền xóa tin nhắn mới dùng

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: "Vui lòng nhập số từ **1 đến 100**.",
        ephemeral: true,
      });
    }

    try {
      await interaction.channel.bulkDelete(amount, true); // true = bỏ qua tin nhắn quá 14 ngày
      await interaction.reply({
        content: `Đã xóa **${amount}** tin nhắn.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "Không thể xóa tin nhắn. Hãy chắc chắn bot có quyền và tin nhắn không quá 14 ngày.",
        ephemeral: true,
      });
    }
  },
};
