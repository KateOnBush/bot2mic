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
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
