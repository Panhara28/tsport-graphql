import ContextType from 'src/graphql/ContextType';

export const ExportsDetailQuery = async (_: any, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const exportsDetail = await knex
    .table('exports')
    .where({ id })
    .first();

  return exportsDetail;
};
