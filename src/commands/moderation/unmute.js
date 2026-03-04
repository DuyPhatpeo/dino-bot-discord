const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Gỡ mute (timeout) khỏi một thành viên")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Người cần gỡ mute")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getMember("target");

    if (!target) {
      return interaction.reply({
        content: "Không tìm thấy thành viên này trong server.",
        ephemeral: true,
      });
    }

    if (!target.isCommunicationDisabled()) {
      return interaction.reply({
        content: "Thành viên này hiện không bị mute.",
        ephemeral: true,
      });
    }

    try {
      await target.timeout(null); // gỡ timeout
      await interaction.reply(`${target.user.tag} đã được gỡ mute.`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Không thể gỡ mute. Kiểm tra quyền của bot.",
        ephemeral: true,
      });
    }
  },
};
