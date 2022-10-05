const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Human is ready , connected to '+client.guilds.size+' guilds !');
	client.user.setPresence({ game: { name: ' stupid questions.' , streaming: true}, status: 'idle' })
  	.then()
  	.catch(err => { console.log(err);});
});
client.on('message', message => {
	
	
});
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


