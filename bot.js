const Discord = require('discord.js');
const client = new Discord.Client();

	//Knowledge
	var knowledge = {
		greetings: ["hey","yo","hello","hi","wassup","what's up","whatsup","hola","greetings"],
		wishes: ["good morning","good evening","good night","good afternoon"]
	};

	//Replies
	var replies = {
		greetings: ["Hey there","Hey","Hi","Oh hey","What's up","Yo"]
	};

function showError(message,err){
	message.channel.send(":no_entry: **A error has occured while performing this execution.** Please report this to <@123413327094218753> .\n```js\n"+err+"\n```")		
}

client.on('ready', () => {
    console.log('Human is ready , connected to '+client.guilds.size+' guilds !');
	client.user.setPresence({ game: { name: ' stupid questions.' , streaming: true}, status: 'idle' })
  	.then()
  	.catch(err => { console.log(err);});
});
client.on('message', message => {
	
	var input = message.content.toLowerCase();
	if knowledge.greetings.forEach(g=>{
		if(input.startsWith(g)) return true;
	}){
		message.channel.send(replies.greetings[Math.round(Math.random()*(replies.greetings.length-1))]);	
	}
	
	
});
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


