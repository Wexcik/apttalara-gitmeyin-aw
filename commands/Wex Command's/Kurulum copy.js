const { MessageEmbed } = require("discord.js");
const Database = require("quick.db");
require("moment-duration-format");
const db = require("quick.db")
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const moment = require("moment");
require("../../wexab.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== "728161454288535604")  return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));
//--------
let VoiceMuteYetkili = await db.get(`voice-mute.yetkili-aut.${message.guild.id}`) || []
let ChatMuteYetkili = await db.get(`chat-mute.yetkili-aut.${message.guild.id}`) || []
let JailYetkili = await db.get(`jail-cezali.yetkili-aut.${message.guild.id}`) || []
let BanYetkili = await db.get(`ban-yetkili-aut.${message.guild.id}`) || []
let KayıtSorumlusu = await db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
let acik = `${client.emojis.cache.find(x => x.name === "wex_tik")}`
let kapali = `${client.emojis.cache.find(x => x.name === "wex_carpi")}`
//--------
let ErkekRol = await db.get(`erkek-roles.${message.guild.id}`) || []
let KadınRol = await db.get(`kadin-roles.${message.guild.id}`) || []
let ÇekilişKatılımcısıı = await db.get(`sunucu-çekiliş-katilimcisi.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Çekiliş Katılımcısı**: <@&${await db.get(`sunucu-çekiliş-katilimcisi.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum ckatılım @rol\``
let EtkinlikKatılımcısı = await db.get(`sunucu-etklinlik-katilimcisi.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Etkinlik Katılımcısı**: <@&${await db.get(`sunucu-etklinlik-katilimcisi.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum ekatılım @rol\``
let Booster = await db.get(`sunucu-booster-role.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Booster Rol**: <@&${await db.get(`sunucu-booster-role.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum booster @rol\``
let ChatMuted = await db.get(`chat-muted.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Chat-Muted Rol**: <@&${await db.get(`chat-muted.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum cmuted @rol\``
let VoiceMuted = await db.get(`sunucu-voice-muted.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Voice-Muted Rol**: <@&${await db.get(`sunucu-voice-muted.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum vmuted @rol\``
let JailedRole = await db.get(`jailed-rol.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Cezalı Rol**: <@&${await db.get(`jailed-rol.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum cezalı @rol\``
let SuspectRole = await db.get(`sunucu-supheli-rol.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Şüpheli Rol**: <@&${await db.get(`sunucu-supheli-rol.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum şüpheli @rol\``
let KayıtsızRol = await db.get(`unregisterRole-server.${message.guild.id}`) ? `[${client.emojis.cache.find(x => x.name === "wex_tik")}] **Kayıtsız Rol**: <@&${await db.get(`unregisterRole-server.${message.guild.id}`)}>` : `[${client.emojis.cache.find(x => x.name === "wex_carpi")}] \`.kurulum kayıtsız @rol\``

//--------      
  let RolKurulumları = new MessageMenuOption().setLabel("Rol Kurulumları").setValue("rolkurulumları").setDescription("Detaylı Rol Kurulumları.").setDefault().setEmoji("948025791625695235")
  let KanalKurulumları = new MessageMenuOption().setLabel("Kanal Kurulumları").setValue("kanalkurulumları").setDescription("Detaylı Kanal Kurulumları.").setDefault().setEmoji("948025791625695235")
  let BotYardım = new MessageMenuOption().setLabel("Bot Kurulumları").setValue("botkurulumları").setDescription("Detaylı Bot Kurulumları.").setDefault().setEmoji("948025791625695235")
  let mesajcık = `Merhaba, ${message.author} aşağıdaki panelden, sunucudaki istediğin istatistiklerini öğrenebilirsin.`
  let selection = new MessageMenu().setID("Selection").setPlaceholder("Aşağıda Bulunan Seçim Ekranından Kurulum Hakkında Bilgi Alabilirsin.").addOption(RolKurulumları).addOption(KanalKurulumları).addOption(BotYardım)
  let YetkiRolKurulum = `${await db.has(`voice-mute.yetkili-aut.${message.guild.id}`) ? `${client.emojis.cache.find(x => x.name === "wex_tik")} **Voice-Mute Yetkili**: (${VoiceMuteYetkili.map(c => `<@&${c}>`)})` : `[**${client.emojis.cache.find(x => x.name === "wex_carpi")}**] \`.kurulum vmuteyetkili @rol @rol2 @rol3\``}\n─────────────────────\n${await db.has(`chat-mute.yetkili-aut.${message.guild.id}`) ? `${client.emojis.cache.find(x => x.name === "wex_tik")} **Chat-Mute Yetkili**: (${ChatMuteYetkili.map(c => `<@&${c}>`)})` : `[**${client.emojis.cache.find(x => x.name === "wex_carpi")}**] \`.kurulum cmuteyetkili @rol @rol2 @rol3\``}\n─────────────────────\n${await db.has(`jail-cezali.yetkili-aut.${message.guild.id}`) ? `${client.emojis.cache.find(x => x.name === "wex_tik")} **Jail Yetkili**: (${JailYetkili.map(c => `<@&${c}>`)})` : `[**${client.emojis.cache.find(x => x.name === "wex_carpi")}**] \`.kurulum jailyetkili @rol @rol2 @rol3\``}\n─────────────────────\n${await db.has(`ban-yetkili-aut.${message.guild.id}`) ? `${client.emojis.cache.find(x => x.name === "wex_tik")} **Ban Yetkili**: (${BanYetkili.map(c => `<@&${c}>`)})` : `[**${client.emojis.cache.find(x => x.name === "wex_carpi")}**] \`.kurulum banyetkili @rol @rol2 @rol3\``}\n─────────────────────\n${await db.has(`kayıt-yetkil-aut.${message.guild.id}`) ? `${client.emojis.cache.find(x => x.name === "wex_tik")} **Kayıt Sorumlusu**: (${KayıtSorumlusu.map(c => `<@&${c}>`)})` : `[**${client.emojis.cache.find(x => x.name === "wex_carpi")}**] \`.kurulum kayıtsorumlusu @rol @rol2 @rol3\``}`
  let GenelRolKurulum = `\n${await db.has(`erkek-roles.${message.guild.id}`) ? `${client.emojis.cache.find(x => x.name === "wex_tik")} **Erkek Rol**: (${ErkekRol.map(c => `<@&${c}>`)})` : `[**${client.emojis.cache.find(x => x.name === "wex_carpi")}**] \`.kurulum erkek @rol @rol2 @rol3\``}\n─────────────────────\n${await db.has(`kadin-roles.${message.guild.id}`) ? `${client.emojis.cache.find(x => x.name === "wex_tik")} **Kadın Rol**: (${KadınRol.map(c => `<@&${c}>`)})` : `[**${client.emojis.cache.find(x => x.name === "wex_carpi")}**] \`.kurulum kadın @rol @rol2 @rol3\``}\n────────────────────\n ${Booster}\n ────────────────────\n ${ChatMuted}\n ────────────────────\n${VoiceMuted}\n────────────────────\n${JailedRole}\n────────────────────\n${SuspectRole}\n────────────────────\n${KayıtsızRol}\n────────────────────\n${ÇekilişKatılımcısıı}\n────────────────────\n${EtkinlikKatılımcısı}` 
  let KanalKurulum = `
  ${await db.has(`register-chat.${message.guild.id}`) ? `[**${acik}**] **Register Chat** (<#${await db.get(`register-chat.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum kayıtkanal #kanal\`[**Register-Chat**]`}
  ${await db.has(`voice-mute-bilgi-log.${message.guild.id}`) ? `[**${acik}**] **VoiceMute Bilgi** (<#${await db.get(`voice-mute-bilgi-log.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum vmutelog #kanal\`[**Vmute-Bilgi**]`}
  ${await db.has(`chat-mute-bilgi-log.${message.guild.id}`) ? `[**${acik}**] **ChatMute Bilgi** (<#${await db.get(`chat-mute-bilgi-log.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum cmutelog #kanal\`[**CMute-Bilgi**]`}
  ${await db.has(`jail-cezali-bilgi-log.${message.guild.id}`) ? `[**${acik}**] **Jail Bilgi** (<#${await db.get(`jail-cezali-bilgi-log.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum jaillog #kanal\`[**Jail-Bilgi**]`}
  ${await db.has(`ban-yasaklama-bilgi-log.${message.guild.id}`) ? `[**${acik}**] **Ban Bilgi** (<#${await db.get(`ban-yasaklama-bilgi-log.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum banlog #kanal\`[**Ban-Bilgi**]`}
  ${await db.has(`cezapuan-bilgi-log.${message.guild.id}`) ? `[**${acik}**] **Cezapuan Chat** (<#${await db.get(`cezapuan-bilgi-log.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum cpuanlog #kanal\`[**Cezapuan-Bilgi**]`}
  ${await db.has(`sunucu.kullanıcı-panel-kanal.${message.guild.id}`) ? `[**${acik}**] **Kullanıcı Panel** (<#${await db.get(`sunucu.kullanıcı-panel-kanal.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum kpanel #kanal\`[**Kullanıcı-Panel**]`}
  ${await db.has(`sunucu.rol-alma-kanal.${message.guild.id}`) ? `[**${acik}**] **Rol Alma** (<#${await db.get(`sunucu.rol-alma-kanal.${message.guild.id}`)}>)` : `[**${kapali}**] \`.kurulum rolalma #kanal\`[**Rol-Alma**]`}
  ${await db.has(`sunucu.rol-secim-kanal.`) ? `[**${acik}**] **Rol Seçim** (<#${await db.get(`sunucu.rol-secim-kanal.`)}>)` : `[**${kapali}**] \`.kurulum rolsecim #kanal\`[**Rol-Seçim**]`}`
  let Embed = new MessageEmbed().setColor("RANDOM").setFooter("Developed by 𝓦𝓮𝔁").setThumbnail("https://media.discordapp.net/attachments/945394500417757224/959036444549210163/unknown.png?width=85&height=81")
  let menumsg = await message.channel.send(mesajcık, selection)
  client.on("clickMenu", (menu) => {
    if(menu.message.id == menumsg.id) {
      if(menu.clicker.user.id == message.author.id)
      menuselection(menu)
      else
      menu.reply.send("Hataaağğğ wexe ulaş hemen.", true)}})

  function menuselection(menu)
  {switch(menu.values[0])
    { case "rolkurulumları": menu.reply.send(Embed.setDescription(`\`\`\`fix\nYETKİ KURULUMLARI\`\`\`${YetkiRolKurulum} \`\`\`fix\nGENEL ROL KURULUMLARI\`\`\`${GenelRolKurulum}
`)),menumsg.delete()
    break;
    case "kanalkurulumları":menu.reply.send(Embed.setDescription(`\`\`\`fix\nKANAL KURULUMLARI\`\`\`${KanalKurulum}`)),menumsg.delete()
break;
case "botkurulumları":
  menu.reply.send(Embed.setDescription(`─────────────────**YARDIM**─────────────────
**Kurulum Yapabilecek Kişileri Nereden Düzenleyebilirim.?**
\`\`\`fix\nKurulum Yapabilecek Kişileri wexab.js dosyasında BotOwner ve Wex kısımlarıma kurulum yapabilecek kişilerin id'sini girebilirsin.\`\`\`
**Kurulumu Nasıl Yapacağım?**
\`\`\`Kurulumu Gerçekleştirmek Herşeyden daha kolay örnek, .kurulum erkek @ErkekRolü @ErkekRolü2 şeklinde rolü etiketleyerek yapabilirsiniz.\`\`\``)),menumsg.delete()
  break;
}}

          
  }
exports.conf = { command: "kurulum-yardım", aliases: [], description: "setup"}
