const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const sicil = new qdb.table("tmute");
const db = require("quick.db")
const ms = require('ms');
const kdb = new db.table("kullanici");
const moment = require("moment");
require("../../wexab.js");
const AutoReply = require("../../AutoReply")
require("moment-duration-format");
exports.execute = async (client, message, args) => {
  let vmutedPerm = await db.get(`voice-muted.${message.guild.id}`);
  let arr =await  db.get(`voice-mute.yetkili-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    if (!user.roles.cache.has(vmutedPerm)) return message.channel.send(AutoReply.vMutesiz)
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi.";
    message.lineReply(`${client.emojis.cache.find(x => x.name === "wex_tik")} ${user} (\`${user.id}\`) adlı üyenin ses kanallarındaki susturulması ${message.author} tarafından \`${reason}\` sebebiyle kaldırıldı.`)
    await user.roles.remove(vmutedPerm).catch(e => { })
if(user.voice.channel) user.voice.setMute(false);
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "unsesmute", description: "Ses kanllarındaki mutesini kaldırır.", aliases: ["unvmute", "un-vmute","vunmute", "ses-unmute","sesunmute","voiceunmute","voice-unmute"] }
