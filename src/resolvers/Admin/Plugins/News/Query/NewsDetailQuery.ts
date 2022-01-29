import ContextType from 'src/graphql/ContextType';

export const NewsDetailQuery = async (_, { id, websiteId }: { id: number; websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsDetail = await knex
    .table('news')
    .where({ id })
    .andWhere('websiteId', '=', websiteId)
    .first();

  return {
    ...newsDetail,
    description: newsDetail.description ? newsDetail.description : undefined,
  };
};
