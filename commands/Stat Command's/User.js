const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const Database = require('../../schemas/inviter.js');
const messageUserChannel = require("../../schemas/messageUserChannel");
const conf = require("../../configs/config.json");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");


const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");

const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");

require("moment-duration-format");

exports.execute = async (client, message, args) => {
  
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send(embed.setDescription("Bir kullanıcı belirtmelisin!"));


  const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
  };
  
  const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
  const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
  const voiceLength = Active2 ? Active2.length : 0;
  let voiceTop;
  let messageTop;
  Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `${x.channelID}: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
  Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `${x.channelID}: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."
  
  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
  const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });

  const messageDaily = messageData ? messageData.dailyStat : 0;
  const messageWeekly = messageData ? messageData.weeklyStat : 0;

  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");

  const filteredParents = message.guild.channels.cache.filter((x) =>
    x.type === "category" &&
    !conf.publicParents.includes(x.id) &&
    !conf.registerParents.includes(x.id) &&
    !conf.solvingParents.includes(x.id) &&
    !conf.privateParents.includes(x.id) &&
    !conf.aloneParents.includes(x.id) &&
    !conf.funParents.includes(x.id)
  );
 
  let cpuan = qdb.fetch(`cpuan${member.id}`) || `0`;

  let taglı = qdb.get(`aldı.${member.id}.tag`) || `0`;
  let uyeDurum;
    if (cpuan.length < 5) uyeDurum = 'Çok güvenli!';
    if (cpuan.length > 10 && cpuan.length < 50) uyeDurum = 'Güvenli!';
    if (cpuan.length > 51 && cpuan.length < 99) uyeDurum = 'Dikkat Çekiyor.!';
    if (cpuan.length > 100 && cpuan.length < 139) uyeDurum = 'Şüpheli!';
    if (cpuan.length > 140 && cpuan.length < 149) uyeDurum = 'Tehlikeli!';
    if (cpuan.length > 150) uyeDurum = 'Çok Tehkileli!';
  let mkp = qdb.get(`marketpuan${member.id}`) || `0`;
  let erkek = qdb.get(`erkekKayit_${member.id}`) || `0`;
  let toplamkayit = qdb.get(`toplamKayit_${member.id}`);
  let kız = qdb.get(`bayanKayit_${member.id}`) || `0`;

 
  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;

const görev = message.member.roles.cache.has("916343926456209418") ?
`\`\`\`
Cezapuan: ${cpuan || "0"} Puan (${uyeDurum})
Taglı Üye: ${taglı}
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\`` : "";





    let embed = new MessageEmbed().setColor("RANDOM");

   

   
  embed.setFooter(client.config.SetFooter)
    embed.setDescription(`
    ${member.toString()} kullanıcısının sunucu içerisindeki aktiflik bilgileri aşağıda belirtilmiştir.  `)

    embed.addField(`Kategori Bilgileri:`,

  `${client.emojis.cache.find(x => x.name === "wex_nokta")} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Public Kategori: \`${await category(conf.publicParents)}\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Register Kategori: \`${await category(conf.registerParents)}\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Private Kategori: \`${await category(conf.privateParents)}\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Alone Kategori: \`${await category(conf.aloneParents)}\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Diğer: \`${await category(filteredParents.map(x => x.id))}\`
  ─────────────────────`)

  embed.addField(`Ses Kanal Sıralaması:`,
  `${client.emojis.cache.find(x => x.name === "wex_nokta")} Sesli Kanal Bilgileri: (\`Toplam ${voiceLength} kanal\`)
    ${voiceTop}
    ─────────────────────`)

    embed.addField(`Mesaj Bilgileri:`,
    `${client.emojis.cache.find(x => x.name === "wex_message")} Mesaj Bilgileri: (\`Toplam ${messageData ? messageData.topStat : 0} mesaj\`)
    ${messageTop}
    ─────────────────────`)
    embed.addField(`Diğer Bilgiler:`,
    `${görev || "Veri Yüklenemedi."}`)

    message.lineReply(embed);
  }
    

  

exports.conf = {
  command: "user", 
  description: "ID li ceza bildiyi gösterir", // Komut açıklamamız
  aliases: ["userstat"] 
}
