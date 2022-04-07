const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const db = require("quick.db")
const AutoReply = require("../../AutoReply")
const sicil = new qdb.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
require("../../wexab.js");
exports.execute = async (client, message, args) => {
    let muteBilgiChannel = await db.get(`chat-mute-bilgi-log.${message.guild.id}`);
    let mutedPerm = await db.get(`chat-muted.${message.guild.id}`);
    let cpuanBilgiChannel = await db.get(`cezapuan-bilgi-log.${message.guild.id}`);
    let arr =await  db.get(`chat-mute.yetkili-aut.${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    if(user.id === message.author.id) return message.lineReply(AutoReply.kendineİslem);  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply(AutoReply.AynıYetki)
    if (user.roles.cache.has(mutedPerm)) return message.channel.send(AutoReply.cMuteli)
    let time = args[1];
    if(!time || !ms(time)) return message.lineReply(AutoReply.zamanBelirt)
    let reason = args.splice(2).join(" ");
    if(!reason) reason = "Sebep Belirtilmedi.";
    qdb.add(`muteAlma.${user.id}`, 1)
    qdb.add(`muteAtma.${message.member.id}`, 1) 
    qdb.add(`cpuan${user.id}`, 15)
    qdb.add(`Cezaİd_`, +1); 
    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; 
    let cpuan = qdb.fetch(`cpuan${user.id}`)
    let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
    let aylar = aylartoplam;
    let gün = moment(Date.now()).format("DD")
    let saat = moment(Date.now()).format("HH:mm:ss")
    var yıl = [moment().format('YYYY')]
    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
    let bitis =  moment(Date.now() + ms(time)).format('DD/MM/YYYY H:mm')
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    qdb.set(`cezaBilgi_${Cezaİd}`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id,  yetkili2: message.author.displayName, uyes: user.id, cpuan : "15", bsure: tarih, ssure: bitis, cezatip: "Chat Mute" });
    qdb.push(`info.${user.id}.ihlal`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id, yetkili2: message.author.displayName, uyes: user.id, bsure: tarih, ssure: bitis, cpuan : "15", cezatip: "Chat Mute  "});
      client.channels.cache.get(muteBilgiChannel).send(embed.setDescription(`
      ${user} (\`${user.id}\`) adlı kullanıcı Metin kanallarında susturuldu.\n· Yetkili: ${message.author} (\`${message.author.tag}\` - \`${message.author.id}\`)\n· Tarih: \`${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}\`\n· Sebep: \`${reason}\``)).catch(e => { })    
      client.channels.cache.get(cpuanBilgiChannel).send(`${user} (\`${user.id}\`) son aldığınız \`Chat-Mute\` cezası ile \`${cpuan}\` cezapuanına ulaştınız.`).catch(e => { })
    await user.roles.add(mutedPerm).catch(e => { })
    setTimeout(async () => { await user.roles.remove(mutedPerm).catch(e => { }) }, ms(time));
    message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_cmuted")} ${user} adlı üye \`${reason}\` sebebiyle ${message.author} tarafından \`${time.replace(`s`, ` Saniye`).replace(`m`, ` Dakika`).replace(`h`, ` Saat`).replace(`d`, ` Gün`)}\` süresince metin kanallarında susturuldu! \`Ceza Numarası #${Cezaİd}\``)
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "mute", description: "Sohbet kanallarındaki mutesini başlatır", aliases: ["chatmute", "cmute", "chat-mute"] }
