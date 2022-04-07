const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");
const ms = require('ms');
require("moment-duration-format");
require("../../wexab.js");
const moment = require("moment");
exports.execute = async (client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM");
  let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
      let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let user = message.guild.member(kullanici);
    
    let cpuan = qdb.fetch(`cpuan${user.id}`) || `0`;
    message.lineReply(embed2.setDescription(`${user} üyesinin ceza pauanı : __**${cpuan}**__`))
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = {command: "ceza-puan", description: "Sunucdaki ceza puanını atar", aliases: ["cezapuan","cezap","uyarıpuan","uyarı-puan","cp"] }
