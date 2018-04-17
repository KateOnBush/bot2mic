const Discord = require('discord.js');
const client = new Discord.Client();
var commandPrefix = "_";
const config = require("./config.json");
client.on('ready', () => {
    console.log('I am ready!');
    console.log('Bot got ready , join now discord!')
    
});
client.on('message', message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (message.guild.commandPrefix == null) {message.guild.commandPrefix = "_"};
    if(command === "ping") {
    message.channel.send(":ping_pong: Pong! :ping_pong:")
}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
