const {

	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	REST,
	SlashCommandBuilder,
	Client,
	Routes,
	GatewayIntentBits,
	AttachmentBuilder

} = require('discord.js');;
const { Aki, regions } = require("aki-api");


const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});



const commands = [
	new SlashCommandBuilder().setName('groupe').setDescription('Choisi ton groupe 2MIC!'),
	new SlashCommandBuilder().setName('quigagnera').setDescription('Qui gagnera entre les deux?')
		.addUserOption(option=>
			option.setName("qui")
				.setDescription("Adversaire N° 1")
				.setRequired(true))
		.addUserOption(option=>
			option.setName("etqui")
				.setDescription("Adversaire N° 2")
				.setRequired(true))
		.addStringOption(option=>
			option.setName("enquoi")
				.setDescription("En quoi?")
				.setRequired(true)),
	new SlashCommandBuilder().setName("bourremetre").setDescription("Pour savoir combien t'es bourré en general"),
	new SlashCommandBuilder().setName("akinator").setDescription("Tu veux jouer à akinator? :D"),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);


(async ()=>{

	try {
		
		await rest.put(Routes.applicationGuildCommands("1027321324714070106", "1011738225490010113"), { body: commands });
		
		console.log("OK!");
		

	} catch(err){
	
		console.log("Erreur de sa mere " + err);
		
	}

})();


//grosse bite
async function wait(ms){

	return new Promise((resolve, reject)=>{

		setTimeout(()=>{
			resolve();
		},ms)

	});

}

//my beautiful msToString
function msToString(ms,hold="**",secs=false){
    var years=(ms/1000)/31536000|0;
    var months=((ms/1000)-(years*31536000))/2678400|0;
    var weeks=((ms/1000)-(years*31536000)-(months*2678400))/604800|0;
    var days=((ms/1000)-(years*31536000)-(months*2678400)-(weeks*604800))/86400|0;
    var hours=((ms/1000)-(years*31536000)-(months*2678400)-(weeks*604800)-(days*86400))/3600|0;
    var minutes=((ms/1000)-(years*31536000)-(months*2678400)-(weeks*604800)-(days*86400)-(hours*3600))/60|0;
    var seconds=((ms/1000)-(years*31536000)-(months*2678400)-(weeks*604800)-(days*86400)-(hours*3600)-(minutes*60))|0;
    let s = [];
    s.push(`${years>0 ? `${hold}${years}${hold} year${years>1 ? `s` : ``}` : '' }`);
    s.push(`${months>0 ? `${hold}${months}${hold} month${months>1 ? `s` : ``}` : '' }`);
    s.push(`${weeks>0 ? `${hold}${weeks}${hold} week${weeks>1 ? `s` : ``}` : '' }`);
    s.push(`${days>0 ? `${hold}${days}${hold} day${days>1 ? `s` : ``}` : '' }`);
    s.push(`${hours>0 ? `${hold}${hours}${hold} hour${hours>1 ? `s` : ``}` : '' }`);
    s.push(`${minutes>0 ? `${hold}${minutes}${hold} minute${minutes>1 ? `s` : ``}` : '' }`)
    s.push((secs||ms<60*1000) ? `${hold}${seconds}${hold} second${seconds>1 ? `s` : ``}` : "");
    s=s.filter(t=>t!=="");
    let str="";
    if(s.length>1){
        let pop=s.pop();
        str=s.join(", ")+" and "+pop;
    } else {
        str=s.join(", ");
    }
    return str;
}




