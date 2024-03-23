import {
  CommandContext,
  CommandOptionType,
  SlashCommand,
  SlashCreator,
} from 'slash-create';
import { CustomClient } from '../utils/client';
import { UserVote } from '../interfaces/user-vote';
import choices from '../data/choices.json';

export default class Vote extends SlashCommand<CustomClient> {
  public constructor(creator: SlashCreator) {
    super(creator, {
      name: 'vote',
      description: 'Vote',
      options: [
        {
          name: 'game',
          description: 'The game you want to vote for',
          type: CommandOptionType.NUMBER,
          required: true,
          choices: choices,
        },
        {
          name: 'text',
          description: 'The text that will be shown to other users',
          type: CommandOptionType.STRING,
          required: true,
        },
      ],
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

    ((globalThis as any).vote as Array<UserVote>).push({
      user: {
        id: member.id,
        displayName: member.displayName,
      },
      choice: {
        game: ctx.options.game,
        text: ctx.options.text,
      },
    });

    ctx.send('Vote submitted');
  }
}
