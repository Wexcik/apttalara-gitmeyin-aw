const Discord = require("discord.js")
exports.execute = async (client, message, args) => {
    const qdb = require("quick.db")


    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if(!message.member.roles.cache.has(client.config.BotCommands))
    if(!message.member.roles.cache.has(client.config.AltYetki))
    if(!message.member.roles.cache.has(client.config.OrtaYetki))
    if(!message.member.roles.cache.has(client.config.ÜstYetki))
    if (!message.member.hasPermission("ADMINISTRATOR"))
    if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));
  
let csm = message.mentions.members.first() || message.guild.members.cache.get(args[0])

let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM");

if(!csm) return message.reply(new Discord.MessageEmbed()
.setDescription("Bir kullanıcı belirtmelisin."))
 let yayınacmauser = qdb.fetch(`yayınacma.${csm.id}`) || `0`;
 let yayınacmauserkanal = qdb.fetch(`yayınacmakanal.${csm.id}`)

 message.lineReply(new Discord.MessageEmbed().setFooter("Kullanıcının yayın bilgilerini sıfırlamak için .streamerdenetsıfırla @Uye/ID")
.setDescription(`${csm} adlı kullanıcı toplam **${yayınacmauser}** yayın açmış`)
.setColor(`GREEN`))
}



exports.conf = {
    command: "yayındenet",
    aliases: ["streamerdenet"]
} 
