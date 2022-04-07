const { MessageEmbed, } = require("discord.js");

exports.execute = async(client, message, args) => {
  let arr =await  db.get(`voice-mute.yetkili-aut.${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {  

        let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!rol) return;
        let rolrenk = `${rol.hexColor}`
        let rolID = `${rol.id}`
        let roluyesayi = `${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).size}`
        let rolkisiler = `${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).map(x => `${x} - (\`${x.id}\`)`).join("\n")}`

message.lineReply(`
- Roldeki kişi sayısı: \`${roluyesayi}\`

- Roldeki kişiler;
${rolkisiler}
`, {split: true})
} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = {command: "rol", description: "Belirtilen üyeye kalıcı olarak ban atar", aliases: ["üyeler"] }