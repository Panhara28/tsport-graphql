import { NewsCategoryLoader } from 'src/dataloader/newsCategoryLoader';
import { toKhmerFormat } from 'src/function/toKhmerFormat';
import ContextType from 'src/graphql/ContextType';

async function NextPublicNewsId(ctx: ContextType, prevId) {
  const knex = ctx.knex.default;

  const [query] = await knex.raw(
    `SELECT 
        id AS next_id 
      FROM 
        news 
      WHERE id < :prev_id AND 
      status="PUBLISHED" 
      ORDER BY id DESC LIMIT 1;`,
    { prev_id: prevId },
  );

  return query[0].next_id;
}

export const PublicNewsDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsDetail = await knex
    .table('news')
    .where({ id })
    .first();

  const newsCategory = NewsCategoryLoader(ctx);
  const author = await knex('users')
    .where({ id: newsDetail.created_by })
    .first();
  return {
    ...newsDetail,
    created_at: toKhmerFormat(newsDetail?.created_at),
    published_date: newsDetail?.published_date ? toKhmerFormat(newsDetail?.published_date) : undefined,
    category: () => newsCategory.load(newsDetail?.new_category_id),
    author,
    next_id: async () => {
      return await NextPublicNewsId(ctx, newsDetail.id);
    },
  };
};
