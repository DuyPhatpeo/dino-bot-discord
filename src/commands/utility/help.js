const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Hiển thị danh sách nhận lệnh của bot"),

  async execute(interaction) {
    const { client } = interaction;

    // Gom command theo category
    const categories = {};

    client.commands.forEach((cmd) => {
      const dir = cmd.category || "Khác"; // category lấy từ loader
      if (!categories[dir]) categories[dir] = [];
      categories[dir].push({
        name: cmd.data.name,
        desc: cmd.data.description || "Không có mô tả",
      });
    });

    // Tạo embed
    const embed = new EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setTitle("Danh sách lệnh hỗ trợ")
      .setDescription("Chào bạn! Dưới đây là toàn bộ danh sách các lệnh mà bot hiện đang hỗ trợ.")
      .setColor("#2b2d31");

    // Thêm field cho từng category
    for (const [category, commands] of Object.entries(categories)) {
      // Viết hoa chữ cái đầu cho category
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

      embed.addFields({
        name: categoryName,
        value: commands.map((c) => `**\`/${c.name}\`** - *${c.desc}*`).join("\n"),
        inline: false,
      });
    }

    embed.setFooter({
      text: `Yêu cầu bởi ${interaction.user.tag} • Gõ /lệnh để sử dụng`,
      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
    }).setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
