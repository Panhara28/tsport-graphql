import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreatePlaygrounMutation = async (_, { input }: { input: Graph.PlaygroundInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const [createPlayground] = await knex.table('playground').insert({
    title: input.title,
  });

  return createPlayground;
};
