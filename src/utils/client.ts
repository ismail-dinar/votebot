import {
  Client,
  ClientOptions,
  Guild,
  GuildMember,
  VoiceBasedChannel,
} from 'discord.js';

export class CustomClient extends Client {
  public constructor(options: ClientOptions) {
    super(options);
  }

  public async getGuildById(id: string): Promise<Guild> {
    return this.guilds.cache.get(id) ?? (await this.guilds.fetch(id));
  }

  public async getMemberById(
    id: string,
    guildId: string
  ): Promise<GuildMember> {
    const guild = await this.getGuildById(guildId);

    const member =
      guild.members.cache.get(id) ?? (await guild.members.fetch(id));

    return member;
  }

  public async getTargetChannel(
    guildId: string,
    userId: string
  ): Promise<VoiceBasedChannel> {
    const member = await this.getMemberById(userId, guildId);

    return member.voice.channel;
  }

  public async getBotTargetChannel(
    guildId: string,
    applicationId: string
  ): Promise<VoiceBasedChannel> {
    const bot = await this.getMemberById(applicationId, guildId);

    return bot.voice.channel;
  }
}
