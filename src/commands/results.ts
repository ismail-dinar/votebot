import { groupBy } from 'lodash';
import { CommandContext, SlashCommand, SlashCreator } from 'slash-create';
import { CustomClient } from '../utils/client';
import choices from '../data/choices.json';
import { EmbedBuilder } from 'discord.js';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default class VoteResults extends SlashCommand<CustomClient> {
  public constructor(creator: SlashCreator) {
    super(creator, {
      name: 'results',
      description: 'Show the vote results',
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

    // ctx.send(
    //   '--------------------------Vote results--------------------------'
    // );
    // ctx.sendFollowUp('Total votes: ' + (globalThis as any).vote.length);
    // ctx.sendFollowUp(
    //   '--------------------------Vote results--------------------------'
    // );

    // for (let i = 0; i < (globalThis as any).vote.length; i++) {
    //   ctx.send(
    //     (globalThis as any).vote[i].user.displayName +
    //       ' voted for ||' +
    //       (globalThis as any).vote[i].choice.text +
    //       '||'
    //   );
    // }

    const res = Object.fromEntries(
      Object.entries(groupBy((globalThis as any).vote, 'choice.game')).map(
        ([key, value]) => [key, value.length]
      )
    );

    const chart = {
      type: 'bar',
      data: {
        labels: Object.keys(res).map((key) => {
          return choices.find((choice) => choice.value === parseInt(key)).name;
        }),
        datasets: [
          {
            label: 'Games',
            data: Object.values(res),
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "white",
                fontSize: 14,
            }
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true
             }
            },
          ],
        },
        legend: {
            display: false
         },
      },
    };

    const encodedChart = encodeURIComponent(JSON.stringify(chart));

    const embed = new EmbedBuilder().setImage(
      `https://quickchart.io/chart?c=${encodedChart}`
    );

    ctx.send({
      embeds: [embed.data],
    });
  }
}
