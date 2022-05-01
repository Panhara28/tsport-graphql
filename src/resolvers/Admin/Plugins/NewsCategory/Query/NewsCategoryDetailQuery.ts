import ContextType from 'src/graphql/ContextType';

export const NewsCateogryDetailQuery = async (
  _,
  { websiteId, id }: { websiteId: number; id: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const newsCategory = await knex
    .table('news_category')
    .where({ id })
    .andWhere('website_id', '=', websiteId)
    .first();

  return {
    ...newsCategory,
  };
};
