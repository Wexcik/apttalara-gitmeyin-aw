const { MessageEmbed, Discord } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const { MessageButton } = require('discord-buttons');

const kdb = new qdb.table("Kayıt");
exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setColor("RANDOM");

    if (!message.member.voice.channel) {
        return message.reply("Ses kanalına bağlı değilsin.Bir ses kanalına bağlan ve tekrardan dene.");
        }
          
        let kullanıcı = message.mentions.members.first();
        if (!kullanıcı) return message.channel.send('Bir Kullanıcı Belirt.');
        
        let rol = message.mentions.roles.first();
        let member = message.guild.member(kullanıcı);
        
        if (!member.voice.channel) return message.channel.send('Etiketlenen Kullanıcı Ses Kanalında Değil.').then(m => m.delete(5000));
        
        var button_1 = new MessageButton()
    .setID("1")
    .setLabel("Onaylıyorum")
    .setStyle("green")

    var button_2 = new MessageButton()
    .setID("2")
    .setLabel("Onaylamıyorum")
    .setStyle("red")  
    
    let msg2 = await message.channel.send(`${kullanıcı}`)
    let embedwex = new MessageEmbed().setFooter(`50 Saniye sonra butonlar kullanılmaz hale gelecektir.`)
    .setDescription(`${kullanıcı}, ${message.author} \`${kullanıcı.voice.channel.name}\` odasına katılmak istiyor. Kabul Ediyormusun ?
        `)
    
        let msg = await message.channel.send({ buttons : [ button_1, button_2 ], embed: embedwex})
     
        var filter = (button) => button.clicker.user.id === kullanıcı.id;
       
        let collector = await msg.createButtonCollector(filter, {time: 50000})
    
          collector.on("collect", async (button) => {
    
    
        
        
        if(button.id === "1") {
            message.member.voice.setChannel(kullanıcı.voice.channel.id)
            msg.delete()
            msg2.delete()
            await button.reply.defer()
            message.channel.send(embed.setDescription(`${kullanıcı} odaya bağlanmanı onayladı.
        
            `))
            
        }
            if(button.id === "2") {
                await button.reply.defer()
                msg.delete()
                msg2.delete()
                message.channel.send(embed.setDescription(`
                ${kullanıcı} odaya bağlanmanı onaylamadı.
                `))
            }
            
        })
    

    }
exports.conf = {
    command: "go",
    aliases: ["git"]
} 
