import ContextType from 'src/graphql/ContextType';
import { Graph } from 'src/generated/graph';
import { toKhmerFormat } from 'src/function/toKhmerFormat';

export const PublicNewsCategoryListQuery = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsCategoryList = await knex
    .table('news_category')
    .orderBy('id', 'desc')
    .limit(8);

  return newsCategoryList.map(async (category: Graph.NewsCategory) => {
    const newsDetail = await knex
      .table('news')
      .where({ new_category_id: category.id, status: 'PUBLISHED' })
      .orderBy('published_date', 'desc');

    return {
      ...category,
      news: newsDetail.map(item => {
        return {
          ...item,
          published_date: item?.published_date ? toKhmerFormat(item?.published_date) : undefined,
          // created_date: toKhmerFormat(item.created_date),
        };
      }),
    };
  });
};
