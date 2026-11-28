// deploy-commands.js
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const walk = (dir) =>
  fs.readdirSync(dir).flatMap((file) => {
    const fullPath = path.join(dir, file);
    return fs.statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });

const commands = [];
const commandsPath = path.join(__dirname, "src", "commands");

if (fs.existsSync(commandsPath)) {
  const commandFiles = walk(commandsPath).filter((f) => f.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(file);
    if (command?.data?.toJSON) commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    if (!token || !clientId) {
      console.error("❌ Thiếu DISCORD_TOKEN hoặc CLIENT_ID trong cấu hình biến môi trường!");
      process.exit(1);
    }

    console.log(`🔁 Đang đăng ký ${commands.length} lệnh lên Discord API...`);

    // 1. Cập nhật ngay cho test guild nếu có GUILD_ID
    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      });
      console.log(`✅ Đã cập nhật ${commands.length} lệnh cho Guild (${guildId}) tức thì.`);
    }

    // 2. Cập nhật Global cho toàn bộ server bot tham gia
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log(`✅ Đã đăng ký toàn bộ ${commands.length} lệnh Global thành công.`);
  } catch (err) {
    console.error("❌ Lỗi deploy:", err);
  }
})();
