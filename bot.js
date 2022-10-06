const {

	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	REST,
	SlashCommandBuilder,
	Client,
	Routes,
	GatewayIntentBits

} = require('discord.js');;
const { Aki } = require("aki-api");
const client = new Client({intents: [GatewayIntentBits.Guilds]});



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
		
		await rest.put(Routes.applicationGuildCommands("1027321324714070106", "1027322663061966868"), { body: commands });
		
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

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('aki_per')
					.setLabel('Personne')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('aki_anim')
					.setLabel('Objet')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('aki_obj')
					.setLabel('Animal')
					.setStyle(ButtonStyle.Secondary)
			);

			await interaction.reply({ content: "On commence une partie d'Akinator? Pour commencer dèja, choisi une catégorie:", components: [row] });

			let rep = await interaction.fetchReply();

			interaction.member.startedAkinator = rep.id;

			/*setTimeout(()=>{

				if(interaction.member.startedAkinator && interaction.member.startedAkinator == rep.id && !interaction.member.akiParty){

					interaction.member.akiParty = null;
					interaction.member.startedAkinator = null;
					interaction.reply({ content: "Tu as pris trop de temps, partie est terminée.", ephemeral: true});

				}

			}, 40000)*/


	}

}



async function processButtonInteraction(interaction){

	let bid = interaction.customId;

	if(bid.startsWith("grp_")){

		await interaction.reply({content: "Normalement là je devrai te donner un role mais Baptiste ne m'a pas encore donné les IDs des roles.", ephemeral: true});
 
	} else if(bid.startsWith("aki_")){

		if(!interaction.member.startedAkinator || interaction.member.startedAkinator !== interaction.message.id) {

			await interaction.reply({content: "C'est pas à toi cette partie :(", ephemeral: true});
			return;

		}
		
		let reg = "fr";
		if(bid === "aki_obj") reg = "fr_objects";
		if(bid === "aki_anim") reg = "fr_animals";

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
						.setStyle(i === 0 ? ButtonStyle.Success : (i === 4 ? ButtonStyle.Primary : ButtonStyle.Secondary)
						));
		});

		let sID = interaction.member.startedAkinator;
		let cstep = aki.currentStep;

		setTimeout(()=>{

			if(interaction.member.startedAkinator === sID && interaction.member.akiParty && interaction.member.akiParty.currentStep === cstep){

				interaction.member.akiParty = null;
				interaction.member.startedAkinator = null;
				interaction.reply({ content: "Tu as pris trop de temps, partie est terminée.", ephemeral: true});

			}

		}, 40000)

		const endGame = new ActionRowBuilder();
		endGame.addComponents(new ButtonBuilder().setLabel("Finir la partie").setCustomId("akiend").setStyle(ButtonStyle.Danger));

		await interaction.message.delete();

		let rep = await interaction.reply({content: aki.question, components: [row, endGame]});

		let rep = await interaction.fetchReply();

		interaction.member.startedAkinator = rep.id;


	} else if(bid.startsWith("akirep_")){

		if(!interaction.member.startedAkinator || interaction.member.startedAkinator !== interaction.message.id) {

			await interaction.reply({content: "C'est pas à toi cette partie :(", ephemeral: true});
			return;

		}

		if(!interaction.member.akiParty){

			await interaction.reply({content: "Tu n'as pas commencé de partie?", ephemeral: true});
			return;

		}

		let aki = interaction.member.akiParty;

		let ans = parseInt(bid.replace("akirep_",""));

		if (ans == NaN) console.log("Can't get a number");

		await interaction.deferReply();

		await aki.step(ans);

		if(aki.progress >= 70 || aki.currentStep >= 78){

			await aki.win();
			await interaction.message.edit("Tu penses à **" + aki.answers[0].name + "**, c'est ça?", { files: [aki.answers[0].picture_path]});
			interaction.member.akiParty = null;
			interaction.member.startedAkinator = null;

		} else {

			const row = new ActionRowBuilder();

			aki.answers.forEach((answer,i)=>{
				row.addComponents(new ButtonBuilder()
							.setLabel(answer)
							.setCustomId("akirep_"+i)
							.setStyle(i === 0 ? ButtonStyle.Success : (i === 4 ? ButtonStyle.Primary : ButtonStyle.Secondary)
							));
			});

			const endGame = new ActionRowBuilder();
			endGame.addComponents(new ButtonBuilder().setLabel("Finir la partie").setCustomId("akiend").setStyle(ButtonStyle.Danger));

			await interaction.message.delete();

			await interaction.reply({content: aki.question, components: [row, endGame]});

			let rep = await interaction.fetchReply();

			interaction.member.startedAkinator = rep.id;

		}

		let sID = interaction.member.startedAkinator;
		let cstep = aki.currentStep;

		setTimeout(()=>{

			if(interaction.member.startedAkinator === sID && interaction.member.akiParty && interaction.member.akiParty.currentStep === cstep){

				interaction.member.akiParty = null;
				interaction.member.startedAkinator = null;
				interaction.reply({ content: "Tu as pris trop de temps, partie est terminée.", ephemeral: true});

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

		interaction.message.edit("Partie d'Akinator terminée.")

	}

	

}



///Register all interactions :)
client.on('interactionCreate', async interaction => {

	if (interaction.isChatInputCommand()) await processChatInteraction(interaction);

	if (interaction.isButton()) await processButtonInteraction(interaction);

	return;


  });

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


