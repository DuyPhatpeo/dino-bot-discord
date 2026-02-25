const { handleCommand } = require("../handlers/commandHandler");
const { handleButton } = require("../handlers/buttonHandler");
const { handleSelectMenu } = require("../handlers/selectMenuHandler");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isChatInputCommand()) return handleCommand(interaction);
    if (interaction.isButton()) return handleButton(interaction);
    if (interaction.isStringSelectMenu()) return handleSelectMenu(interaction);
  },
};
