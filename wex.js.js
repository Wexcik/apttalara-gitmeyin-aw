const MessageEmbed = require("discord.js");  
require('discord-reply');
const { Constants } = require('discord.js');
const Discord = require("discord.js");  
const chalk = require("chalk");
Constants.DefaultOptions.ws.properties.$browser = `Discord Android`
const _client = new Discord.Client({ fetchAllMembers: true });  
const client = global.client = _client
global.client = client;
const fs = require("fs");
const db = require("quick.db")
const qdb = require("quick.db")
const moment = require("moment")
const kdb = new db.table("kullanici");
const { Database } = require("ark.db");
require('discord-buttons')(client)
client.commands = new Discord.Collection();  
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => { if (err) console.error(err); files.forEach(f => { fs.readdir("./commands/" + f, (err2, files2) => { files2.forEach(file => { let props = require(`./commands/${f}/` + file); client.commands.set(props.conf.command, props), props.conf.aliases.forEach(aliases => { client.aliases.set(aliases, props);});})})});});
console.log(chalk `{blueBright Komutlar Yüklendi.}`);  
fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(file => {
  let event = require(`./events/${file}`);  
    client.on(event.conf.event, event.execute);  
});
console.log(chalk `{blueBright Eventler Yüklendi.}`);  
  var logs = require("discord-logs")
  logs(client)
  client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.lineReply(`${client.config.SunucuTag}`)});
client.on("message", message => {
    if(message.content.toLowerCase() == ".tag") 
    return message.lineReply(`${client.config.SunucuTag}
    `)
});
client.on("guildMemberRoleAdd", (member, role) => {
  let rolveren = member.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(audit => audit.entries.first());
  var yıl = [moment().format('YYYY')]
  let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
 member.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE"}).then(async (audit) => {
let ayar = audit.entries.first()
let hedef = ayar.target
let yapan = ayar.executor
if (yapan.bot) return
const Rolelog = new Discord.MessageEmbed().setFooter(`${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`).setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setColor("BLUE").setDescription(` \n${member} üyesine bir rol **eklendi.**\n\n**Rolü ekleyen kişi:** ${yapan} (\`${yapan.id}\`)\n**Eklenen rol:** ${role} (\`${role.id}\`)\n\n\`.rollog ${hedef.id}\``)
qdb.push(`rollog.${member.id}.kullanıcı`, { alanveren: `${yapan}`, rolbilgi: `${role}`, tarih: `${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`, kisi: `${hedef}`, almaverme: `Eklendi.`});
client.channels.cache.find(a => a.name === "role-log").send(Rolelog);});})
//-
client.on("guildMemberRoleRemove", (member, role) => {
  let rolveren = member.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(audit => audit.entries.first());
  var yıl = [moment().format('YYYY')]
  let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
  if(rolveren === undefined) rolveren: "Bilinmeyen"
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
 member.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE"}).then(async (audit) => {
let ayar = audit.entries.first()
let hedef = ayar.target
let yapan = ayar.executor
qdb.push(`rollog.${member.id}.kullanıcı`, { alanveren: `${yapan}`, rolbilgi: `${role}`, tarih: `${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`, kisi: `${hedef}`, almaverme: `Alındı.`});
const RoleLog = new Discord.MessageEmbed().setFooter(`Alınma Tarihi: ${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`).setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setColor("BLUE").setDescription(` 
${member} üyesinden bir rol **alındı.**\n\n**Rolü alan kişi:** ${yapan} (\`${yapan.id}\`)\n**Alınan rol:** ${role} (\`${role.id}\`)\n\n\`.rollog ${hedef.id}\``)
client.channels.cache.find(a => a.name === "role-log").send(RoleLog);});})
//-
client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  var yıl = [moment().format('YYYY')]
  let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
  member.guild.fetchAuditLogs({
      type: "MEMBER_UPDATE"}).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
