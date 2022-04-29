import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const NewsCategoryListQuery = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const newsCategoryList = await knex.table('news_category').orderBy('id', 'desc');

  return newsCategoryList.map((category: Graph.NewsCategory) => {
    return {
      ...category,
    };
  });
};
