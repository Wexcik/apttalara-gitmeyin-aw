const { MessageEmbed, Role } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
const kdb = new qdb.table("Kayıt");
require("../../wexab.js");
const { DiscordBanners } = require('discord-banners');
const discordBanners = new DiscordBanners(client);


exports.execute = async (client, message, args) => {
    let embed2 = new MessageEmbed().setColor("RANDOM");
    let embed = new MessageEmbed().setColor("RANDOM").setFooter(`${message.author.tag} tarafından istendi.`);

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; 
    
    let avatar = user.user.avatarURL({dynamic: true, size: 2048})
            if(avatar) return message.lineReply(`${user.user.tag} ${avatar}`)
      
      
            client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.avatar\` komutunu kullandı. [\`${message.content}\`]`);

        }
    
    


exports.conf = {
    command: "pp", 
    description: "Belirtilen kişiyi erkek olarak kayıt eder",
    aliases: ["avatar"] 
  }