///Chat Input Interaction
async function processChatInteraction(interaction){

	const n = interaction.commandName;
	if (n === 'groupe') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('grp_mica')
					.setLabel('MIC A')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_micb')
					.setLabel('MIC B')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_micc')
					.setLabel('MIC C')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_micd')
					.setLabel('MIC D')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_fasnum')
					.setLabel('Fas. Num.')
					.setStyle(ButtonStyle.Danger)
			);

		await interaction.reply({ content: 'Choisi ton groupe mon poto!', components: [row] });

	} else if(n === "quigagnera"){

		const u1 = interaction.options.getUser("qui").toString();
		const u2 = interaction.options.getUser("etqui").toString();
		const reason = interaction.options.getString("enquoi");

		var t = [u1, u2];
		if(Math.random()>Math.random()) t = [u2, u1];

		const e = "Qui gagnera entre " + u1 + " et " + u2 + " en " + reason + "? Hmmm....";

		const sents = [t[0] + " gagnera surement en " + reason,
					t[1] + "est meilleur(e) en " + reason,
					reason + "? Y'a que " + t[0] + " qui sait faire",
					"Honnêtement en " + reason + ", ya pas meilleur que " + t[0],
					"Perso je pense " + t[0],
					"La vie de moi " + t[0] + " il gagne.",
					"Surement " + t[0],
					t[1] + " il est nul en " + reason,
					t[1] + " gagnera autant de fois que j'ai de prix Noble",
					"J'hésite... Mais " + t[1] + " il est nul, donc sûrement " + t[0]]

		const rep = sents[Math.random()*sents.length|0];

		await interaction.reply(e);

		let reply = await interaction.fetchReply();

		await wait(2000 + Math.random()*1000|0);

		await reply.edit(rep);

	} else if (n === "akinator"){

		if(interaction.member.startedAkinator || interaction.member.akiParty){

			await interaction.reply({content: "Tu as dèja commence une partie, termine ta partie avant de commencer une nouvelle.", ephemeral: true})
			return;

		}

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('aki_per')
					.setLabel('Personne')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('aki_anim')
					.setLabel('Objet')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId('aki_obj')
					.setLabel('Animal')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true)
			);

			await interaction.reply({ content: "On commence une partie d'Akinator? Pour commencer dèja, choisi une catégorie:", components: [row] });

			let rep = await interaction.fetchReply();

			interaction.member.startedAkinator = rep.id;

			interaction.member.lastAkiTimeout = setTimeout(async ()=>{

				if(interaction.member.startedAkinator && interaction.member.startedAkinator == rep.id && !interaction.member.akiParty){

					interaction.member.akiParty = null;
					interaction.member.startedAkinator = null;
					await interaction.followUp({ content: "Tu as pris trop de temps, la partie est terminée.", ephemeral: true});
					await interaction.deleteReply();

				}

			}, 40000)


	}

}



