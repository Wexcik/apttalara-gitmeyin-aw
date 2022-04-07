const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
exports.execute = async (client, message, args) => {
  let BotCommandRol = await db.get(`sunucu-bot-komut-role.${message.guild.id}`);
  let arr =await  db.get(`voice-mute.yetkili-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  
  let phentos = ""
  let phentos2 = ""
  message.guild.roles.cache.get(BotCommandRol).members.map(r => { //herkeste olan rolü yazın.
    phentos += r.voice.channel ? " <@" + r.user.id + ">" : "";
    phentos2 += !r.voice.channel ? " <@" + r.user.id + ">" : "";});
var button_1 = new MessageButton().setID("1").setLabel("Ses Kanalında Bulunanlar").setStyle("red")
var button_2 = new MessageButton().setID("2").setLabel("İptal").setStyle("gray")
var button_3 = new MessageButton().setID("3").setLabel("Ses Kanalında Bulunmayanlar").setStyle("blurple")
let embedwex = new MessageEmbed().setFooter(`50 Saniye sonra butonlar kullanılmaz hale gelecektir.`)
.setDescription(`
Merhaba, İstatiktiklerinize erişmek için aşağıdaki bilgilendirmeyi okuyunuz.

\`•\` Ses Kanallarında **Bulunan** Yetkileri Görmek için. \`KIRMIZI BUTON 🔴\` 
\`•\` İptal Etmek için. \`GRAY BUTON ⚫\` 
\`•\` Ses Kanallarında **Bulunmayan** Yetkileri Görmek için \`MAVİ BUTON 🔵\` `)
    let embed = new MessageEmbed().setColor("RANDOM");
    let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3], embed: embedwex})
    var filter = (button) => button.clicker.user.id === message.author.id;
    let collector = await msg.createButtonCollector(filter, {time: 50000})
      collector.on("collect", async (button) => {
        if(button.id === "1") {
          await button.reply.defer()
          msg.delete()
          message.channel.send(`\`\`\`fix\n${phentos}\`\`\``)}
        if(button.id === "2") {
          await button.reply.defer()
          msg.delete()
          message.channel.send(embed.setDescription(`
          İşlem İptal edildi.`))}
          if(button.id === "3") {
          await button.reply.defer()
          msg.delete()
          message.channel.send(`\`\`\`fix\n${phentos2}\`\`\``)}});} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "ytsaywex", description: "Belirtilen üyenin eski isimlerini atar", aliases: ["wexsay"]}
