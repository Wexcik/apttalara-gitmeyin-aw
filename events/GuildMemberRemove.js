const { MessageEmbed } = require("discord.js");
const client = global.client;
const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");

require("moment-duration-format");

exports.execute = async (member) => {
  

  
  kdb.push(`kullanici.${member.id}.kayıt`, {
    isim: member.displayName,
    yas: "",
   rol: "Sunucudan Ayrılma",   

});

}
 
exports.conf = {
  event: "guildMemberRemove" 
};





