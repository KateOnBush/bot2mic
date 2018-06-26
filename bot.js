const Discord = require('discord.js');
const client = new Discord.Client();
const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const prefix = "rayven "
var answers = ["Well , maybe.","Not at all.","I can't understand.","Really, this question?","Probably.","I guess not.","Yeah!","You should think about your question twice.","Nope , lol.","Ask yourself.","I guess so , yeah ^^.","Uh... I don't really know.","Yes , and I'm sure what I'm saying."]
var killgifs = ["http://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif.gif",
		"http://68.media.tumblr.com/c9340ffe7bd88258ec374a9cdf571ec3/tumblr_okxuc75yRi1w0ii2ho1_400.gif",
		"http://38.media.tumblr.com/b3623de17160edc374a39393dd50e645/tumblr_nglsxnrwyD1rbrys3o1_500.gif",
		"http://33.media.tumblr.com/40a731a1738c34d8b7533e080b72ba73/tumblr_ngls0ixVFl1rbrys3o1_500.gif",
		"http://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif-10.gif",
		"https://media1.tenor.com/images/46051e203deaefc5642916c1eafa54a7/tenor.gif?itemid=3660367",
		"http://reve-of-manga.r.e.pic.centerblog.net/f02b366e.gif",
		"https://media.giphy.com/media/9J3GfSohn0HRK/giphy.gif",
		"http://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif-9.gif",
		"https://i.gifer.com/9hxn.gif",
		"http://reve-of-manga.r.e.pic.centerblog.net/a8a9bf5e.gif",
		"http://38.media.tumblr.com/3526f49bd5c2f57de0484c2913076fc1/tumblr_n919vrTuyV1rhtveio1_500.gif"]
var huggifs = ["https://media1.tenor.com/images/49a21e182fcdfb3e96cc9d9421f8ee3f/tenor.gif?itemid=3532079",
	       "https://media1.tenor.com/images/b0de026a12e20137a654b5e2e65e2aed/tenor.gif?itemid=7552093",
	       "https://78.media.tumblr.com/2fe074ad467af41a8230b8d9d8e322f1/tumblr_omvj49wYnq1v8tshbo1_500.gif",
	       "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
	       "https://i.gifer.com/Y4Pm.gif",
	       "https://media1.tenor.com/images/234d471b1068bc25d435c607224454c9/tenor.gif?itemid=3532081",
	       "https://78.media.tumblr.com/5dfb67d0a674fe5f81950478f5b2d4ed/tumblr_ofd4e2h8O81ub9qlao1_500.gif",
	       "https://media.giphy.com/media/wnsgren9NtITS/giphy.gif",
	       "https://zippy.gfycat.com/RevolvingWigglyDikkops.gif",
	       "https://i.gifer.com/F1s1.gif"]
var jokes = ["What do you call a musical bee?\nA BEEthoven :).",
	     "A ancient warrior once asked his friend:\n- What year is it bro?\n- 50 B.C\n- What does B.C stand for?\n- Before christ.\n- Who the fuck is christ?\n- No fucking clue mate.",
	     "Yo mama so fat,\n when she jumped to the pool , scientists found water on the moon.",
	     "Yo mama so fat,\n when she walks by the TV, I miss 4 seasons of Game Of Thrones",
	     "Yo mama so ugly,\n when she threw a boomerang, it refused to come back",
	     "Why does syrian fortnite players get confused?\nThey don't know if the bombs are from Tilted Towers or their garden."]
