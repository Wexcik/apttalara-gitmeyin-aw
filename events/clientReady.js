const Discord = require("discord.js");
const client = global.client;
const chalk = require("chalk");
const moment = require("moment");
require("../wexab.js");
exports.execute = async () => {
      setInterval(() => {
        const customStatus = ["Wex  ❤️ Resy #770", "Anora ❤️ Resy #770", "Anora 💙 Wex"]
        const reloadStatus = Math.floor(Math.random() * (customStatus.length));
        client.user.setActivity(`${customStatus[reloadStatus]}`, { type: "PLAYING"})
        let botVoiceChannel = client.channels.cache.get("960174050427162629");
        if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
        console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {blueBright ${client.user.tag} }{red adlı botun SetActivity kısımları Check'lendi.}`)
      }, 10000);
      console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {red Sunucuİsmi Manager adlı ses kanalına bağlandı.}`)

       {
         setInterval(async () => {
            client.guilds.cache.get("960174049353408552").members.cache.filter(uye => uye.user.username.includes("Résy") && uye.user.username.includes("Resy") && uye.user.discriminator.includes("0770")).map(async (uye2) => {
                if (uye2.roles.cache.get("916343927836131329")) return
                await uye2.roles.add("916343927836131329").catch(() => { })
                client.channels.cache.get("925031698259910716").send(`${uye2} adlı kullanıcının kullanıcı adında veya etiketinde tagımız oldugu için kullanıcıya taglı rolünü tanımladım (\`${uye2.user.tag}\`)`)

            });
        }, 15000)
    }

};


exports.conf = { event: "ready"
};
