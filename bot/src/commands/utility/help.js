// src/commands/utility/help.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const CATEGORY_META = {
  music: { name: "🎵 Âm Nhạc", order: 1 },
  moderation: { name: "🛡️ Quản Trị", order: 2 },
  utility: { name: "🛠️ Tiện Ích", order: 3 },
  fun: { name: "🎮 Giải Trí", order: 4 },
  slash: { name: "💬 Cơ Bản", order: 5 },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Hiển thị danh sách nhận lệnh của bot"),

  async execute(interaction) {
    const { client } = interaction;

    // Group commands by category
    const categories = {};

    client.commands.forEach((cmd) => {
      const dir = (cmd.category || "Khác").toLowerCase();
      if (!categories[dir]) categories[dir] = [];
      categories[dir].push({
        name: cmd.data.name,
        desc: cmd.data.description || "Không có mô tả",
      });
    });

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("📖 Danh Sách Lệnh")
      .setDescription("Sử dụng dấu `/<tên_lệnh>` để gọi lệnh tương ứng.");

    // Sort categories by predefined order
    const sortedCategories = Object.keys(categories).sort((a, b) => {
      const orderA = CATEGORY_META[a]?.order || 99;
      const orderB = CATEGORY_META[b]?.order || 99;
      return orderA - orderB;
    });

    for (const cat of sortedCategories) {
      const label = CATEGORY_META[cat]?.name || (cat.charAt(0).toUpperCase() + cat.slice(1));
      const commands = categories[cat];

      embed.addFields({
        name: label,
        value: commands
          .map((c) => `\`/${c.name}\` - ${c.desc}`)
          .join("\n"),
        inline: false,
      });
    }

    embed.setFooter({
      text: `Tổng cộng ${client.commands.size} lệnh • Yêu cầu bởi ${interaction.user.tag}`,
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
