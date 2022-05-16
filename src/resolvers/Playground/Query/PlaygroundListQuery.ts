import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const PlaygroundListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const playgroundList = await knex.table('playground');

  return {
    data: playgroundList.map(item => {
      return {
        ...item,
      };
    }),
  };
};
