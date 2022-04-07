const { MessageEmbed } = require("discord.js");
const {MessageAttachment} = require("discord.js");
const db = require("quick.db");
const AutoReply = require("../../AutoReply")
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
exports.execute = async(client, message, args) => {
  let embed2 = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]);
  let user =  message.guild.member(kullanici);
  if (!user) return message.lineReply(AutoReply.üyeBelirt)
  let ihlal = qdb.get(`info.${user.id}.ihlal`) || [];
    ihlal = ihlal.reverse();
    if (ihlal.length < 1) return message.lineReply(AutoReply.KullanicininCezaiİslemYok)
    let uyeDurum;
    if (ihlal.length < 5) uyeDurum = 'Çok güvenli!';
    if (ihlal.length >= 5 && ihlal.length < 10) uyeDurum = 'Güvenli!';
    if (ihlal.length >= 10 && ihlal.length < 15) uyeDurum = 'Şüpheli!';
    if (ihlal.length >= 15 && ihlal.length < 20) uyeDurum = 'Tehlikeli!';
    if (ihlal.length >= 20) uyeDurum = 'Çok tehlikeli!';
    let ihlaller2 = ihlal.length > 0 ? ihlal.map((value,) => `
\`\`\`php\nID => ${value.kod}\nTür => ${value.cezatip}\nPuan => ${value.cpuan}\nYetkili => ${message.guild.members.cache.get(value.yetkili) ? message.guild.members.cache.get(value.yetkili).displayName : value.yetkili}\nSebeb => ${value.sebep}\nBitiş Tarihi => ${value.ssure}\`\`\``).slice(0,1) : "";
let ihlaller = ihlal.length > 0 ? ihlal.map((value,) => `[**${value.cezatip}**] <@${value.yetkili}> tarafından \`${value.bsure}\` tarihinde \`${value.sebep}\` sebebiyle ceza aldınız. (Ceza Numarası \`#${value.kod}\`)
─────────────────────`).join("\n") : "Bu kullanıcının Sicili temiz!";
message.lineReply(embed2.setDescription(`:no_entry_sign:${user} kullanıcının geçmiş ceza-i işlem bilgileri aşığıda belirtilmiştir.\n\n**Son Cezası**${ihlaller2}
${ihlaller}`))
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}

exports.conf = { command: "ceza-info", description: "ZORT", aliases: ["üyegeçmiş", "testcezali", "üye-geçmiş", "uyegecmis", "uye-gecmis", "sicil"]  };
