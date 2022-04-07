const { MessageEmbed } = require("discord.js");
const { Discord } = require("discord.js");
const client = global.client;
const qdb = require("quick.db");
const Database = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
exports.execute = async (member) => {
  client.giris = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / ( 1000 * 60 * 60 * 24 * 365 ));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / ( 1000 * 60 * 60 * 24 * 30 ));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / ( 1000 * 60 * 60 * 24 * 7 ));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / ( 1000 * 60 * 60 * 24 ));
    msecs -= days * 1000 * 60 * 60 * 24
    const hours = Math.floor(msecs / ( 1000 * 60 * 60 ));
    msecs -= hours * 1000 * 60 * 60
    const mins = Math.floor(msecs / ( 1000 * 60 ));
    msecs -= mins * 1000 * 60
    const secs = Math.floor(msecs / ( 1000 ));
    msecs -= secs * 1000;
    
    var string = "";
     if (years > 0) string += `${years} yıl ${months} ay`
      else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
      else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
      else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
      else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
      else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
      else if (secs > 0) string += `${secs} saniye`
      else string += `saniyeler`;
      string = string.trim();
      return `${string} önce`;
    }
    

  let guvenli = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let jail = qdb.get(`jaill.${member.id}`)
  let fBan = qdb.get(`fBan.${member.id}`)
  reklam = qdb.get(`reklamcıoc.${member.id}`)
  let RegisterChat = await Database.get(`register-chat.${member.guild.id}`);
  let GirisLog = await Database.get(`  guvenlik-giris-log.${member.guild.id}`);
  let unregisterRol = await Database.get(`unregisterRole-server.${member.guild.id}`);
  let Süpheli = await Database.get(`sunucu-supheli-rol.${member.guild.id}`);
  let cezali = await Database.get(`jailed-rol.${member.guild.id}`);
  let SunucuTag = await Database.get(`sunucu-tagi.${member.guild.id}`);
  let WayneTag = await Database.get(`sunucu-tagi-wayne.${member.guild.id}`);

    if(jail) {
    member.roles.add(cezali).catch(e => { })
    client.channels.cache.get(RegisterChat).send(`${member} (\`${member.id}\` - \`${member.user.tag}\`) adlı kullanıcı cezalı'da iken sunucudan ayrılıp tekrar katıldığı için karantinaya gönderildi.`)
  } else if(guvenli) {
    member.roles.add(Süpheli).catch(e => { })
    client.channels.cache.get(RegisterChat).send(`${member} (\`${member.id}\` - \`${member.user.tag}\`) adlı kullanıcı hesabını \`7\` gün içerisinde açtığı için Karantina'ya gönderildi (${moment(member.user.createdAt).locale("tr").format("LLL")})`)
  } else {
    client.channels.cache.get(RegisterChat).send(`> ${member.guild.name} Sunucusuna Hoşgeldin ${member} (\`${member.id}\` - \`${member.user.tag}\`)

> Hesabını \`${moment(member.user.createdAt).locale("tr").format("LLL")}\` tarihinde \`(${client.giris(member.user.createdAt)})\` oluşturmuşsun.

> Tagımızı alarak destek olabilirsiniz. Seninle beraber **${member.guild.memberCount}** kişi olduk (\`${WayneTag}\`)
\`\`\`fix
Sunucunun Düzenini sağlamak için bazı kurallar belirlenmiştir. Bu kurallar Rules kanalından yazmaktadır sunucuya kayıt olduktan sonra kuralları kabul etmiş sayılacaksın tüm ceza-i işlemler o kurallar çerçevesinde uygulanacaktır.\`\`\``)
    member.roles.add(unregisterRol).catch(e => { })
  }


 
};
exports.conf = {
  event: "guildMemberAdd" 
};