const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const db = require("quick.db");
const AutoReply = require("../../AutoReply")
exports.execute = async (client, message, args) => {
  if(message.author.id !== message.guild.ownerID)
  if(message.author.id !== client.config.Wex) return message.channel.send(AutoReply.YeterliYetkiYok);
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(AutoReply.üyeBelirt).then(x => x.delete({timeout: 5000}));
    qdb.delete(`cpuan${user.id}`);
    message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_tik")} ${user} (\`${user.user.tag}\` - \`${user.id}\`) adli üyenin isim geçmişi verilerini sıfırladınız.`).catch(e => { })};
exports.conf = { command: "cezapuansıfırla",  description: "Belirtilen üyenin tüm isim geçmişlerini siler", aliases: ["cezapuansıfırla"]}