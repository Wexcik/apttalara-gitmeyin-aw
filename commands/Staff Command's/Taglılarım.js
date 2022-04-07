const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const qdb = require("quick.db");
const db = require("quick.db");
exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true })).setColor(message.member.displayHexColor).setFooter(client.config.SetFooter)
    let arr =await  db.get(`kayıt-yetkil-aut.${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {      
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = qdb.get(`tagaldı.${member.id}`) || [];
let listedData = data.length > 0 ? data.map((value, index) => `${index + 1}. ${value.Kullanıcı} ${value.Zaman}`).join("") : "Hiç bir kullanıcıyı taglı olarak kayıt etmemiş.";
message.channel.send(embed.setDescription(`Merhaba, ${message.author} aşağıdaki çizelgeden tag aldırdığın kullanıcıları görmektesin. \n\`\`\`fix\n${listedData}\`\`\``))} else {return message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)}}
exports.conf = { command: "tagaldırdıklarım",  description: "Üyeyi kara listeden kaldırır", aliases: ["n"],}