const serverInfoCommand = require("./serverinfo");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Xem thông tin chi tiết và thống kê của máy chủ"),

  async execute(interaction) {
    return serverInfoCommand.execute(interaction);
  },
};
