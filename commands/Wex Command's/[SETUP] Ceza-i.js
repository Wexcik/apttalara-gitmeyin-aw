const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
require("moment-duration-format");
const db = require("quick.db");

const moment = require("moment");
require("../../wexab.js");
exports.execute = async (client, message, args) => {

  if(message.author.id !== "728161454288535604") return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));

    let embed2 = new MessageEmbed().setColor("RANDOM");

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    
    let reklamrol = await db.get(`reklamcı_${message.guild.id}`) || []

    let baslangıcyt = await db.get(`baslangıcyt_${message.guild.id}`) || []
    let ikinciyt = await db.get(`2inciyt_${message.guild.id}`) || []
    let ücüncüyt = await db.get(`3üncücyt_${message.guild.id}`) || []    
    let vmuteytrol = await db.get(`vmuteyetkilirole_${message.guild.id}`) || []
    let muteytrol = await db.get(`muteyetkilirole_${message.guild.id}`) || []
    let jailytrol = await db.get(`jailyetkilirole_${message.guild.id}`) || []
    let banytrol = await db.get(`banyetkilirole_${message.guild.id}`) || []
    let unregisterrole = await db.get(`unregisterrole_${message.guild.id}`) || []
    let şüphelirol = await db.get(`şüphelirole_${message.guild.id}`) || []
    let registeryrol = await db.get(`registeryrole_${message.guild.id}`) || []
    let cezalırol = await db.get(`cezalırole_${message.guild.id}`) || []
    let kadınrole = await db.get(`kadınrole_${message.guild.id}`) || []
    let reklamyt = await db.get(`reklamcıyt_${message.guild.id}`) || []

    let botkomutrol = await db.get(`botkomutrole_${message.guild.id}`) || []
    let taglırol = await db.get(`teamrole_${message.guild.id}`) || []
    let enaltyt = await db.get(`enaltytrole_${message.guild.id}`) || []

    let cekiliskatılım = await db.get(`cekiliskatılım_${message.guild.id}`) || []
    let etkinlikkatılım = await db.get(`etkinlikkatılım_${message.guild.id}`) || []
    
    let vip = await db.get(`viptrole_${message.guild.id}`) || []
    let vip2 = await db.get(`+viptrole_${message.guild.id}`) || []
    let streamerr = await db.get(`streamertrole_${message.guild.id}`) || []
    let vmuted = await db.get(`vmuted_${message.guild.id}`) || []
    let muted = await db.get(`muted_${message.guild.id}`) || []
    let vkcezalı = await db.get(`vkcezalı_${message.guild.id}`) || []
    let dccezalı = await db.get(`dccezalı_${message.guild.id}`) || []

    

    let erkekrole = await db.get(`erkekrole_${message.guild.id}`) || []
    const acik = ` ${client.emojis.cache.find(x => x.name === "wex_yesil")}`
    const kapali = ` ${client.emojis.cache.find(x => x.name === "wex_kirmizi")}`

    message.lineReply(embed2.setDescription(`
    **Voice Mute**
    ${await db.has(`vmuteyetkilirole_${message.guild.id}`) ? `${acik} - **VoiceMute Yetkili**: (${vmuteytrol.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup vmuteyetkili @rol @rol2 @rol3\``}
    ${await db.has(`vmutebilgi_wex`) ? `${acik} - **VoiceMute Bilgi** (<#${await db.get(`vmutebilgi_wex`)}>)` : `${kapali} - \`.kanalsetup vmutebilgi #kanal\``}
    ${await db.has(`vmuted_${message.guild.id}`) ? `${acik} - **Vmuted**: (${vmuted.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup vmuted @rol\``}
    **Chat Mute**
    ${await db.has(`muteyetkilirole_${message.guild.id}`) ? `${acik} - **ChatMute Yetkili**: (${muteytrol.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup muteyetkili @rol @rol2 @rol3\``}
    ${await db.has(`muted_${message.guild.id}`) ? `${acik} - **Muted**: (${muted.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup muted @rol\``}
    ${await db.has(`cmutebilgi_wex`) ? `${acik} - **ChatMute Bilgi** (<#${await db.get(`cmutebilgi_wex`)}>)` : `${kapali} - \`.kanalsetup cmutebilgi #kanal\``}
    **Jail'd**
    ${await db.has(`jailyetkilirole_${message.guild.id}`) ? `${acik} - **Jail Yetkili**: (${jailytrol.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup reklamyetkili @rol @rol2 @rol3\``}
    ${await db.has(`jailbilgi_wex`) ? `${acik} - **Jail Bilgi** (<#${await db.get(`jailbilgi_wex`)}>)` : `${kapali} - \`.kanalsetup jailbilgi #kanal\`[**Jail-Bilgi**]`}
    ${await db.has(`cezalırole_${message.guild.id}`) ? `${acik} - **Cezalı Rolü**: (${cezalırol.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup cezalı @rol\``}
    **Ban**
    ${await db.has(`banyetkilirole_${message.guild.id}`) ? `${acik} - **Ban Yetkili**: (${banytrol.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup banyetkili @rol @rol2 @rol3\``}
    ${await db.has(`banbilgi_wex`) ? `${acik} - **Ban Bilgi** (<#${await db.get(`banbilgi_wex`)}>)` : `${kapali} \`.kanalsetup banbilgi #kanal\`[**Ban-Bilgi**]`}
    **Reklam**
    ${await db.has(`reklamcıyt_${message.guild.id}`) ? `${acik} **Reklam Yetkili**: (${reklamyt.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup reklamyetkili @rol @rol2 @rol3\``}
    ${await db.has(`reklambilgi_wex`) ? `${acik} - **Reklam Bilgi** (<#${await db.get(`reklambilgi_wex`)}>)` : `${kapali} - \`.kanalsetup reklambilgi #kanal\``}
    ${await db.has(`reklamcı_${message.guild.id}`) ? `${acik} - **Reklamcı Rolü**: (${reklamrol.map(c => `<@&${c}>`)})` : `${kapali} - \`.rolesetup reklamcı @rol\``}
    `))
    

    
    }


exports.conf = {
    command: "islemsetup",
    aliases: [],
    description: "Belirtilen üyenin tüm bilgilerini gösterir."
}
