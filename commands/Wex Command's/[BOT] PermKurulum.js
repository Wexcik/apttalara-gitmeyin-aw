const Discord = require('discord.js')
const fs = require('fs')
const qdb = require("quick.db");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

const stringTable = require('string-table');
exports.execute = async (client, message, args) => {
    if (!message.guild) return;
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    if(message.author.id !== "728161454288535604") return
    const prefix = "."
    let embed2 = new MessageEmbed().setColor("RANDOM");

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    if (args[0] !== "ekle" && args[0] !== "oluştur" && args[0] !== "sil" && args[0] !== "kaldır" && args[0] !== "liste" && args[0] !== "list") return message.lineReply(`Wex Kendine gel ve komutunu doğru kulan.`);;
    let ozelkomutlar = await db.get(`ozelkomut`);
    if (!Array.isArray(ozelkomutlar)) await db.set(`ozelkomut`, []);
    if (args[0] === "ekle" || args[0] === "oluştur") {
        if (client.commands.has(args[1]) || client.aliases.has(args[1]));
        let verilecekRol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a => a.name === args[2]);
      
        let yetkiliROL = message.guild.roles.cache.get(args[3]) || message.mentions.roles.map(r => r.id) || message.guild.roles.cache.find(a => a.name === args[3]);
        if (!verilecekRol) return message.lineReply("Wex Kendine gel ve komutunu doğru kulan.")
        if (!yetkiliROL) return message.lineReply("Wex Kendine gel ve komutunu doğru kulan.")
        await db.push(`özelkomut_${message.guild.id}`, {
            isim: args[1],
            tur: "rol",
            verilecekRol: verilecekRol.id,
            yetkiliROL: yetkiliROL.id
        });
        message.channel.send(embed2.setDescription(`
        Komut Adı: \`${args[1]}\`
        Verilecek Rol ${verilecekRol} \`${verilecekRol.name}\`
        Verecek Rol <@&${message.guild.roles.cache.get(yetkiliROL.id)}>`))
    }

    if (args[0] === "sil" || args[0] === "kaldır") {
        if (args[1] == "hepsini") {
            await db.delete(`özelkomut_${message.guild.id}`);
        } else {
            if (!args[1]) return message.lineReply(`Wex Kendine gel ve komutunu doğru kulan.`);
            let komut = args.slice(1).join(' ');
            if (!ozelkomutlar || ozelkomutlar.length === 0 || !ozelkomutlar.find(kmt => kmt.isim === komut)) return message.lineReply(`Belirtilen özel komut bulunamadı!`);
            let newArr = [];
            ozelkomutlar.forEach(async x => {
                if (x.isim !== komut) await newArr.push(x);
            });
            await db.set(`özelkomut_${message.guild.id}`, newArr);
            message.reply(`Wex Kendine gel ve komutunu doğru kulan.`);
            return;
        }

    };
    if (args[0] === "liste" || args[0] === "list") {
        
        let özelkomuts = db.get(`özelkomut_${message.guild.id}`) || [];
        özelkomuts = özelkomuts.reverse();
        let komutlars = özelkomuts.length > 0 ? özelkomuts.map((value, index) => `\`.${value.isim}\` --> <@&${value.verilecekRol}> --> <@&${value.yetkiliROL}>`).join("\n"):"";
        let komutlar2 = "Komut  -       ROLE"

        
        message.channel.send(embed2.setDescription(`Merhaba, Perm Kurulum Listesi aşağıda belirtilmiştir.\nSıralama ise \`Komut\` --> \`Verilecek_Perm\` --> \`Verecek_Perm\` 'dir.\n\n${komutlars || "Komut Bulunamadı."}\`\`\`----- Developed & Made by Wex -----\`\`\``, {split: true, code: "md"}));
        return;
    };
};
exports.conf = {
  command: "permkurulum", 
  description: "Belirtilen kişiyi erkek olarak kayıt eder",
  aliases: ["adminroles"] 
}