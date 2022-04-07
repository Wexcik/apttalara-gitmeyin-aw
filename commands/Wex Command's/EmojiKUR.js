const qdb = require("quick.db")
const Discord = require("discord.js")


const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require("discord.js");

require("../../wexab.js");
exports.execute = async (client, message, args) => {
 
  let embed2 = new Discord.MessageEmbed()

  if (!message.guild) return;
  let guild = message.guild;
  if(message.author.id !== "728161454288535604")
  if(message.author.id !== client.config.BotOwner2) return
  var button_1 = new MessageButton()
  .setID("1")
  .setLabel("Onay")
  .setStyle("green")
  .setEmoji("📁")

  var button_2 = new MessageButton()
  .setID("2")
  .setLabel("İptal")
  .setStyle("red")
  .setEmoji("📁")
    let carpi = "https://cdn.discordapp.com/emojis/909009100300509194.gif?size=96";
    let kırmızıyuvarlak = "https://cdn.discordapp.com/emojis/909009099935604766.gif?size=96";
    let mesaj = "https://cdn.discordapp.com/emojis/909009099591671819.gif?size=96"; 
    let yesiltik = "https://cdn.discordapp.com/emojis/909009100518592513.gif?size=96";
    let yesilyuvarlak = "https://cdn.discordapp.com/emojis/909009100455678022.gif?size=96";
    let blutv = "https://cdn.discordapp.com/emojis/909038350403526657.png?size=96";
    let nitro = "https://cdn.discordapp.com/emojis/909038350198005791.gif?size=96";
    let netflix = "https://cdn.discordapp.com/emojis/909038350139285515.png?size=96";
    let spotify = "https://cdn.discordapp.com/emojis/909038350583873586.png?size=96";
let embedwex = new MessageEmbed().setFooter(`50 Saniye sonra butonlar kullanılmaz hale gelecektir.`)
.setDescription(`
\`•\` Kurulum Yapmak için Onay Veriniz. 
    `)

    let msg = await message.channel.send({ buttons : [ button_1, button_2], embed: embedwex})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, {time: 50000})

      collector.on("collect", async (button) => {

        if(button.id === "1") {
          await button.reply.defer()
          message.channel.send(embed2.setDescription(`Başarılı bir şekilde onay verdiniz Emojileri kurmaya başlıyorum.`))

    guild.emojis.create(carpi, "wex_carpi")
    guild.emojis.create(kırmızıyuvarlak, "wex_kirmizi")
    guild.emojis.create(mesaj, "wex_message")
    guild.emojis.create(yesiltik, "wex_tik")
    guild.emojis.create(yesilyuvarlak, "wex_yesil")
    guild.emojis.create(blutv, "wex_blutv")
    guild.emojis.create(nitro, "wex_nitro")
    guild.emojis.create(netflix, "wex_netflix")
    guild.emojis.create(spotify, "wex_spotify")


        }
  });


}


exports.conf = {
  command: "emojikur", 
  description: "",
  aliases: ["emojisetup"],
}