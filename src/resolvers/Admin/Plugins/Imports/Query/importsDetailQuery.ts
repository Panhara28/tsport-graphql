import ContextType from 'src/graphql/ContextType';

export const importsDetailQuery = async (_: any, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const importsDetail = await knex
    .table('imports')
    .where({ id })
    .first();

  return importsDetail;
};
