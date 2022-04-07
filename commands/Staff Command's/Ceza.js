const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");
const moment = require("moment");

require("moment-duration-format");

exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
    let embed4 = new MessageEmbed().setColor("RANDOM");
    let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
    let CezaID = args[0]
    let embed2 = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
    if(!CezaID || isNaN(CezaID)) return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));
    let ceza = qdb.get(`cezaBilgi_${CezaID}`)
    if(!ceza) return message.lineReply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} **${CezaID}** numaralı Ceza ID'sine yönelik veri tabanında bir bilgiye rastlanmadı.`)
    message.lineReply(embed.setDescription(`<@${ceza.uyes}> kişisine uygulanan \`${ceza.kod}\` numaralı ceza bilgisi;\n**❯ Ceza Türü**\n${ceza.cezatip}\n**❯ Ceza Atan Yetkili**\n<@${ceza.yetkili}>\n**❯ Ceza Sebebi**\n${ceza.sebep}\n**❯ Ceza Başlangıç**:\n${ceza.bsure}\n**❯ Ceza Bitiş**:\n${ceza.ssure}`))
  } else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
  exports.conf = { command: "ceza",  description: "ID li ceza bildiyi gösterir", aliases: ["ceza-bilgi","bilgi-ceza","cezabilgi"] }
