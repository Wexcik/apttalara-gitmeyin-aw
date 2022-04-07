const {MessageButton, MessageActionRow} = require('discord-buttons')
const db = require("quick.db")
const AutoReply = require("../../AutoReply")
exports.execute = async (client, message, args) => {
  let KpanelChannel = await db.get(`sunucu.kullanıcı-panel-kanal.${message.guild.id}`);
  if(message.author.id !== message.guild.ownerID)
  if(message.author.id !== client.config.Wex) return message.channel.send(AutoReply.YeterliYetkiYok);     
  if (!KpanelChannel) return message.reply(`Lütfen Kurulumu Tamamlayınız \`.kurulum kpanel #kpanel\``);
        let button_1 = new MessageButton().setStyle('gray').setLabel(`1`).setID('x1')
        let button_2 = new MessageButton().setStyle('gray').setLabel(`2`).setID('x2') 
        let button_3 = new MessageButton().setStyle('gray').setLabel(`3`).setID('x3')
        let button_4 = new MessageButton().setStyle('gray').setLabel(`4`).setID('x4') 
        let button_5 = new MessageButton().setStyle('gray').setLabel(`5`).setID('x5')
        let row = new MessageActionRow().addComponents(button_1, button_2, button_3, button_4, button_5)
client.channels.cache.get(KpanelChannel).send(`\n1 : \`Sunucu profilini görüntüleyin.\`\n2 : \`Veritabanındaki isim geçmişinizi görüntüleyin.\`\n3 : \`Sunucu istatistiklerinizi görüntüleyin.\`\n4 : \`Sunucudaki davet bilgilerinizi görüntüleyin.\`\n5 : \`Sunucu içerisindeki ceza-i işlemlerinizi görüntüleyin(sicil).\``, { components :[row]})}
exports.conf = { command: "kpanelkurulum" ,aliases: ["kullanıcıpanel", "kpanel"] }