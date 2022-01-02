import ContextType from 'src/graphql/ContextType';

export const WebsiteQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const website = await knex
    .table('websites')
    .where({ id })
    .first();

  return {
    ...website,
  };
};
