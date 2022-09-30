const { Client, GatewayIntentBits, Partials, ChannelType, ActivityType, ActionRow } = require('discord.js');
const keepAlive = require(`./server`);
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages, 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildBans, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
    ], 
    partials: ['CHANNEL', 'MESSAGE'] 
});
const { EmbedBuilder } = require('discord.js');
const Config = require('./config.json');
require('dotenv').config()
const r = '\x1b[0m';

// Commands \\
client.on('interactionCreate', async interaction => {
    const { commandName } = interaction;
    if (!interaction.isCommand()) return;

    if (commandName == 'ping') {
        const embed = new EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`> Latency er **${Date.now() - interaction.createdTimestamp}**ms\n> API Latency er **${Math.round(client.ws.ping)}**ms\n\n[Discord Status](https://discordstatus.com)`)
            .setColor(Config.defaultColor)
            .setFooter({ text: 'ZunCore - Ping', iconURL: Config.serverLogo })

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
})

// Startup \\
client.on('ready', () => {
    console.clear()
    console.log(`\x1b[1m[✅] \x1b[37mLogget ind som \x1b[0m\x1b[34m${client.user.tag}${r}`);

    const guild = client.guilds.cache.get(process.env['GUILD']);
    let commands
        
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Ping Command ⚙️.',
    })
})

// Login \\
client.login(process.env['TOKEN'])
keepAlive();