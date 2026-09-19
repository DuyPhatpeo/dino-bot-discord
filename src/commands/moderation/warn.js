const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

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
          `⚠️ Bạn đã bị cảnh báo trong server **${interaction.guild.name}**.\n**Lý do:** ${reason}`
        )
        .catch(() => {
          console.log("Không thể gửi DM cho user này.");
        });

      const embed = new EmbedBuilder()
        .setColor("#fee75c") // Màu vàng cảnh báo
        .setAuthor({ name: "QUẢN TRỊ VIÊN" })
        .setTitle("⚠️ Cảnh Báo Thành Viên")
        .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 512 }))
        .addFields(
          {
            name: "Người Bị Cảnh Báo",
            value: `${target} (\`${target.tag}\`)`,
            inline: true,
          },
          {
            name: "Quản Trị Viên",
            value: `${interaction.user}`,
            inline: true,
          },
          {
            name: "Lý Do",
            value: `>>> ${reason}`,
            inline: false,
          }
        )
        .setFooter({
          text: `Thực hiện bởi ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "❌ Có lỗi xảy ra khi cảnh báo user.",
        ephemeral: true,
      });
    }
  },
};

