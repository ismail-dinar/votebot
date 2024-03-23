import { Client, GatewayDispatchEvents } from 'discord.js';
import { GatewayServer, SlashCreator } from 'slash-create';
import { join } from 'path';

export async function registerSlashCreateCommands(
  client: Client
): Promise<void> {
  const creator = new SlashCreator({
    applicationID: process.env.DISCORD_APP_ID,
    publicKey: process.env.DISCORD_APP_PUBLIC_KEY,
    token: process.env.DISCORD_TOKEN,
    client,
  });

  await creator
    .withServer(
      new GatewayServer((handler) =>
        client.ws.on(GatewayDispatchEvents.InteractionCreate, handler)
      )
    )
    .registerCommandsIn(join(__dirname, 'commands'), ['.ts']);

  await creator.syncCommands();
}
