const { MessageEmbed, Role } = require("discord.js");
const moment = require("moment");
require('discord-reply');
const db = require("quick.db");
const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");
const AutoReply = require("../../AutoReply")
require("../../wexab.js");
exports.execute = async (client, message, args) => {
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let RegisterEmbed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
let erkekRol = await db.get(`erkek-roles.${message.guild.id}`);
let kadınRol = await db.get(`kadin-roles.${message.guild.id}`);
let unregisterRol = await db.get(`unregisterRole-server.${message.guild.id}`);
let SunucuTag = await db.get(`sunucu-tagi.${message.guild.id}`);
let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {

if (!SunucuTag) return message.reply(`Lütfen Kurulumu Tamamlayınız \`.kurulum tag TAG\``)

let isim = args[1]; let yas = args[2];
if(!user) return message.lineReply(AutoReply.üyeBelirt)
if(!isim) return message.lineReply(AutoReply.isimBelirt)
if(!yas) return message.lineReply(AutoReply.isimBelirt)

kdb.push(`kullanici.${user.id}.kayıt`, { isim: isim, yas: yas ? `| ${yas}` : ``, rol: "İsim Değiştirme",   });
var tarih = [moment().format('DD/MM/YYYY | H:mm:ss')]
client.channels.cache.find(a => a.name === "register-log").send(`\`[${tarih}]\` ${user}(\`${user.id}\`) adlı kullanıcı ${message.author}(\`${message.author.id}\`) adlı yetkili tarafından **Erkek** Olarak kayıt edildi. `)
client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.isim\` komutunu kullandı. [\`${message.content}\`]`);
        await user.setNickname(`${SunucuTag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``}`).catch(e => { });
        message.lineReply(RegisterEmbed.setDescription(`
        ${user} kullanıcısının ismi ${SunucuTag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yas ? ` | ${yas}` : ``} olarak değiştirildi`)).then(x => x.delete({timeout: 30000})).catch(e => { });
        qdb.add(`marketpuan${message.member.id}`, 20) 
        return message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));} else { return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`);}}
exports.conf = { command: "isim",  description: "Belirtilen kişiyi erkek olarak kayıt eder",  aliases: ["isimdeğiş", "name"]}