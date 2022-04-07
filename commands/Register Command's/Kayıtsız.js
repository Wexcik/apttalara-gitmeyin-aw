const { MessageEmbed, Role } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");

const moment = require("moment");
const kdb = new qdb.table("Kayıt");

exports.execute = async (client, message, args) => {

    let embed4 = new MessageEmbed().setColor("RANDOM");


    let arr = await  db.get(`registeryrole_${message.guild.id}`) || []
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
    
  
        let Unregrole = await db.get(`unregisterRole-server.`);
        let erkekRol = await db.get(`erkek-roles.${message.guild.id}`);
        let kadınRol = await db.get(`kadin-roles.${message.guild.id}`);
        
    var tarih = [moment().format('DD/MM/YYYY | H:mm:ss')]
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    qdb.add(`kayıtsızaatma.${message.member.id}`, 1) 
    let embed = new MessageEmbed().setColor("RANDOM");
    let embed2 = new MessageEmbed().setColor("RANDOM").setThumbnail(client.user.avatarURL({dynamic: true}));
    let embed3 = new MessageEmbed().setColor("RANDOM");


    if(!user) return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));

    qdb.add(`kayıtsızaatma.${message.member.id}`, 1) 

    if(!Unregrole) { 
        message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));

        
  
     } else {
  

    kdb.add(`teyit.${message.author.id}.erkek`, 1);
    qdb.add(`erkekKayit_${message.author.id}`, 1)
    qdb.add(`toplamKayit_${message.author.id}`, 1)
     
    qdb.set(`erol.${user.id}`, `<@&924040705230393405>`)
    kdb.push(`kullanici.${user.id}.kayıt`, {
   rol: "Kayıtsıza Atıldı.",   
   isim: "Kayıtsıza",
yas: "atıldı."

});
;
    let kayıt = kdb.get(`kullanici.${user.id}.kayıt`) || [];
    kayıt = kayıt.reverse();
 
  client.channels.cache.find(a => a.name === "register-log").send(`\`[${tarih}]\` ${user}(\`${user.id}\`) adlı kullanıcı ${message.author} (\`${message.author}\`) tarafından **Kayıtsız**'a atıldı.


    
    
    `)


      

        await user.roles.remove(erkekRol).catch(e => { });
        await user.roles.add(Unregrole).catch(e => { });
        await user.roles.remove(kadınRol).catch(e => { });
 
        await user.setNickname("").catch(e => { });        
        message.lineReply(embed.setDescription(`
        ${user} kişisi başarıyla kayıtsıza atıldı.`)).catch(e => { });
        return message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));

    }}

    
}

exports.conf = { command: "unregister", description: "Belirtilen kişiyi erkek olarak kayıt eder",  aliases: ["kayıtsız", "unreg"]}