const qdb = require("quick.db")
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const AutoReply = require("../../AutoReply")
const sicil = new qdb.table("tmute");
const kdb = new qdb.table("kullanici");
const jdb = new qdb.table("cezalar");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
require("../../wexab.js");
exports.execute = async (client, message, args) => {
  let muteBilgiChannel = await db.get(`chat-mute-bilgi-log.${message.guild.id}`);
  let vmutedPerm = await db.get(`voice-muted.${message.guild.id}`);
  let cpuanBilgiChannel = await db.get(`cezapuan-bilgi-log.${message.guild.id}`);
  let arr =await  db.get(`voice-mute.yetkili-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.lineReply(AutoReply.üyeBelirt)
    if(user.id === message.author.id) return message.lineReply(AutoReply.kendineİslem)  
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.lineReply(AutoReply.AynıYetki) 
    if (user.roles.cache.has(vmutedPerm)) return message.channel.send(AutoReply.vMuteli) 
    let time = args[1];
    if(!time || !ms(time)) return message.lineReply(AutoReply.zamanBelirt)
    let reason = args.splice(2).join(" ");
    if(!reason) reason = "Sebep belirtilmedi.";
    qdb.add(`smuteAlma.${user.id}`, 1) 
    qdb.add(`smuteAtma.${message.member.id}`, 1)
    qdb.add(`cpuan${user.id}`, 10) 
    qdb.add(`Cezaİd_`, +1); 
    let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
    let aylar = aylartoplam;
    let gün = moment(Date.now()).format("DD")
    let saat = moment(Date.now()).format("HH:mm:ss")
    var yıl = [moment().format('YYYY')]
    let Cezaİd = qdb.fetch(`Cezaİd_`) + 1; //
    let cpuan = qdb.fetch(`cpuan${user.id}`)
    let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')
    let bitis =  moment(Date.now() + ms(time)).format('DD/MM/YYYY H:mm')
  qdb.push(`info.${user.id}.ihlal`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id,  uyes: user.id, yetkili2: message.author.displayName, bsure: tarih, ssure: bitis, cpuan : "10", cezatip: "Voice Mute "});
  qdb.set(`cezaBilgi_${Cezaİd}`, { sebep: reason, kod: Cezaİd, yetkili2: message.author.displayName, yetkili: message.author.id,  uyes: user.id, bsure: tarih, cpuan : "10", ssure: bitis, cezatip: "Voice Mute"});
  await user.roles.add(vmutedPerm).catch(e => { })
  if(user.voice.channel) user.voice.setMute(true);
  setTimeout(async () => {
  await user.roles.remove(vmutedPerm).catch(e => { })
  qdb.delete(`voiceCehck_${user.id}`)
  if(user.voice.channel) user.voice.setMute(false);
  jdb.push(`sessusturulma`, {id: user.id, kalkmaZamani: Date.now()+ms(time)})  }, ms(time));
  let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
  client.channels.cache.get(muteBilgiChannel).send(embed.setDescription(`
  ${user} (\`${user.id}\`) adlı kullanıcı Ses kanallarında susturuldu.\n· Yetkili: ${message.author} (\`${message.author.tag}\` - \`${message.author.id}\`)\n· Tarih: \`${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}\`\n· Sebep: \`${reason}\``)).catch(e => { })    
  client.channels.cache.get(cpuanBilgiChannel).send(`${user} (\`${user.id}\`) son aldığınız \`Voice-Mute\` cezası ile \`${cpuan}\` cezapuanına ulaştınız.`).catch(e => { })
  message.channel.send(`:mute: ${user} adlı üye \`${reason}\` sebebiyle ${message.author} tarafından \`${time.replace(`s`, ` Saniye`).replace(`m`, ` Dakika`).replace(`h`, ` Saat`).replace(`d`, ` Gün`)}\` süresince ses kanallarında susturuldu! \`Ceza Numarası #${Cezaİd}\``)
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = {command: "vmute", description: "Ses kanllarındaki mutesini başlatır", aliases: ["v-mute","sesmute","ses-mute","voice-mute","voicemute"] }
