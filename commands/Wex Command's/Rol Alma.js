const {MessageButton, MessageActionRow} = require('discord-buttons')
const db = require("quick.db")
const AutoReply = require("../../AutoReply")
exports.execute = async (client, message, args) => {
  if(message.author.id !== message.guild.ownerID)
  if(message.author.id !== "728360891644641303")
  if(message.author.id !== "728161454288535604") return;
        let button_1 = new MessageButton().setStyle('red').setLabel(`Etkinlik Katılımcısı`).setID('Etkinlik Katılımcısı').setEmoji("🎊")
        let button_2 = new MessageButton().setStyle('green').setLabel(`Çekiliş Katılımcısı`).setID('Çekiliş Katılımcısı').setEmoji("🎉")
        let row = new MessageActionRow().addComponents(button_1, button_2)
client.channels.cache.get("960308611010158612").send(`
Merhaba **${message.guild.name}** üyeleri,\nÇekiliş katılımcısı alarak Netflix, Spotify, BluTV, Nitro gibi çeşitli ödüllerin sahibi olabilirsiniz.\nEtkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.\n\n__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__`, { components :[row]})}
exports.conf = { command: "rolal", 
  description: "",
  aliases: ["rolalma"],
}