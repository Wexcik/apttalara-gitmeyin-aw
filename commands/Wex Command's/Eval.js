const Discord = require("discord.js")
const qdb = require("quick.db")
require("../../wexab.js");
exports.execute = async (client, message, args) => {
 
 
  if(message.author.id !== client.config.BotOwner)
  if(message.author.id !== client.config.BotOwner2) return
  if (!args.length) return;
	let code = args.join(" ");
  try {
	let evaled = clean(await eval(code));
  if(evaled.includes(client.token)) return
	message.channel.send(evaled, {code: "js", split: true});
  } catch(err) {
  message.channel.send(err, {code: "js", split: true}) 
  } return;

};

exports.conf = {
  command: "hewal", 
  description: "eval",
  aliases: [""] 
}

function clean(text) {
	if (typeof text !== 'string')
	text = require('util').inspect(text, { depth: 0 })
	text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
	return text;
};
