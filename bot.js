const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds]});

client.on('message', message => {
	
	message.channel.send("hi haha");
	
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


