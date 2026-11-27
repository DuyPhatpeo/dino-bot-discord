module.exports.handleSelectMenu = async (interaction) => {
  console.log(`${interaction.user.tag} chọn: ${interaction.values}`);
  await interaction.reply({
    content: `✅ Bạn đã chọn: ${interaction.values.join(", ")}`,
    ephemeral: true,
  });
};
