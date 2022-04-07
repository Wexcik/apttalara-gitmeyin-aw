
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require('ms');
const moment = require("moment");
const AutoReply = require("../../AutoReply")
exports.execute = async (client, message, args) => {
  let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
  let embed = new MessageEmbed().setFooter(`Silinme Tarihi: ${mesaj.silinmeTarihi}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
if (!mesaj) {
message.delete({timeout: 5000})
return message.lineReply(AutoReply.mesajYok).then(msg => msg.delete({timeout: 5000}))}
let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
if (mesaj.icerik) {
return message.lineReply(embed.setDescription(`
${mesaj.dosya ? "Atılan mesaj bir dosya içeriyor." : mesaj.icerik}
`))
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}}
exports.conf = { command: "snipe",  description: "Yazılan kanalı everyone rolüne kanala yazı kapatır", aliases: ["silinenmesaj"] }