const NickNameLog = new Discord.MessageEmbed().setFooter(`${gün}/${aylar[moment(Date.now()).format("MM")]}/${yıl} ${saat}`).setColor("BLUE").setDescription(`\`${hedef.tag}\` adlı kullanıcının sunucu içerisindeki kullanıcı adı değiştirildi.\n**ESKİ** \n"\`${oldNickname || member.user.tag}\`"\n**YENİ** \n"\`${newNickname || member.user.tag}\`"\`\`\`Kullanıcı: ${hedef.tag} (${hedef.id})\nDeğiştirme Tarihi: ${gün}/${aylar[moment(Date.now()).format("MM")]}/${yıl} ${saat}\nDeğiştiren: ${yapan.tag} (${yapan.id})\`\`\``);
client.channels.cache.find(a => a.name === "nickname-log").send(NickNameLog);})});
//-
client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
  var yıl = [moment().format('YYYY')]
  let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
  let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
  const WexEmbed = new Discord.MessageEmbed().setColor("BLUE").setDescription(`${user} ( \`${user.tag}\` ) üyesi Discord kullanıcı adını değiştirdi.\nYeni kullanıcı adı:\n"${newUsername || user.tag}"  \nEski kullanıcı adı:\n${oldUsername || user.tag}\`\`\`Kullanıcı: ${user.tag} (${user.id})\nDeğiştirme Tarihi: ${gün}/${aylar[moment(Date.now()).format("MM")]}/${yıl} ${saat}\`\`\``)
client.channels.cache.find(a => a.name === "username-log").send(WexEmbed);});


client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
  let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
  let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
var yıl = [moment().format('YYYY')]
const WexEmbed = new Discord.MessageEmbed().setTimestamp().setColor("BLUE").setTitle(`${user.tag}`).setThumbnail(`${newAvatarURL}`).setDescription(`\n${user} üyesi Discord Profil resmini değiştirdi.\nEski:\n[Görseli görmek için Tıkla](${oldAvatarURL})\nYeni:\n[Görseli görmek için Tıkla](${newAvatarURL})\`\`\` Kullanıcı: ${user.tag} ${user.id}\nKullanıcı: ${user.tag}\nKullanıcı Id: \nResim Değişme: ${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}\`\`\``)
client.channels.cache.find(a => a.name === "avatar-log").send(WexEmbed);});
//-
client.on("message", async message => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(".")) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(".".length);

  if (command === "eval" && message.author.id === "773265176597626950") {
    if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
    let code = args.join(' ');

    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Aptal orospu cocugu ne yapmaya çalışıyorsun.").replace(client.token, "Aptal orospu cocugu ne yapmaya çalışıyorsun.");
      message.channel.send(`${evaled.replace(client.token, "Aptal orospu cocugu ne yapmaya çalışıyorsun.")} ${evaled.replace(client.token, "Aptal orospu cocugu ne yapmaya çalışıyorsun.")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
  };})
//-
client.on("voiceStateUpdate", async (Wex1, Wex2) => {
  let teyzennabuyo = client.channels.cache.find(a => a.name === "ses-log"); 
  if (Wex1.channelID && Wex1.selfMute && !Wex2.selfMute) return teyzennabuyo.send(`:speaker: ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` adlı kanalda kendi susturmasını kaldırdı.`).catch();
  if (Wex1.channelID && !Wex1.selfMute && Wex2.selfMute) return teyzennabuyo.send(`:mute: ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` adlı kanalda kendisini susturdu. `).catch();
  if (Wex1.channelID && Wex1.selfDeaf && !Wex2.selfDeaf) return teyzennabuyo.send(`<:wex_undeaf:834190542383874108> ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` adlı kanalda kulaklığını açtı. `).catch();
  if (Wex1.channelID && !Wex1.selfDeaf && Wex2.selfDeaf) return teyzennabuyo.send(`<:wex_deaf:834190542191329291> ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` adlı kanalda kulaklığını kapadı. `).catch();
  if (Wex1.channelID && !Wex1.serverMute && Wex2.serverMute) return teyzennabuyo.send(`:mute: ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` adlı kanaldayken sunucuda mute yedi. `).catch();
  if (Wex1.channelID && Wex1.serverMute && !Wex2.serverMute) return teyzennabuyo.send(`:speaker: ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` adlı kanaldayken sunucudaki mutesi açıldı. `).catch();})
  //-
  client.on("voiceStateUpdate", async (Wex1, Wex2, ) => {
    let slmbnewex = client.channels.cache.find(a => a.name === "ses-log"); 
    if (!Wex1.channelID && Wex2.channelID) return slmbnewex.send(`:telephone: ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` isimli ses kanalına katıldı! - `).catch();
    if (Wex1.channelID && !Wex2.channelID) return slmbnewex.send(`:telephone: ${Wex2.guild.members.cache.get(Wex2.id).displayName} adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex1.channelID).name}\` adlı ses kanalından ayrıldı! - `).catch();
    if (Wex1.channelID && Wex2.channelID && Wex1.channelID != Wex2.channelID) return slmbnewex.send(`:telephone: ${Wex2.guild.members.cache.get(Wex2.id).displayName}\` adlı kullanıcı \`${Wex2.guild.channels.cache.get(Wex1.channelID).name}\` adlı ses kanalından çıkıp \`${Wex2.guild.channels.cache.get(Wex2.channelID).name}\` adlı ses kanalına girdi.`).catch();})
