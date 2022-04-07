const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const Database = require('../../schemas/inviter.js');
const messageUserChannel = require("../../schemas/messageUserChannel");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
const conf = require("../../configs/config.json");

const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const db = require("quick.db");

const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");

require("moment-duration-format");

exports.execute = async (client, message, args) => {
  let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {

  let taglı = qdb.get(`aldı.${message.author.id}.tag`) || `0`;
  let mkp = qdb.get(`marketpuan${message.author.id}`) || `0`;
  let erkek = qdb.get(`erkekKayit_${message.author.id}`) || `0`;
  let toplamkayit = qdb.get(`toplamKayit_${message.author.id}`);
  let kız = qdb.get(`bayanKayit_${message.author.id}`) || `0`;

  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: message.author.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: message.author.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;

  const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
  };
  const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
  const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
  const voiceLength = Active2 ? Active2.length : 0;
  let voiceTop;
  let messageTop;
  Active1.length > 0 ? messageTop = Active1.splice(0, 15).map(x => `${x.channelID}: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Databasede Kayıtlı Veri Bulunmuyor."
  Active2.length > 0 ? voiceTop = Active2.splice(0, 15).map(x => `${x.channelID}: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Databasede Kayıtlı Veri Bulunmuyor."

  const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: message.author.id });
  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
  const filteredParents = message.guild.channels.cache.filter((x) => {
    x.type === "category" &&
    !conf.publicParents.includes(x.id) &&
    !conf.registerParents.includes(x.id) &&
    !conf.solvingParents.includes(x.id) &&
    !conf.privateParents.includes(x.id) &&
    !conf.aloneParents.includes(x.id) &&
    !conf.funParents.includes(x.id)
    });
  let Kategori = `● Public Kategorisi İstatikleri:: \`${await category(conf.publicParents)}\`\n● Kayıt Kategorisi İstatikleri: \`${await category(conf.registerParents)}\`\n● Özel Kategorisi İstatikleri: \`${await category(conf.privateParents)}\`\n● Music Kategorisi İstatikleri:: \`${await category(conf.aloneParents)}\`\n● Diğer Kategorisi İstatikleri: \`${await category(filteredParents.map(x => x.id))}\``
  let mesajcık = `Merhaba, ${message.author} aşağıdaki panelden, sunucudaki istediğin istatistiklerini öğrenebilirsin.`
  let StatEmbedInvReg = new MessageEmbed().setColor("RANDOM").setTitle("Davet ve Kayıt İstatistikleri").setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
  let StatEmbedSes = new MessageEmbed().setColor("RANDOM").setTitle("Ses ve Kategori İstatistikleri").setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
  let StatEmbedMesaj = new MessageEmbed().setColor("RANDOM").setTitle("Mesaj İstatistikleri").setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
  let kategoriStat = new MessageMenuOption().setLabel("Davet ve Kayıt İstatistiği").setValue("invitekayıt").setDescription("Kategori İstatistiğini Gösterir.").setDefault().setEmoji("956213043572920330")
  let sesStat = new MessageMenuOption().setLabel("Ses İstatistiği").setValue("sesstat").setDescription("Ses İstatistiğini Gösterir.").setDefault().setEmoji("956213043572920330")
  let MesajStat = new MessageMenuOption().setLabel("Mesaj İstatistiği").setValue("mesajstat").setDescription("Mesaj İstatistiğini Gösterir.").setDefault().setEmoji("956213043572920330")
  let iptal = new MessageMenuOption().setLabel("İptal").setValue("iptal").setDescription("Komutu İptal Eder.").setDefault().setEmoji("909545891550068756")
  let selection = new MessageMenu().setID("Selection").setPlaceholder("Panelden İstatistiklerine Ulaşabilirsin.").addOption(kategoriStat).addOption(sesStat).addOption(MesajStat).addOption(iptal)
  let menumsg = await message.channel.send(mesajcık, selection)
  client.on("clickMenu", (menu) => {
    if(menu.message.id == menumsg.id) {
      if(menu.clicker.user.id == message.author.id)
      menuselection(menu)
      else
      menu.reply.send("Hataaağğğ wexe ulaş hemen.", true)}})

  function menuselection(menu)
  {switch(menu.values[0])
    { case "invitekayıt": menu.reply.send(StatEmbedInvReg.setDescription(`**Davet İstatistikleri;**\n\nToplam Kullanıcı Sayısı: \`${total}\`\nGerçek Davet Sayısı: \`${regular} \`\nAyrılan Kullanıcı Sayısı: \`${leave}\`\nSahte Hesap Sayısı: \`${fake}\`\n─────────────────────\n**Kayıt İstatistikleri**\n\nTaglı Olarak Kaydedilen: \`${taglı}\`\nToplam Kayıt: \`${toplamkayit}\`\nErkek Kullanıcı: \`${erkek}\`\nKadın Kullanıcı: \`${kız}\`\nMarket Puan: \`${mkp}\``)),menumsg.delete()
    break;
    case "sesstat":menu.reply.send(StatEmbedSes.setDescription(`:page_with_curl:  **Kategori İstatistikleri**\n${Kategori}\n\n:loud_sound:  **Ses Kanal İstatikleri**\n${voiceTop}\n\n\`Toplam ${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")} ses kana kanallarında bulunmuşsun.\``)),menumsg.delete()
break;
case "mesajstat":
  menu.reply.send(StatEmbedMesaj.setDescription(`\n:page_with_curl:  **Kategori İstatistikleri**\n${Kategori}\n\n:speech_balloon:  **Mesaj Kanal İstatikleri**\n${messageTop}\n\n\`Metin kanallarına toplam ${messageData ? messageData.topStat : 0} mesaj yazmışsın.\``)),menumsg.delete()
  break;
  case "iptal":
    menu.reply.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Komut iptal edildi.`),menumsg.delete()
  break;
}}
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`);}}


exports.conf = { command: "ytstat",  description: "Yetkili Stat Bilgilerini gösterir.", aliases: ["yetkili-stat","ystat"] }
