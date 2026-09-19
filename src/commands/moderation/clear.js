const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

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
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: "❌ Vui lòng nhập số từ **1 đến 100**.",
        ephemeral: true,
      });
    }

    try {
      await interaction.channel.bulkDelete(amount, true);

      const embed = new EmbedBuilder()
        .setColor("#57f287")
        .setAuthor({ name: "QUẢN TRỊ VIÊN" })
        .setTitle("🧹 Dọn Dẹp Tin Nhắn")
        .addFields(
          {
            name: "Số Lượng Đã Xóa",
            value: `🗑️ **${amount} tin nhắn**`,
            inline: true,
          },
          {
            name: "Kênh",
            value: `${interaction.channel}`,
            inline: true,
          },
          {
            name: "Người Thực Hiện",
            value: `${interaction.user}`,
            inline: true,
          }
        )
        .setFooter({ text: "Lưu ý: Tin nhắn quá 14 ngày không thể xóa tự động" })
        .setTimestamp();

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "❌ Không thể xóa tin nhắn. Hãy chắc chắn bot có quyền và tin nhắn không quá 14 ngày.",
        ephemeral: true,
      });
    }
  },
};

