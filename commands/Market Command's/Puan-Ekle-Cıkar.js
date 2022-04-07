const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
const db = require("quick.db");
const AutoReply = require("../../AutoReply")
require("moment-duration-format");
exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM").setTimestamp();
  let embed2 = new MessageEmbed().setColor("RANDOM");
  if(message.author.id !== message.guild.ownerID)
  if(message.author.id !== client.config.Wex) return message.channel.send(AutoReply.YeterliYetkiYok);
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    if (args[0] === "ekle") { let puansayı = args[2]
    if(!puansayı) return message.lineReply(embed.setDescription(`${message.author} bir 1 ile 10000 arasında bir sayı belirtmelisin`))
    if(!user) return message.lineReply(embed.setDescription(`${message.author} bir kullanıcı belirtmelisin`)),qdb.add(`marketpuan${user.id}`, puansayı) , message.lineReply(embed.setDescription(`${user} adlı kullanıcının Kayıt Alışveriş puanına ${message.author} tarafından **${puansayı}** puan eklendi.`)).catch(e => { })};
    if (args[0] === "çıkar") { let puansayı = args[2]
    if(!puansayı) return message.lineReply(embed.setDescription(`${message.author} bir 1 ile 10000 arasında bir sayı belirtmelisin`))
    if(!user) return message.lineReply(embed.setDescription(`${message.author} bir kullanıcı belirtmelisin`)),qdb.add(`marketpuan${user.id}`, -puansayı)  ,message.lineReply(embed.setDescription(`${user} adlı kullanıcının Kayıt Alışveriş puanından **${puansayı}** puan ${message.author} tarafından çıkarıldı.`)).catch(e => { })}

if (args[0] === "sıfırla") {if(!user) return message.lineReply(embed.setDescription(`${message.author} bir kullanıcı belirtmelisin`)) , qdb.delete(`marketpuan${user.id}`) ,message.lineReply(embed.setDescription(`${user} adlı kullanıcının Kayıt Alışveriş ${message.author} tarafından sıfırlandı`)).catch(e => { })}}
exports.conf = { command: "puan", aliases: ["bakiyeayarla"]}