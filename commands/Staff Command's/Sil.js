const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("../../wexab.js");
const qdb = require("quick.db");
const db = require("quick.db")
const AutoReply = require("../../AutoReply")
exports.execute = async (client, message, args) => {
    let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
     if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) 
    return message.lineReply(AutoReply.BirSayıBelirt)
    await message.delete().catch(e => { });
    await message.channel.bulkDelete(Number(args[0])).then(msjlar => message.lineReply(`Başarıyla **${msjlar.size}** adet mesaj silindi.`).then(x => x.delete({timeout: 5000}))).catch(e => { });
  } else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
  exports.conf = { command: "sil",  description: "Belirtilen miktar kadar sohbeti temizler.",aliases: ["celar"] }