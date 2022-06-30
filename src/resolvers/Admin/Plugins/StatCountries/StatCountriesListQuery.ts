import ContextType from 'src/graphql/ContextType';

export const StatCountriesListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const data = await knex.table('stat_countries');

  return {
    data,
  };
};
