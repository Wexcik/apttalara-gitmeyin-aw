const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");
const AutoReply = require("../../AutoReply")
const moment = require("moment");
exports.execute = async (client, message, args) => {
  if(!message.guild) return;
  let arr =await  db.get(`ban-yetkili-aut.${message.guild.id}`) || []
if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
	  if (!args[0] || isNaN(args[0])) return message.lineReply(AutoReply.üyeBelirt);
    let user = args[0];
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"
    message.guild.members.unban(args[0]).catch(e => {console.log(`${message.author.tag} - ${message.author.id} adlı yetkili ${args[0]} id'li banı kaldırmaya çalıştı fakat o id'ye ait ban bulunamadı.`)});
    message.lineReply(`${client.emojis.cache.find(x => x.name === "wex_tik")} \`${args[0]}\` id'li kullanıcının sunucu yasağı ${message.author} tarafından başarılı bir şekilde kaldırıldı.`)
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.unban\` komutunu kullandı. [\`${message.content}\`]`);
  } else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "unban",  description: "Ban Atar", aliases: ["unyasakla"] }
