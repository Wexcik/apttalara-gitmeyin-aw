
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require('ms');
const moment = require("moment");

exports.execute = async (client, message, args) => {
  let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  


  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  const embed = new MessageEmbed()
      .setAuthor(user.user.tag, user.user.avatarURL({ dynamic: true }))
      .setThumbnail(user.user.avatarURL({ dynamic: true }))
      .setColor("BLACK")
  if (message.guild.members.cache.has(user.id)) {
      let member = message.guild.members.cache.get(user.id);
      let nickname = member.displayName == user.username ? "" + user.username + " [Yok] " : member.displayName
      const members = message.guild.members.cache.filter(x => !x.user.bot).array().sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
      const joinPos = members.map((u) => u.id).indexOf(member.id);
      const roles = member.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
      const rolleri = [];
      if (roles.length > 6) {
          const lent = roles.length - 6;
          let itemler = roles.slice(0, 6);
          itemler.map(x => rolleri.push(x));
          rolleri.push(`${lent}...`);
      } else {
          roles.map(x => rolleri.push(x));
      };
      embed.setDescription(`
**❯ Kullanıcı Bilgisi**
\`•\` Hesap: ${user}
\`•\` Kullanıcı ID: \`${member.id}\`
\`•\` Kuruluş Tarihi: \`${moment(member.user.createdTimestamp).locale("tr").format("LLL")} - (${moment(member.user.createdTimestamp).locale("tr").fromNow()})\`

**❯ Sunucu Bilgisi**
\`•\` Sunucu İsmi: \`${nickname}\`
\`•\` Katılım Tarihi: \`${moment(member.joinedAt).locale("tr").format("LLL")} - (${moment(member.joinedAt).locale("tr").fromNow()})\`
\`•\` Katılım Sırası: \`${joinPos} / ${message.guild.members.cache.size}\`
\`•\` Rolleri (${rolleri.length}): ${rolleri.join(", ")}


`)
  embed.setColor(member.displayHexColor);}
  message.lineReply(embed)
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "profil",  description: "Yazılan kanalı everyone rolüne kanala yazı kapatır", aliases: [] }