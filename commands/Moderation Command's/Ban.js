const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");
const limit = new Map();
const AutoReply = require("../../AutoReply")
const moment = require("moment");
exports.execute = async (client, message, args) => {
if(!message.guild) return;
let BanEmbed = new MessageEmbed().setFooter(client.config.SetFooter).setColor("RANDOM").setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
let banBilgiChannel = await db.get(`ban-yasaklama-bilgi-log.${message.guild.id}`);
  let arr =await  db.get(`ban-yetkili-aut.${message.guild.id}`) || []
if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
  if (client.config.BanLimit > 0 && limit.has(message.author.id) && limit.get(message.author.id) == client.config.BanLimit) return message.channel.send(AutoReply.banLimit);
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    if(user.id === message.author.id) return message.lineReply(AutoReply.kendineİslem)  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply(AutoReply.AynıYetki)  
    qdb.add(`Cezaİd_`, +1); //Ceza ID'yi sayar
    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
    let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
    let aylar = aylartoplam;
    let gün = moment(Date.now()).format("DD")
    let saat = moment(Date.now()).format("HH:mm:ss")
    var yıl = [moment().format('YYYY')]
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Belirtilmedi"
    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; //
qdb.set(`cezaBilgi_${Cezaİd}`, {sebep: reason, kod: Cezaİd, yetkili2: message.author.displayName, yetkili: message.author.id, uyes: user.id, bsure: tarih, ssure: "Sınırsız.", cezatip: "BAN"});
qdb.push(`info.${user.id}.ihlal`, {sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, yetkili2: message.author.displayName, bsure: tarih, ssure: "Sınırsız", cpuan : "10", cezatip: "Ban "});
message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_banned")} **${user.user.tag}** adlı üye \`${reason}\` sebebiyle ${message.author} tarafından sunucudan yasaklandı. \`Ceza Numarası: #${Cezaİd}\``)
qdb.add(`banAtma.${message.member.id}`, 1)
client.channels.cache.get(banBilgiChannel).send(BanEmbed.setDescription(`${user} (\`${user.user.tag}\` - \`${user.id}\`) adlı üye sunucudan yasaklandı.\n· Yetkili: ${message.author} (\`${message.author.tag}\` - \`${message.author.id}\`)\n· Tarih: \`${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}\`\n· Sebep: \`${reason}\``)).catch(e => { });
user.ban({reason: `${reason} | ${message.author.tag}`}).catch(err => console.error(error));
user.ban().catch(e => { });
if (client.config.BanLimit > 0) { if (!limit.has(message.author.id)) limit.set(message.author.id, 1); else limit.set(message.author.id, limit.get(message.author.id) + 1);
setTimeout(() => { if (limit.has(message.author.id)) limit.delete(message.author.id); }, 1000 * 60 * 60)};
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "ban", description: "Ban Atar",  aliases: ["yasakla", "wexinlaneti", "gavur"] }