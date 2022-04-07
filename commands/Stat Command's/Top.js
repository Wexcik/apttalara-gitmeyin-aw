const moment = require("moment");
const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const messageGuild = require("../../schemas/messageGuild");
const messageGuildChannel = require("../../schemas/messageGuildChannel");
const voiceGuild = require("../../schemas/voiceGuild");
const voiceGuildChannel = require("../../schemas/voiceGuildChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");


exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setColor("RANDOM");

  const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
  const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
  const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
  const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
  const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
  const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });

  const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` ${x.channelID}: \`${Number(x.channelData).toLocaleString()} mesaj\``).join(`\n`);
  const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` ${x.channelID}: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join(`\n`);
  const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
  const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);

  embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
  embed.setDescription(`${message.guild.name} sunucusunun toplam istatistik verileri;`)
  embed.addField(`Ses Bilgileri: (\`Toplam ${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika]")}\`)`,
  `${voiceUsers.length > 0 ? voiceUsers : "Databasede Veri bulunamadı."}
  ─────────────────────`)
  embed.addField(`Mesaj Bilgileri: (\`Toplam ${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`)`,
  `${messageUsers.length > 0 ? messageUsers : "Databasede Veri bulunamadı."}
  ─────────────────────`)
  embed.addField(`Kanal Bilgileri (VOİCE): `,
  `${voiceChannels.length > 0 ? voiceChannels : "Databasede Veri bulunamadı."}
  ─────────────────────`)
  embed.addField(`Kanal Bilgileri (MESSAGE):`,
  `${messageChannels.length > 0 ? messageChannels : "Databasede Veri bulunamadı."}
  ─────────────────────`)
  
  message.lineReply(embed)
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.top\` komutunu kullandı. [\`${message.content}\`]`);

}

exports.conf = {
  command: "topstat", 
  description: "ID li ceza bildiyi gösterir", // Komut açıklamamız
  aliases: ["top"] 
}
