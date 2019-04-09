const Discord = require('discord.js');
const client = new Discord.Client();
var answersyesorno = ["That's obviously true... what did you think?","Yeah!","No , at all!","nope.","Of course... not.","Absolutely!","Probably not!","I think so.","Yeah , I believe.","That's a yes.","Yes.","No , no , no and no!","I have no fucking idea.","I don't know.","WTF? Ask google not me","Do you think im stupid? that's yes.","I don't wanna answer.","Ummm... yeah."];
var answerswhy = ["Do I look like I know why?","lol.... for no reason.","because god made it like that.","because I want it like that","Because donald trump is drunk","obviously because .... idk","I don't wanna answer.","My name is not google","because i like it like that.",""]
var answerswhere = ["In miami.","Behind you.","Under a fridge.","In florida.","In morocco.","In india.","Under a shower.","Algeria","I don't know , maybe next to you.","I don't wanna answer","In a car.","In your car.","In my car.","Somewhere under a rainbow.","In the sky.","In the Andromeda Galaxy","In pluto","In ur anus .... no I mean the planet"]
var answerswho = ["Elon Musk","Donald trump","Your mom.","Nick","Someone","Your dad","Your dad's mom","Obama","Aaron","Aouab","A pet named Steve","A russian girl living in Italy","An irish dog in a british hospital"]
var answerswhen = ["At 5 o'clock","Last century","Tomorrow.","I don't know.","Do I like like a clock?","Yesterday morning.","In 2074","The day you'll die.","On my birthday!","I don't want to answer you because you are stupid.","Maybe last week.","About two days ago.","When you were born","Whenever you want.","Whenever I want.","Whenever god wants.","Don't talk to me about that.","Let me think,.... maybe next month."]
var answershow = ["I don't know.","Are you seriously asking me this?","I don't wanna answer.","With a knife.","On a car.","With his hands.","With a computer","With a pet named Steve","With a software.","With coding.","With an adidas shoes.","With a Yamaha T-Max.","with a chicken."]
var answerswhat = ["A cake","A pie","A chicken","A pet named Steve","6","89","984","69","A knife","Something","Something obvious.","Something not obvious","Something i probably don't know.","Something I don't wanna know","A cat","A dog","A ghost","A card","A chair","5 dollars","A table","A software","A bot","Bunch of maths, i don't know","I don't know","I don't wanna know","I don't wanna answer","A blue orange"]
var answerswhich = ["This one","That one","The first one","The last one","The second one","One of them","The one that is ordering a pizza","The one that is eating a burrito","The one right there","The one right here","I don't know","Ask yourself","Ask google."]
var people = ["elon musk","obama","my son","your father","your mom","justin bieber","alan walker","marshmello","david guetta","someone","everyone","noone","one of the people that live in islands","he","she","anne-marie","ed sheeran","aouab","aaron","a guy","a dude","a bot","a human","a chicken","a sick grandmother"]
var activity = ["in america","riding a horse","in the living room","happy","sad","mad","bad at sex","in a car","in discord","making music","slapping something","probably dead","sleeping","confused","homesick","under a fridge","a pet named Steve","listening to justin bieber","I don't fucking want to know"]
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
	try{ 
	var args = message.content.toLowerCase().replace("q ","").split(" ");
	var sf = message.content.toLowerCase().replace("q ","");
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
			} else if ((sf.startsWith("hi")) || (sf.startsWith("hello")) || (sf.startsWith("hey"))){
				var z = ["Hello!","Hey friend!","Hi.","Hello,howdy?","Hiiii :).","don't wanna talk.","Yo ! How's going!","Greetings.","Hellow."]
				reply = z[Math.floor(Math.random()*z.length)];	
			} else if ((sf.startsWith("do")) || (sf.startsWith("is")) || (sf.startsWith("are"))){
				reply = answersyesorno[Math.floor(Math.random()*answersyesorno.length)];	
			} else if ((sf.startsWith("how much")) || (sf.startsWith("how many"))){
				reply = Math.floor(Math.random()*1000);	
			} else if (sf.includes("how are you")){
				var z = ["Fine.","I don't know.","Bad","Good","I don't wanna answer","Very good.","Good.","Pretty fine.","Pretty good.","Mind your business.","Kinda bad."]
				reply = z[Math.floor(Math.random()*z.length)];	
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
				});
		
	}
	}catch(err){
		showError(message,err);
	}
});
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


