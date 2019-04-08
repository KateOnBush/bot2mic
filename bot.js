const Discord = require('discord.js');
const client = new Discord.Client();
client.music = require('discord.js-musicbot-addon');
client.music.start(client, {
  youtubeKey: "AIzaSyA2Cusn7ElAHsbatWlgX1yX0jMWiGpawz4"
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
  var play = function(msg, suffix) {
    var voiceChannel = msg.member.voiceChannel;
    msg.channel.send('Hold up a second...').then(response => {
      var searchstring = suffix;

      if (!suffix.toLowerCase().startsWith('http')) {
        searchstring = 'gvsearch1:' + suffix;
      }

      YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
        if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
          return response.edit('lol your video is invalid');
        }

        response.edit('```Queued: ' + info.title + "```").then(() => {
	  if (msg.guild.queue == null){msg.guild.queue = [];}
          msg.guild.queue.push({
            'name': info.title,
            'url': info.webpage_url,
            'requested_by': msg.author.id,
          });
          if (msg.guild.queue.length === 1) playQueue(msg, suffix);
        }).catch(console.log);
      });
    }).catch(console.log);
  };

  var skipCurrentSong = function(msg){
	if (msg.guild.queue == null){msg.guild.queue = [];}
	if (msg.guild.queue.length !== 0)
	{
		if (msg.guild.joinedChannel != null)
		{
			msg.channel.send("```Skipped : " + msg.guild.queue.shift().name + "```")
			playQueue(msg,"");
		} else {
			msg.channel.send("**I'm not in a voice channel**")
		}
	} else {
		msg.channel.send("**Queue is already empty.**")
	}
  }
  var stopQueue = function(msg){
  if (msg.guild.joinedChannel !== null)
  {
	  msg.guild.queue = [];
	  msg.guild.joinedChannel.leave();
	  msg.guild.joinedChannel = null;
	  msg.channel.send("**Cleared queue and left all voice channels**")
  } else {
	  msg.channel.send("Do u think i'm stupid? im not in a voice channel");
  }
  }
  var showQueue = function(msg) {
	  var queues = "```Queue list :```\n";
	  if (msg.guild.queue == null){msg.guild.queue = [];}
		if(msg.guild.queue.length == 0){msg.channel.send("```Queue is empty.```"); return;}
	  for(i = 0;msg.guild.queue[i] != null;i++)
	  {
		queues += "`" +(i+1) + " - " + msg.guild.queue[i].name + "`\n";
	  }
		queues += "```\n```";
		msg.channel.send(queues)
  }
  var joinChannel = function(msg){
    if(msg.member.voiceChannel != null)
    {
	msg.member.voiceChannel.join()
	msg.channel.send("**Joined : " + msg.member.voiceChannel.name + "**")
	    if(msg.guild.queue != undefined)
			{
				playQueue(msg,"");
			}
    } else {
	msg.channel.send("Do i look like a fool? you're not on a voice channel !")    
    }
  }
  var playQueue = function(msg, suffix, voiceChannel = msg.member.voiceChannel) {
    msg.guild.joinedChannel = voiceChannel;
    voiceChannel.join()
      .then(connection => {
        var stream = ytdl(msg.guild.queue[0].url, {
          audioonly: true,
          quality: 'highestaudio'
        });
        return connection.playStream(stream, {
          seek: 0,
          volume: 1
        });
      })
      .then(dispatcher => {
        dispatcher.on('error', error => {
          msg.guild.queue.shift();

          if (msg.guild.queue.length === 0) {
            voiceChannel.leave();
		msg.guild.joinedChannel = null;
            return;
          }

          playQueue(msg, suffix);

          console.error;
        });

        dispatcher.on("end", end => {
          msg.guild.queue.shift();

          if (msg.guild.queue.length === 0) {
            voiceChannel.leave();
		  msg.guild.joinedChannel = null;
            return;
          }

          playQueue(msg, suffix);
        });
      })
      .catch(console.error);
      
      return module;
  };

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
	} else if(command === "play"){
		if(args[0] != null){
			play(message,args.join(" "));
		} else {
			message.channel.send(":no_entry: **Please specify a song/URL.**");	
		}
	} else if(["showqueue","queue","songlist","nowplaying"].includes(command)){
		showQueue(message);
	} else if(["skip","jump"].includes(command)){
		skipCurrentSong(message);
	} else if(["stop","purge","clear"].includes(command)){
		stopQueue(message);
	} else if(["join","joinme","come"].includes(command)){
		joinChannel(message);
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


