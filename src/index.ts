import { Events } from 'discord.js';
import { CustomClient } from './utils/client';
import { registerSlashCreateCommands } from './create-commands';

const client = new CustomClient({
  intents: [
    'Guilds',
    'GuildMessages',
    'MessageContent',
    'GuildMembers',
    'GuildVoiceStates',
  ],
});

registerSlashCreateCommands(client);

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.login(process.env.DISCORD_BOT_TOKEN);