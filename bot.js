const Discord = require('discord.js');
const client = new Discord.Client();
client.music = require('discord.js-musicbot-addon');
client.music.start(client, {
  youtubeKey: 'AIzaSyAYP5t2p-qC_vO7lfr06bZr5zzRwDo4a_k' ,
  botPrefix: 'please ',
  help: { name: 'musichelp' },
  bigPicture: true
});
const prefix = "please "
var answersyesorno = ["That's obviously true... what did you think?","Yeah!","No , at all!","nope.","Of course... not.","Absolutely!","Probably not!","I think so.","Yeah , I believe.","That's a yes.","Yes.","No , no , no and no!","I have no fucking idea.","I don't know.","WTF? Ask google not me","Do you think im stupid? that's yes.","I don't wanna answer.","Ummm... yeah."];
var answerswhy = ["Do I look like I know why?","lol.... for no reason.","because god made it like that.","because I want it like that","Because donald trump is drunk","obviously because .... idk","I don't wanna answer.","My name is not google","because i like it like that.",""]
var answerswhere = ["In miami.","Behind you.","Under a fridge.","In florida.","In morocco.","In india.","Under a shower.","Algeria","I don't know , maybe next to you.","I don't wanna answer","In a car.","In your car.","In my car.","Somewhere under a rainbow.","In the sky.","In the Andromeda Galaxy","In pluto","In ur anus .... no I mean the planet"]
var answerswho = ["Elon Musk","Donald trump","Your mom.","Nick","Someone","Your dad","Your dad's mom","Obama","Aaron","Aouab","A pet named Steve","A russian girl living in Italy","An irish dog in a british hospital"]
var answerswhen = ["At 5 o'clock","Last century","Tomorrow.","I don't know.","Do I like like a clock?","Yesterday morning.","In 2074","The day you'll die.","On my birthday!","I don't want to answer you because you are stupid.","Maybe last week.","About two days ago.","When you were born","Whenever you want.","Whenever I want.","Whenever god wants.","Don't talk to me about that.","Let me think,.... maybe next month."]
var answershow = ["I don't know.","Are you seriously asking me this?","I don't wanna answer.","With a knife.","On a car.","With his hands.","With a computer","With a pet named Steve","With a software.","With coding.","With an adidas shoes.","With a Yamaha T-Max.","with a chicken."]
var answerswhat = ["A cake","A pie","A chicken","A pet named Steve","6","89","984","69","A knife","Something","Something obvious.","Something not obvious","Something i probably don't know.","Something I don't wanna know","A cat","A dog","A ghost","A card","A chair","5 dollars","A table","A software","A bot","Bunch of maths, i don't know","I don't know","I don't wanna know","I don't wanna answer","A blue orange"]
var answerswhich = ["This one","That one","The first one","The last one","The second one","One of them","The one that is ordering a pizza","The one that is eating a burrito","The one right there","The one right here","I don't know","Ask yourself","Ask google."]
var people = ["elon musk","obama","my son","your father","your mom","justin bieber","alan walker","marshmello","david guetta","someone","everyone","noone","one of the people that live in islands","he","she","anne-marie","ed sheeran","aouab","aaron","a guy","a dude","a bot","a human","a chicken","a sick grandmother"]
var activity = ["in america","riding a horse","in the living room","happy","sad","mad","bad at sex","in a car","in discord","making music","slapping something","probably dead","sleeping","confused","homesick","under a fridge","a pet named Steve","listening to justin bieber"]
var welcomes = ["https://media.giphy.com/media/3o6Zt6zRQw8yStXfxe/giphy.gif",
		"https://media.giphy.com/media/10a9ikXNvR9MXe/giphy.gif",
		"https://media3.giphy.com/media/OF0yOAufcWLfi/giphy.gif",
		"https://i.imgflip.com/1thlr1p.gif",
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
	client.user.setPresence({ game: { name: 'with babies' , streaming: true}, status: 'online' })
  	.then()
  	.catch(err => { console.log(err);});
});
client.on('message', message => {
	try{
if(message.content.startsWith(prefix)){
	var command = message.content.replace(prefix,"").split(" ")[0];
    if (!command) return;
	var args_case = message.content.replace(prefix + command + " ","").split(" ");
	var args = message.content.toLowerCase().replace(prefix + command + " ","").split(" ");

   var sf = message.content.toLowerCase().replace(prefix + command + " ","");
	command.toLowerCase();

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
	}
}else if(message.content.startsWith("q ")){
	var args_case = message.content.replace("q ","").split(" ");
	var args = message.content.toLowerCase().replace("q ","").split(" ");

   var sf = message.content.toLowerCase().replace("q ","");
	command.toLowerCase();
	if(!message.content.startsWith("q")) return;
	if(message.author.bot) return;
	if(message.channel.type != 'text') return;
	if(message.channel != message.guild.channels.find("name","talk-to-the-human")) return;
		if(sf === ""){
			message.channel.send("U didn't ask anything '-'");
		} else {
			var reply;
			if (sf.includes("why")) {
				var x = Math.floor(Math.random()*2);
				if (x = 0) {
					reply = answerswhy[Math.floor(Math.random()*answerswhy.length)];
				} else {
					reply = "Because " + people[Math.floor(Math.random()*people.length)] + " is " + activity[Math.floor(Math.random()*activity.length)] + ".";
				}
			} else if (sf.includes("what time")) {
reply = Math.floor(Math.random()*24) + " o’clock.";
} else if (sf.includes("how old"))  {
				reply = Math.floor(Math.random()*100) + " years old.";
			} else if (sf.includes("when")) {
				reply = answerswhen[Math.floor(Math.random()*answerswhen.length)];
			} else if (sf.includes("where")) {
				reply = answerswhere[Math.floor(Math.random()*answerswhere.length)];
			} else if (sf.includes("who")) {
				reply = answerswho[Math.floor(Math.random()*answerswho.length)];
			} else if (sf.includes("which")) {
				reply = answerswhich[Math.floor(Math.random()*answerswhich.length)];
			} else if (sf.includes("what")) {
				reply = answerswhat[Math.floor(Math.random()*answerswhat.length)];
			} else if (sf.includes("how")) {
				reply = answershow[Math.floor(Math.random()*answershow.length)];
			} else {
				reply = answersyesorno[Math.floor(Math.random()*answersyesorno.length)];
			}
			message.channel.send(reply)
				.then()
				.catch(err => {
					showError(message,err);
				});}
		
	}
	}catch(err){
		showError(message,err);
	}
});

client.on("guildMemberAdd", member =>{
	member.addRole(member.guild.roles.find("name","dudes"));
	member.guild.channels.find("name","welcome").send(new Discord.RichEmbed().setColor("FFFFFF").setImage(welcomes[Math.floor(Math.random()*welcomes.length)]).addField("Welcome!","Welcome **" + member.displayName + "**! i don't know how the fuck you got here , but have fun!").setThumbnail(member.user.displayAvatarURL));
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


