import { toKhmerFormat } from 'src/function/toKhmerFormat';
import ContextType from 'src/graphql/ContextType';

export const PublicNewsCateogryDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsCategory = await knex
    .table('news_category')
    .where({ id })
    .first();
  const news = await knex.table('news').where({ new_category_id: newsCategory.id });

  return {
    ...newsCategory,
    news: news.map(item => {
      return {
        ...item,
        // created_date: toKhmerFormat(item.created_date),
        published_date: item?.published_date ? toKhmerFormat(item?.published_date) : undefined,
        created_at: toKhmerFormat(item.created_at),
      };
    }),
  };
};
