import { NewsCategoryLoader } from 'src/dataloader/newsCategoryLoader';
import { toKhmerFormat } from 'src/function/toKhmerFormat';
import ContextType from 'src/graphql/ContextType';

export const PublicNewsDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsDetail = await knex
    .table('news')
    .where({ id })
    .first();
  const newsCategory = NewsCategoryLoader(ctx);
  return {
    ...newsDetail,
    created_at: toKhmerFormat(newsDetail?.created_at),
    published_date: newsDetail?.published_date ? toKhmerFormat(newsDetail?.published_date) : undefined,
    // created_date: toKhmerFormat(newsDetail.created_date),
    category: () => newsCategory.load(newsDetail?.new_category_id),
  };
};
