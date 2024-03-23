import { CommandContext, SlashCommand, SlashCreator } from 'slash-create';
import { CustomClient } from '../utils/client';

export default class StartVote extends SlashCommand<CustomClient> {
  public constructor(creator: SlashCreator) {
    super(creator, {
      name: 'start',
      description: 'Start a new vote',
    });

    this.filePath = __filename;
  }

  public async run(ctx: CommandContext) {
    await ctx.defer();
    const member = await this.client.getMemberById(ctx.user.id, ctx.guildID);
    const bot = await this.client.getMemberById(
      ctx.data.application_id,
      ctx.guildID
    );

    (globalThis as any).vote = [];

    ctx.send(
      '--------------------------Vote started!--------------------------'
    );
  }
}
