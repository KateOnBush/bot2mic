const Discord = require('discord.js');
const client = new Discord.Client({});

client.on('message', message => {
	
	
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


