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
    if(!user) return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));

            const banner = await discordBanners.getBanner(user.id, { size: 2048, format: "png", dynamic: true })
            if(banner) return message.lineReply(`${user.user.tag} ${banner}`)
            else if(!banner) return message.lineReply(embed2.setDescription("Kullanıcının Banner'ı yok."))
    
            client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.banner\` komutunu kullandı. [\`${message.content}\`]`);

        }
    
    


exports.conf = {
    command: "banner", 
    description: "Belirtilen kişiyi erkek olarak kayıt eder",
    aliases: ["afiş"] 
  }