async function processButtonInteraction(interaction){

	let bid = interaction.customId;

	let u = interaction.user.toString();

	if(bid.startsWith("grp_")){

		await interaction.reply({content: "Normalement là je devrai te donner un role mais Baptiste ne m'a pas encore donné les IDs des roles.", ephemeral: true});
 
	} else if(bid.startsWith("aki_")){

		if(!interaction.member.startedAkinator || interaction.member.startedAkinator !== interaction.message.id) {

			await interaction.reply({content: "C'est pas à toi cette partie :(", ephemeral: true});
			return;

		}
		
		let reg = "fr";
		if(bid == "aki_obj") reg = "fr_objects";
		if(bid == "aki_anim") reg = "fr_animals";

		await interaction.deferReply();

		const aki = new Aki({region: reg});
		await aki.start();

		interaction.member.akiParty = aki;
		aki.memberID = interaction.member.id;

		const row = new ActionRowBuilder();

		aki.answers.forEach((answer,i)=>{
			row.addComponents(new ButtonBuilder()
						.setLabel(answer)
						.setCustomId("akirep_"+i)
						.setStyle(i === 0 ? ButtonStyle.Success : (i === 1 ? ButtonStyle.Danger : ButtonStyle.Secondary)
						));
		});

		let sID = interaction.member.startedAkinator;
		let cstep = aki.currentStep;

		if (interaction.member.lastAkiTimeout) clearTimeout(interaction.member.lastAkiTimeout);
		interaction.member.lastAkiTimeout = setTimeout(async ()=>{

			if(interaction.member.startedAkinator === sID && interaction.member.akiParty && interaction.member.akiParty.currentStep === cstep){

				interaction.member.akiParty = null;
				interaction.member.startedAkinator = null;
				await interaction.followUp({ content: "Tu as pris trop de temps, la partie est terminée.", ephemeral: true});
				await interaction.deleteReply();

			}

		}, 40000)

		const endGame = new ActionRowBuilder();
		endGame.addComponents(new ButtonBuilder().setLabel("Finir la partie").setCustomId("akiend").setStyle(ButtonStyle.Primary));

		await interaction.message.delete();

		await interaction.editReply({content: u + ", " + aki.question, components: [row, endGame]});

		let rep = await interaction.fetchReply();

		interaction.member.startedAkinator = rep.id;


	} else if(bid.startsWith("akirep_") || bid === "akiback"){

		if(!interaction.member.startedAkinator || interaction.member.startedAkinator !== interaction.message.id) {

			await interaction.reply({content: "C'est pas à toi cette partie :(", ephemeral: true});
			return;

		}

		if(!interaction.member.akiParty){

			await interaction.reply({content: "Tu n'as pas commencé de partie?", ephemeral: true});
			return;

		}

		let aki = interaction.member.akiParty;

		await interaction.deferReply();

		if (bid === "akiback"){

			await aki.back();

		} else {

			let ans = parseInt(bid.replace("akirep_",""));

			if (ans == NaN) console.log("Can't get a number");

			await aki.step(ans);

		}

		if(aki.progress >= 70 || aki.currentStep >= 78){

			await aki.win();
			const file = new AttachmentBuilder(aki.answers[0].absolute_picture_path);
			await interaction.editReply({content: u + ", tu penses à: **" + aki.answers[0].name + "**, c'est ça?", components: [], files: [file]});
			await interaction.message.delete();
			interaction.member.akiParty = null;
			interaction.member.startedAkinator = null;

		} else {

			const row = new ActionRowBuilder();

			aki.answers.forEach((answer,i)=>{
				row.addComponents(new ButtonBuilder()
							.setLabel(answer)
							.setCustomId("akirep_"+i)
							.setStyle(i === 0 ? ButtonStyle.Success : (i === 1 ? ButtonStyle.Danger : ButtonStyle.Secondary)
							));
			});

			const endGame = new ActionRowBuilder();
			if (aki.currentStep>=1) endGame.addComponents(new ButtonBuilder().setLabel("Revenir en arrière").setCustomId("akiback").setStyle(ButtonStyle.Primary));
			endGame.addComponents(new ButtonBuilder().setLabel("Finir la partie").setCustomId("akiend").setStyle(ButtonStyle.Primary));

			await interaction.message.delete();

			await interaction.editReply({content: u + ", "+ aki.question, components: [row, endGame]});

			let rep = await interaction.fetchReply();

			interaction.member.startedAkinator = rep.id;

		}

		let sID = interaction.member.startedAkinator;
		let cstep = aki.currentStep;

		if (interaction.member.lastAkiTimeout) clearTimeout(interaction.member.lastAkiTimeout);
		interaction.member.lastAkiTimeout = setTimeout(async ()=>{

			if(interaction.member.startedAkinator === sID && interaction.member.akiParty && interaction.member.akiParty.currentStep === cstep){

				interaction.member.akiParty = null;
				interaction.member.startedAkinator = null;
				await interaction.followUp({ content: "Tu as pris trop de temps, la partie est terminée.", ephemeral: true});
				await interaction.deleteReply();

			}

		}, 40000)

	} else if(bid.startsWith("akiend")){

		if(!interaction.member.startedAkinator || interaction.member.startedAkinator !== interaction.message.id) {

			await interaction.reply({content: "C'est pas à toi cette partie :(", ephemeral: true});
			return;

		}

		if(!interaction.member.akiParty){

			await interaction.reply({content: "Tu n'as pas commencé de partie?", ephemeral: true});
			return;

		}

		await interaction.member.akiParty.win();
		interaction.member.akiParty = null;
		interaction.member.startedAkinator = null;

		await interaction.reply({content: "Partie terminée!", ephemeral: true});

		await interaction.message.delete();

	}

	

}


///Register all interactions :)
client.on('interactionCreate', async interaction => {

	if (interaction.isChatInputCommand()) await processChatInteraction(interaction);

	if (interaction.isButton()) await processButtonInteraction(interaction);

	return;


  });


client.on('messageCreate', async message => {

	if (message.author.id !== "123413327094218753") return;

	if (!message.content.startsWith("+")) return;

	console.log("yeah");
	
	let args = message.content.split(" ").filter(t=>t!=="");
	let command = args.shift();

	command = command.replace("+","");

	console.log(command);

	switch(command){

		case "evaluate":
			try{

				t = eval(message.content.replace("+evaluate",""));

				message.channel.send("**Output:**\n```js\n"+t+"\n```");

			} catch(err){

				message.channel.send("**Error:**\n```js\n"+err+"\n```");

			}
			break;

		case "uptime":

			message.channel.send("**Uptime:** " + msToString(client.uptime,"**",true));

			break;

	}

})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


