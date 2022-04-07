const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const db = require("quick.db")
const AutoReply = require("../../AutoReply")
const sicil = new qdb.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format")
require("../../wexab.js");
exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");
  let jailBilgiChannel = await db.get(`jail-cezali-bilgi-log.${message.guild.id}`);
  let jailPerm = await db.get(`jailed-rol.${message.guild.id}`);
  let arr =await  db.get(`jail-cezali.yetkili-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply(AutoReply.AynıYetki)
    if(user.id === message.author.id) return message.lineReply(AutoReply.kendineİslem) 
    if (user.roles.cache.has(jailPerm)) return message.channel.send(AutoReply.Cezalıda) 
    let reason = args.splice(1).join(" ");
    if(!reason) reason = "Sebep Belirtilmedi.";
    qdb.add(`jailAlma.${user.id}`, 1)
    qdb.add(`jailAtma.${message.member.id}`, 1) 
    qdb.add(`cpuan${user.id}`, 20)
    qdb.add(`Cezaİd_`, +1);
    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1;
    let cpuan = qdb.fetch(`cpuan${user.id}`)
    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
    qdb.set(`jailRoles.${user.id}`, user.roles.cache.map(x => x.id))
    qdb.set(`jaill.${user.id}`, `jails`)
    let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
    let aylar = aylartoplam;
    let gün = moment(Date.now()).format("DD")
    let saat = moment(Date.now()).format("HH:mm:ss")
    var yıl = [moment().format('YYYY')]
    await user.roles.set("");
    qdb.set(`cezaBilgi_${Cezaİd}`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id,  yetkili2: message.author.displayName, uyes: user.id, bsure: tarih, ssure: "Kalıcı", cezatip: "Cezalı" });
  qdb.push(`info.${user.id}.ihlal`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, bsure: tarih, yetkili2: message.author.displayName, ssure: "Bilinmiyor", cezatip: "Cezalı"});
    client.channels.cache.get(jailBilgiChannel).send(embed.setDescription(`
    ${user} (\`${user.id}\`) adlı kullanıcı jail'e gönderildi.\n· Yetkili: ${message.author} (\`${message.author.tag}\` - \`${message.author.id}\`)\n· Tarih: \`${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}\`\n· Sebep: \`${reason}\``)).catch(e => { })    
    message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_jailed")} ${user} adlı üye \`${reason}\` sebebiyle ${message.author} tarafından sunucu içerisinde cezalıya gönderildi. \`Ceza Numarası #${Cezaİd}\``)
    await user.roles.add(jailPerm);
  } else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "jail", description: "Süreli Jaile Atar.", aliases: ["cezalı", "kalıcı-jail"] }
