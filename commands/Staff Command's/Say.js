const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const AutoReply = require("../../AutoReply")
module.exports.execute = async (client, message, args) => {       
  let SunucuTag = await db.get(`sunucu-tagi.${message.guild.id}`);
  let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
  let isimsayı = message.guild.members.cache.filter(u => u.user.username.includes(SunucuTag)).size;
   let bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
   var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
   var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
   const wexembed = new Discord.MessageEmbed().setColor('RANDOM').setDescription(`\n**>** Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.\n**>** Toplam (**${isimsayı}**) taglı kullanıcı var.\n**>** Aktif **${Online}** kullanıcı bulunmaktadır.\n**>** Ses Kanallarında **${Voice} (+${bot} bot)** kullanıcı bulunmaktadır.`)
   message.lineReply(wexembed)
  } else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "say", description: "Sunucu istatistiklerini atar", aliases: ["sunucusay","sesli","sayy","sessay"] }
