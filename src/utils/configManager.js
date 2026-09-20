const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const CONFIG_FILE = path.join(DATA_DIR, "guildConfig.json");

/** Đảm bảo thư mục và file config tồn tại */
function ensureConfigFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({}, null, 2), "utf-8");
  }
}

/** Đọc toàn bộ config */
function getAllConfigs() {
  ensureConfigFile();
  try {
    const data = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(data || "{}");
  } catch (error) {
    console.error("Lỗi khi đọc guildConfig.json:", error);
    return {};
  }
}

/** Lấy config của một guild */
function getGuildConfig(guildId) {
  const configs = getAllConfigs();
  return configs[guildId] || {};
}

/** Lưu config của một guild */
function setGuildConfig(guildId, newSettings) {
  ensureConfigFile();
  try {
    const configs = getAllConfigs();
    configs[guildId] = {
      ...(configs[guildId] || {}),
      ...newSettings,
    };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(configs, null, 2), "utf-8");
    return configs[guildId];
  } catch (error) {
    console.error("Lỗi khi ghi guildConfig.json:", error);
    return null;
  }
}

module.exports = {
  getGuildConfig,
  setGuildConfig,
};
