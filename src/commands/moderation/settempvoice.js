const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { getGuildConfig, setGuildConfig } = require("../../utils/configManager");

module.exports = {
  category: "moderation",
  data: new SlashCommandBuilder()
    .setName("settempvoice")
    .setDescription("Cài đặt hoặc tắt kênh kích hoạt tạo phòng Voice tự động (Join to Create)")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Kênh Voice kích hoạt (Khi vào kênh này sẽ tự tạo phòng riêng)")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("disable")
        .setDescription("Đặt là True nếu muốn tắt tính năng này")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const disable = interaction.options.getBoolean("disable");

    if (disable) {
      setGuildConfig(interaction.guildId, { tempVoiceChannelId: null });
      return interaction.reply({
        content: "✅ Đã tắt tính năng tự động tạo phòng Voice tạm thời.",
        ephemeral: true,
      });
    }

    if (!channel) {
      const currentConfig = getGuildConfig(interaction.guildId);
      const currentCh = currentConfig.tempVoiceChannelId
        ? `<#${currentConfig.tempVoiceChannelId}>`
        : "*Chưa được thiết lập*";

      return interaction.reply({
        content: `📌 Kênh kích hoạt Voice tạm thời hiện tại: ${currentCh}\n💡 Chạy \`/settempvoice channel:#TenKenh\` để cài đặt hoặc \`/settempvoice disable:True\` để tắt.`,
        ephemeral: true,
      });
    }

    setGuildConfig(interaction.guildId, { tempVoiceChannelId: channel.id });

    const embed = new EmbedBuilder()
      .setColor("#57f287")
      .setTitle("Cấu Hình Kênh Voice Tạm Thời")
      .setDescription(
        `✅ Đã thiết lập kênh ${channel} làm kênh **Kích hoạt tạo phòng Voice**.\n\n` +
        `Khi bất kỳ thành viên nào tham gia kênh này, DinoBot sẽ tự động tạo một phòng Voice riêng và tự xóa phòng khi không còn ai.`
      )
      .setFooter({ text: `Cài đặt bởi ${interaction.user.tag}` })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
