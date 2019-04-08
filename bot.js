const Discord = require('discord.js');
const client = new Discord.Client();
const Music = require('discord.js-musicbot-addon-v2');
const music = new Music(client, {
  youtubeKey: 'AIzaSyAYP5t2p-qC_vO7lfr06bZr5zzRwDo4a_k' ,
  botPrefix: 'please ',
  djRole: 'me',
  helpCmd: 'music'
});
const prefix = "please "
var answers = ["That's obviously true... what did you think?","Yeah!","No , at all!","nope.","Of course... not.","Absolutely!","Probably not!","I think so.","Yeah , I believe.","That's a yes.","Yes.","No , no , no and no!","I have no fucking idea.","I don't know.","WTF? Ask google not me","Do you think im stupid? that's yes.","I don't wanna answer.","Ummm... yeah."];
var welcomes = ["https://media.giphy.com/media/3o6Zt6zRQw8yStXfxe/giphy.gif",
		"https://media.giphy.com/media/10a9ikXNvR9MXe/giphy.gif",
		"https://media3.giphy.com/media/OF0yOAufcWLfi/giphy.gif",
		"https://i.imgflip.com/1tlr1p.gif",
		"https://thumbs.gfycat.com/ExcellentGrouchyBass-max-1mb.gif",
		"https://66.media.tumblr.com/5ab0c2fde2312b3bcbf5a64bc222d6a6/tumblr_o4sdnnQ8DT1udh5n8o1_500.gif"];
function globalVar()
{
    this.__enabled = true;    
}
var global = new globalVar();

function showError(message,err){
	message.channel.send(":no_entry: **A error has occured while performing this execution.** Please report this to <@123413327094218753> .\n```js\n"+err+"\n```")		
}

client.on('ready', () => {
    console.log('Human is ready , connected to '+client.guilds.size+' guilds !');
	client.user.setPresence({ game: { name: 'with babies' , streaming: true}, status: 'dnd' })
  	.then()
  	.catch(err => { console.log(err);});
});
client.on('message', message => {
	try{
	var command = message.content.replace(prefix,"").split(" ")[0];
	var args_case = message.content.replace(prefix + command + " ","").split(" ");
	var args = message.content.toLowerCase().replace(prefix + command + " ","").split(" ");
	command.toLowerCase();
	if(!message.content.startsWith(prefix)) return;
	if(message.author.bot) return;
	if(message.channel.type != 'text') return;
	if(message.channel != message.guild.channels.find("name","talk-to-the-human")) return;
	if(command === "ping"){
		var embed = new Discord.RichEmbed()
		.setColor("42F46B")
		.addField("Pong!","My latency is **" + (client.ping|0) + "** ms.");
	   	message.channel.send(embed)
			.then()
			.catch(err =>{
				showError(message,err);
			});
	} else if((command === "debug") && (message.author.id === "123413327094218753")){
		try{
			message.channel.send("**Input:**\n```js\n"+args_case.join(" ")+"\n```\n**Output:**\n```js\n"+eval(args_case.join(" "))+"\n```");	
		}catch(err){
			message.channel.send("**Input:**\n```js\n"+args_case.join(" ")+"\n```\n**Caught error:**\n```js\n"+err+"\n```");
		}
	} else if((command === "answer") || (command === "tellme") || (command === "trueorfalse")){
		if(args[0] == null){
			message.channel.send(":no_entry: **Please specify a question.**");
		} else {
			message.channel.send(answers[Math.floor(Math.random()*answers.length)])
				.then()
				.catch(err => {
					showError(message,err);
				});
		}
	} else {
		message.reply("say `please help` for a list of help.")	
	}
	}catch(err){
		showError(message,err);
	}
});

client.on("guildMemberAdd", member =>{
	member.addRole(member.guild.roles.find("name","dudes"));
	member.guild.channels.find("name","welcome").send(new Discord.RichEmbed().setColor("FFFFFF").setImage(welcomes[Math.floor(Math.random()*welcomes.length)]).addField("Welcome!","Welcome **" + member.displayName + "**! i don't know the fuck you got here , but have fun!").setThumbnail(member.user.displayAvatarURL));
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


