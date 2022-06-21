import ContextType from 'src/graphql/ContextType';

export const ExportsListQuery = async (_: any, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const exportsList = knex.table('exports');

  const data = await exportsList;

  return {
    data,
  };
};
