const db = require("quick.db")
require("../../wexab.js");
exports.execute = async (client, message, args) => {
  let unregisterRol = await db.get(`unregisterRole-server.${message.guild.id}`);
  if(message.author.id !== client.config.Wex) 
  if(message.author.id !== client.config.BotOwner) return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));
  if (!unregisterRol) return message.reply(`Lütfen Kurulumu Tamamlayınız \`.kurulum kayıtsız @unregisterRole\``);
  let Rolsüzler = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
  if(args[0] == "ver" || args[0] == "add") {Rolsüzler.forEach(r => { r.roles.add(unregisterRol)})
  message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_tik")} Sunucumuzda rolü olmayan ${Rolsüzler.size} kişiye kayıtsız rolü tanımlandı. `)} else if(!args[0]) {message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Sunucumuzda Rolsüz ${Rolsüzler.size} kişi var onlara kayıtsız rolünü tanımlamak için \`.roles add\` komutunu uygula!`)}}
exports.conf = { command: "rolsüz",  aliases: ["roles"],}