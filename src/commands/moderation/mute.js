const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Tắt tiếng (timeout) thành viên")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Thành viên cần mute")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("minutes").setDescription("Số phút mute").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Lý do mute").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const minutes = interaction.options.getInteger("minutes");
    const reason = interaction.options.getString("reason") || "Không có lý do";
    const member = interaction.guild.members.cache.get(target.id);

    if (!member.moderatable) {
      return interaction.reply({
        content: "❌ Không thể mute thành viên này!",
        ephemeral: true,
      });
    }

    const duration = minutes * 60 * 1000;
    await member.timeout(duration, reason);

    const embed = new EmbedBuilder()
      .setColor("#fee75c")
      .setAuthor({ name: "QUẢN TRỊ VIÊN" })
      .setTitle("Tắt Tiếng Thành Viên (Timeout)")
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        { name: "Người bị tắt tiếng", value: `${target} (\`${target.id}\`)`, inline: true },
        { name: "Thời gian", value: `${minutes} phút`, inline: true },
        { name: "Quản trị viên", value: `${interaction.user}`, inline: true },
        { name: "Lý do", value: `> ${reason}`, inline: false }
      )
      .setFooter({
        text: `Mute bởi ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
