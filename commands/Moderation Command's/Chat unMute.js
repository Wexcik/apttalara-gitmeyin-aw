const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const db = require("quick.db")
const sicil = new qdb.table("tmute");
const AutoReply = require("../../AutoReply")
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
require("../../wexab.js");
exports.execute = async (client, message, args) => {
  let mutedPerm = await db.get(`chat-muted.${message.guild.id}`);
  let arr =await  db.get(`chat-mute.yetkili-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {    
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    if(user.id === message.author.id) return message.lineReply(AutoReply.kendineİslem);  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply(AutoReply.AynıYetki)
    if (!user.roles.cache.has(mutedPerm)) return message.channel.send(AutoReply.cMutesiz)
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Sebep Belirtilmedi.";
     message.lineReply(`${client.emojis.cache.find(x => x.name === "wex_tik")} ${user} (\`${user.id}\`) adlı üyenin metin kanallarındaki susturulması ${message.author} tarafından \`${reason}\` sebebiyle kaldırıldı.`)
    await user.roles.remove(mutedPerm).catch(e => { })
  } else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "unmute", description: "Sohbet kanallarındaki mutesini kaldırır", aliases: ["chatunmute","un-chatmute","un-mute"] }