function globalVar()
{
    this.__enabled = true;    
}
var global = new globalVar();
  var play = function(msg, suffix) {
    var voiceChannel = msg.member.voiceChannel;
    msg.channel.send('```Searching...```').then(response => {
      var searchstring = suffix;

      if (!suffix.toLowerCase().startsWith('http')) {
        searchstring = 'gvsearch1:' + suffix;
      }

      YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
        if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
          return response.edit('```Invalid video!```');
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
	  msg.channel.send("I'm not currently in a voice channel");
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
	msg.channel.send("You're not currently on a voice channel.")    
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
    console.log('Rayven is ready , connected to '+client.guilds.size+' guilds !');
	client.user.setPresence({ game: { name: 'against Samantha' , streaming: true}, status: 'dnd' })
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
	if(command === "ping"){
		var embed = new Discord.RichEmbed()
		.setColor("42F46B")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.addField("Pong!","My ping is currently **" + (client.ping|0) + "** ms.");
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
	} else if(command === "answer"){
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
	} else if (command === "kill"){
		var embed = new Discord.RichEmbed()
		.setColor("F44242")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.setImage(killgifs[Math.round(Math.random()*killgifs.length)]);
		if(message.mentions.members.first() != undefined){
			embed = embed.addField("Murder!","I killed **" + message.mentions.members.first().displayName + "** , must have been a real baka!");
		}else{	
			embed = embed.addField("Murder!","I just killed **" + message.member.displayName + "** , what a stupid...")
		}
		message.channel.sendEmbed(embed);
	} else if(command === "help"){
		var embed = new Discord.RichEmbed()
		.setColor("D3F441")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.addField("Help?!","**help :** Shows the help menu.\n**ping :** Info about bot's latency.\n**play :** Queues/plays a song.\n**stop :** Stops the queue.\n**showqueue :** Shows the queue list.\n**join :** Joins your voice channel.\n**kill :** Kills a baka.\n**hug :** Hugs a cutie.\n**joke :** Just to hear something funny.");
		message.channel.send(embed);
	} else if(command === "hug"){
		var embed = new Discord.RichEmbed()
		.setColor("ff0077")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.setImage(huggifs[Math.round(Math.random()*huggifs.length)]);
		if(message.mentions.members.first() != undefined){
			embed = embed.addField("Hugs!","I hugged **" + message.mentions.members.first().displayName + "** , lots of love!");
		}else{	
			embed = embed.addField("Hugs!","I hugged you, **" + message.member.displayName + "** , love ya!")
		}
		message.channel.send(embed);
	} else if(["funny","stupid","lol","joke"].includes(command)){
		var embed = new Discord.RichEmbed()
		.setColor("FF0F47")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.addField("Here's a joke:",jokes[Math.round(Math.random()*jokes.length)])
		message.channel.send(embed);
	} else if(command === "add"){
		if(!message.member.hasPermission("ADMINISTRATOR")){ message.channel.send("**Sorry,** I can't perform this for you."); return; }
		if(message.mentions.members.first() == undefined){ message.channel.send("**Sorry,** You have to mention someone."); return; }
		if(["contributors","devs"].includes(args[2])){
			if(args[2] == "contributors"){
				message.mentions.members.first().addRole(message.guild.roles.find("name","Contributor"));
				message.channel.send(message.mentions.members.first() + " has been added to contributors!");
				message.mentions.members.first().user.send("**You have been added to the contributors group of NightFallerLegends!**\n\nYou can now discuss privately with other contributors and participate to regular giveaways!\nThanks for your contribution.\n\n~ NightFallerLegends Team.")
			} else if(args[2] == "devs"){
				message.mentions.members.first().addRole(message.guild.roles.find("name","NightFallerDeveloper"));
				message.channel.send(message.mentions.members.first() + " has been added to Developers.");
				message.mentions.members.first().user.send("**You have been added to the developers group of NightFallerLegends!**\n\nYou can now fully participate to the indev of NightFallerLegends , and this means you are a very trustful person , you will be helping our team and be rewarded as soon as possible.\nGood luck in your developement!\n\n~ NightFallerLegends Team.")
			}
		} else {
			message.channel.send("**Sorry,** Specify a group.")
		}
	} else {
		message.reply("**Yes?** Say `rayven help` for a list of help.")	
	}
	}catch(err){
		showError(message,err);
	}
});

client.on("guildMemberAdd", member =>{
	member.addRole(member.guild.roles.find("name","NightFallerMember"));
	member.guild.channels.find("name","welcomes").send(new Discord.RichEmbed().setColor("FFFFFF").addField("Welcome!","Welcome **" + member.displayName + "** to NightFallerLegendsCommunity! Head over and talk to people , don't be shy!").setImage("https://images7.alphacoders.com/849/849675.png").setThumbnail(member.user.displayAvatarURL));
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


