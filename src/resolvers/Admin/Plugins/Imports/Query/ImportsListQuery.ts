import ContextType from 'src/graphql/ContextType';

export const ImportsListQuery = async (_: any, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const importsList = knex.table('imports');

  const data = await importsList;

  return {
    data,
  };
};
