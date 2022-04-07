const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");

require("../../wexab.js");
require('discord-reply');

exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
    let arr =await  db.get(`sunucu-booster-role.${message.guild.id}`) || []
    if (message.member.roles.cache.some(e => arr.some(x => x == e))) {  
  
    let uye = message.member;
    let taglırol = await db.get(`teamrole_${message.guild.id}`);
    let isim = args.splice(0).join(" ");
    if(!isim) return message.channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    if(isim.length >= "26") return message.channel.send(embed.setDescription(`Max 25 karakter kullana bilirsin.`))
    if(client.config.TagVarYok) {
    if(!message.member.roles.cache.has(taglırol)) {
    uye.setNickname(`${isim}`).catch(e => { });
  message.channel.send(embed.setDescription(`${message.member} yeni adın : ${isim}`));	} else {
    uye.setNickname(`${isim}`).catch(e => { });
    message.channel.send(embed.setDescription(`${message.member} yeni adın ${isim}`));}
} else {
uye.setNickname(`${isim}`).catch(e => { });
  message.channel.send(embed.setDescription(`${message.member} yeni adın ${isim}`));
}} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "booster",  description: "Sunucudaki ismini değiştirir.", aliases: ["boost","zengin"] }