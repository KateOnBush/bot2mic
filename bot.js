const {

	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	REST,
	SlashCommandBuilder,
	Client,
	Routes,
	GatewayIntentBits

} = require('discord.js');
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
					"Honnêtement en " + reason + ", personne ne gagne " + t[0],
					"Perso je pense " + t[0],
					"La vie de moi " + t[0] + " il gagne.",
					"Surement " + t[0],
					t[1] + " il est nul en " + reason,
					t[1] + " gagnera autant de fois que j'ai de prix Noble"]

		const rep = sents[Math.random()*sents.length|0];

		await interaction.reply(e);

		//let reply = await interaction.fetchReply();

		await wait(2000 + Math.random()*1000|0);

		await interaction.followUp(rep);

	}

}



async function processButtonInteraction(interaction){

	if(interaction.customId.startsWith("grp_")){

		await interaction.reply({content: "Normalement là je devrai te donner un role mais Baptiste ne m'a pas encore donné les IDs des roles.", ephemeral: true});

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


