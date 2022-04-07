const {MessageButton, MessageActionRow} = require('discord-buttons')
const db = require("quick.db")
const disbut = require('discord-buttons')
const AutoReply = require("../../AutoReply")
exports.execute = async (client, message, args) => {
  let BoosterRole =await  db.get(`sunucu-booster-role.${message.guild.id}`) || []
  let RolSecimChannel = await db.get(`sunucu.rol-secim-kanal.${message.guild.id}`);
  if(message.author.id !== message.guild.ownerID)
  if(message.author.id !== client.config.Wex) return message.channel.send(AutoReply.YeterliYetkiYok);     
  if (!RolSecimChannel) return message.reply(`Lütfen Kurulumu Tamamlayınız \`.kurulum rol-secim #kpanel\``);
  if (!BoosterRole) return message.reply(`Lütfen Kurulumu Tamamlayınız \`.kurulum booster @booster\``);

  const renkler = {
    "💛": `${client.config.Sarı}`,
    "💙": `${client.config.Mavi}`,
    "💚": `${client.config.Yesil}`,
    "❤️": `${client.config.Kırmızı}`,
    "🧡": `${client.config.Turuncu}`,
  };
  const renkPush = [];
  const emoji = (name) => client.emojis.cache.find(x => x.name === name);
  for (const renk in renkler) {
    const sonuc = renkler[renk];
    let table = new disbut.MessageMenuOption()
      .setLabel(`Rengine sahip olmak için tıkla!`)
      .setEmoji(emoji(renk) ? emoji(renk).id : renk)
      .setValue(sonuc)
    renkPush.push(table);
  };
  let kaldırrenk = new disbut.MessageMenuOption()
  .setLabel("Kaldır")
  .setEmoji("943083813251186728")
  .setValue("kaldır")
  let renk = new disbut.MessageMenu();
  renk.setID("renk");
  renk.setPlaceholder(`Renk rollerini seçmek için tıkla!`);
  renk.setMaxValues(1);
  renk.setMinValues(1);
  renk.addOptions(renkPush,kaldırrenk);

  if (args[0] === "renk") {
    client.channels.cache.get(RolSecimChannel).send(`Aşağıdaki menüye tıklayarak dilediğin rengi seçebilirsin!`, renk);
  }
  client.on("clickMenu", async (menu) => {
    if (menu.id == "renk") {
      await menu.reply.think(true);
      if (!menu.clicker.member.roles.cache.get(BoosterRole)) return await menu.reply.edit("Booster üye olman gerek!");;
      await menu.reply.edit("Rollerin güncellendi!");

      let add = [];
      let remove = [];
      let allRemove = [];
      let roller = renkler;
      for (const rol in roller) {

        let sonuc = roller[rol];  

        allRemove.push(sonuc);
        if (menu.values.includes(sonuc)) {    
          await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);

          add.push(sonuc);
        } else {
          remove.push(sonuc);

        };
      };
      if (!menu.values.some(value => value === "allDelete")) {
        if (remove.length > 0) {
          await menu.clicker.member.roles.remove(remove);
        };
        await menu.clicker.member.roles.add(add);
      } else {
        await menu.clicker.member.roles.remove(allRemove);

      };
    };
  })
}

  exports.conf = { command: "rolsecim" ,aliases: ["rolsecim_kur"] }