//-


client.on("message", async message => {
  if (!message.guild || message.channel.type === "dm") return;
  let db = require("quick.db")
  const prefix = client.config.prefix;
  if (!prefix) return;
  let ozelkomutlar = await db.get(`özelkomut_${message.guild.id}`);
  if (!ozelkomutlar) return;
  let yazilanKomut =  message.content.split(" ")[0];
  yazilanKomut = yazilanKomut.slice(prefix.length);
  var args = message.content.split(" ").slice(1);
  let komut = ozelkomutlar.find(x => x.isim.toLowerCase() === yazilanKomut);
  if (!komut) return;
  if (komut.tur === "rol") {
    let verilecekRol = message.guild.roles.cache.get(komut.verilecekRol);
    let yetki = message.guild.roles.cache.get(komut.yetkiliROL);
    if (!message.member.permissions.has("ADMINISTRATOR") && yetki && !message.guild.roles.cache.has(yetki.id))
      return message.lineReply(`Rol silinmiş olabilir.`);
    if (!verilecekRol) return message.lineReply(`Rol silinmiş olabilir.`);
    if (!message.member.permissions.has("ADMINISTRATOR") && yetki !== "0" && !message.member.roles.cache.has(yetki.id))
      return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(client.user.username, client.user.avatarURL()).setDescription(`Yetkin yeterli değil.`))
    let üye = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!üye)
      return message.lineReply(`Bir kullanıcı belirt ve tekrar dene.`)
    üye.roles.cache.get(verilecekRol.id) ? üye.roles.remove(verilecekRol.id).then(a => message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${üye} üyesinden ${verilecekRol} rolü alındı!`))) :
      üye.roles.add(verilecekRol.id).then(a => message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${üye} üyesine ${verilecekRol} rolü verildi!`)))
    return;
  }
});

     
client.on("clickButton", async (button) => {
  let EtkinlikRole = await db.get(`sunucu-etklinlik-katilimcisi.${button.guild.id}`);
let CekilisRole = await db.get(`sunucu-çekiliş-katilimcisi.${button.guild.id}`);
if (button.id == 'Etkinlik Katılımcısı'){
  if (button.clicker.member.roles.cache.has(EtkinlikRole)){
    await button.clicker.member.roles.remove(EtkinlikRole)
    await button.reply.think(true);
    await button.reply.edit(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Etklinlik Katılımcısı\` Rolü Üzerinizden Alındı.`)
  } else {
    await button.clicker.member.roles.add(EtkinlikRole)
    await button.reply.think(true);
    await button.reply.edit(`${client.emojis.cache.find(x => x.name === "wex_tik")} \`Etklinlik Katılımcısı\` Rolü Üzerinize Eklendi.`)
  }
} else {
  if (button.id == 'Çekiliş Katılımcısı'){
    if (button.clicker.member.roles.cache.has(CekilisRole)){
      await button.clicker.member.roles.remove(CekilisRole)
      await button.reply.think(true);
      await button.reply.edit(`${client.emojis.cache.find(x => x.name === "wex_carpi")} \`Çekiliş Katılımcısı\` Rolü Üzerinizden Alındı.`)
    } else {
      await button.clicker.member.roles.add(CekilisRole)
      await button.reply.think(true);
      await button.reply.edit(`${client.emojis.cache.find(x => x.name === "wex_tik")} \`Çekiliş Katılımcısı\` Rolü Üzerinize Eklendi.`)
    }
  } 
  
} 
})
client.on("messageDelete", async message => {
  let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
  let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
var yıl = [moment().format('YYYY')]
let tarihcik = `${gün}/${aylar[moment(Date.now()).format("MM")]}/${yıl} ${saat}`
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazar2: message.author.tag, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: tarihcik, dosya: message.attachments.first() ? true : false });
  if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});

client.login(client.config.WexinEmaneti).then(c => console.log(chalk `{cyan Connected_Bot } Bot: {magenta ${client.user.tag} }`)).catch(err => console.error(`Bot giriş yapamadı!`));  
