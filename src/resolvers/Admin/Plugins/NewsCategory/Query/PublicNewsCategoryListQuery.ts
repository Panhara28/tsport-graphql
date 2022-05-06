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
    const newsDetail = await knex.table('news').where({ new_category_id: category.id, status: 'PUBLISHED' });

    return {
      ...category,
      news: newsDetail.map((item: any) => {
        return {
          ...item,
          created_date: toKhmerFormat(item.created_date),
        };
      }),
    };
  });
};
