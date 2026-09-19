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
      .setColor("#2ec99d")
      .setAuthor({ name: "TRUNG TÂM TRỢ GIÚP" })
      .setTitle("📚 Danh Sách Lệnh DinoBot")
      .setDescription(
        "Dưới đây là các lệnh bạn có thể sử dụng. Gõ `/<lệnh>` để kích hoạt."
      );

    // Thêm field cho từng category
    for (const [category, commands] of Object.entries(categories)) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

      embed.addFields({
        name: `📁 ${categoryName}`,
        value: commands
          .map((c) => `**\`/${c.name}\`** • *${c.desc}*`)
          .join("\n"),
        inline: false,
      });
    }

    embed
      .setFooter({
        text: `Yêu cầu bởi ${interaction.user.tag} • Gõ /lệnh để sử dụng`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

