import ContextType from 'src/graphql/ContextType';

export const NewsCateogryDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsCategory = await knex
    .table('news_category')
    .where({ id })
    .first();

  return {
    ...newsCategory,
  };
};
