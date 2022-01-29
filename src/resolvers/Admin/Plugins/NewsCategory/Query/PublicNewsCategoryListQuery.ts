import ContextType from 'src/graphql/ContextType';
import { Graph } from 'src/generated/graph';

export const PublicNewsCategoryListQuery = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsCategoryList = await knex
    .table('news_category')
    .orderBy('id', 'desc')
    .limit(8);

  return newsCategoryList.map((category: Graph.NewsCategory) => {
    return {
      ...category,
    };
  });
};
