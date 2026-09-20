const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { getGuildConfig, setGuildConfig } = require("../../utils/configManager");

module.exports = {
  category: "moderation",
  data: new SlashCommandBuilder()
    .setName("setwelcome")
    .setDescription("Cài đặt hoặc tắt kênh gửi tin nhắn chào mừng thành viên mới")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Kênh văn bản để gửi lời chào mừng")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("disable")
        .setDescription("Đặt là True nếu muốn tắt tính năng chào mừng")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const disable = interaction.options.getBoolean("disable");

    if (disable) {
      setGuildConfig(interaction.guildId, { welcomeChannelId: null });
      return interaction.reply({
        content: "✅ Đã tắt tính năng gửi tin nhắn chào mừng thành viên mới.",
        ephemeral: true,
      });
    }

    if (!channel) {
      const currentConfig = getGuildConfig(interaction.guildId);
      const currentChannel = currentConfig.welcomeChannelId
        ? `<#${currentConfig.welcomeChannelId}>`
        : "*Chưa được thiết lập*";

      return interaction.reply({
        content: `📌 Kênh chào mừng hiện tại: ${currentChannel}\n💡 Để đổi kênh, hãy chạy \`/setwelcome channel:#ten-kenh\` hoặc \`/setwelcome disable:True\` để tắt.`,
        ephemeral: true,
      });
    }

    setGuildConfig(interaction.guildId, { welcomeChannelId: channel.id });

    const embed = new EmbedBuilder()
      .setColor("#57f287")
      .setTitle("Cấu Hình Kênh Chào Mừng")
      .setDescription(`✅ Đã thiết lập kênh chào mừng thành viên mới là ${channel}.`)
      .setFooter({ text: `Cài đặt bởi ${interaction.user.tag}` })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
