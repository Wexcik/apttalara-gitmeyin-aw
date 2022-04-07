const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');
require('discord-reply');
const db = require("quick.db");
const AutoReply = require("../../AutoReply")
const qdb = require("quick.db");
exports.execute = async (client, message, args) => {
 let SunucuTag = await db.get(`sunucu-tagi.${message.guild.id}`);
 let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
 if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) { 
 let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.lineReply(AutoReply.üyeBelirt)
    let data = qdb.fetch(`TagAlan.${member.id}`)
    if(!member.user.username.includes(SunucuTag)) return message.lineReply(AutoReply.Tagsız)
    if(data) return message.lineReply(AutoReply.Taglıİsaretli).then(x => x.delete({timeout: 10000}));
    let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
    let aylar = aylartoplam;
    let gün = moment(Date.now()).format("DD")
    let saat = moment(Date.now()).format("HH:mm:ss")
    var yıl = [moment().format('YYYY')]
        const filter = (reaction, user) => {return ["📌"].includes(reaction.emoji.name) && user.id === member.id; };
        message.channel.send(`${member}, ${message.author} adlı yetkilimiz seni taglı olarak kayıt etmek istiyor, kabul etmek için tepkiye basabilirsin.`).then(x => {
        x.react("📌");x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                let response = resp.first();
                if (response) {
            qdb.add(`aldı.${message.author.id}.tag`, +1);
            qdb.push(`tagaldı.${message.author.id}`, { guildName: `${member}`, guildNameid: `${member.id}`, Kullanıcı: `${member.user.tag}`, Zaman: `${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}`,Yetkili: message.author.id});
            qdb.set(`TagAlan.${member.id}`,true)
            let datas = qdb.get(`aldı.${message.author.id}.tag`)
            message.lineReply(`${client.emojis.cache.find(x => x.name === "wex_tik")} ${member} - (\`${member.user.tag}\` - \`${member.id}\`) adlı kullanıcıyı \`${moment(Date.now()).format("DD.MM.YYYY HH:mm:ss ")}\` tarihinde taglı olarak kayıt ettin.`);
            client.channels.cache.get(client.config.TagAldırLog).send(`${client.emojis.cache.find(x => x.name === "wex_tik")} ${message.author} (\`${message.author.tag}\` - \`${message.author.id}\`) adlı yetkili ${member} (\`${member.user.tag}\` - \`${member.id}\`) adlı kullanıcıyı taglı olarak kayıt etti.`)};});})} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`);}}
exports.conf = { command: "tagaldır", description: "", aliases: ["tagaldı", "taglı"],}