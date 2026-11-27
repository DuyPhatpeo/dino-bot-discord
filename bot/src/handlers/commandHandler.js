const { MessageFlags } = require("discord.js");

module.exports.handleCommand = async (interaction) => {
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`❌ Không tìm thấy command: ${interaction.commandName}`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`❌ Lỗi khi thực thi lệnh /${interaction.commandName}:`, err);
    try {
      const replyMsg = {
        content: "⚠️ Có lỗi xảy ra khi chạy lệnh.",
        flags: MessageFlags.Ephemeral,
      };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(replyMsg);
      } else {
        await interaction.reply(replyMsg);
      }
    } catch (replyErr) {
      // Ignore secondary error if interaction is already acknowledged by another instance
    }
  }
};

