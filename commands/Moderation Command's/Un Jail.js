const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const sicil = new qdb.table("tmute");
const ms = require('ms');
const db = require("quick.db")
const AutoReply = require("../../AutoReply")
const moment = require("moment");
require("moment-duration-format")
require("../../wexab.js");
exports.execute = async (client, message, args) => {
  let jailPerm = await db.get(`jailed-rol.${message.guild.id}`);
  let unregisterRol = await db.get(`unregisterRole-server.${message.guild.id}`);
  let arr =await  db.get(`jail-cezali.yetkili-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply("Bir kullanıcı belirt ve tekrar dene.")
    if (!user.roles.cache.has(jailPerm)) return message.channel.send(AutoReply.CezalıdaDegil)
    let Roles = qdb.get(`jailRoles.${user.id}`)
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi.";
    qdb.add(`jailKaldırma.${message.member.id}`, 1)
    qdb.delete(`jaill.${user.id}`, `jails`) //KALICI JAİL KOMUTU
    await user.roles.add(unregisterRol).catch(e => { });
    await user.roles.remove(jailPerm)
    message.lineReply(`${client.emojis.cache.find(x => x.name === "wex_tik")} ${user} (\`${user.id}\`) adlı üye ${message.author} tarafından \`${reason}\` sebebiyle cezalıdan çıkarıldı.`)
    message.react(client.emojis.cache.find(x => x.name === "wex_tik"));
  } else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "unjail", description: "Belirtilen üyenin jailini kaldırır.", aliases: ["jail-un","un-jail"] }
