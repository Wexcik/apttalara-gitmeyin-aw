const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");

const moment = require("moment");
require("moment-duration-format");
const kdb = new qdb.table("Kayıt");


exports.execute = async (client, message, args) => {
  let RegisterEmbed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();
  let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    let kayıt = kdb.get(`kullanici.${uye.id}.kayıt`) || [];
    kayıt = kayıt.reverse();
    let isimler = kayıt.length > 0 ? kayıt.map((value, index) => `\`${value.isim} ${value.yas}\` (${value.rol})`).join("\n"):"";
    message.lineReply(RegisterEmbed.setDescription(`${uye} kişinin veri tabanında toplam ${kayıt.length} kayıtı bulundu.\n\n ${isimler}`)).catch(e => { })
  }  else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`);}
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.isimler\` komutunu kullandı. [\`${message.content}\`]`);

};
exports.conf = { command: "isimler", description: "Belirtilen üyenin eski isimlerini atar", aliases: ["uye-info","uyeinfo","info-uye","üye-bilgi","üyebilgi"]}