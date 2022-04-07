const Discord = require("discord.js")
const qdb = require("quick.db")
require("../../wexab.js");
exports.execute = async (bot2, message, args) => {
 
  if(message.author.id !== client.config.BotOwner) return
  message.channel.send("Tüm Botlar yeniden başlatılıyor.").then(msg => {
    console.log("[BOT]Yeniden başlatılıyor | [Wexcikkk]");
    process.exit(0);
});

};

exports.conf = {
  command: "restart", 
  description: "",
  aliases: ["reboot"],
}