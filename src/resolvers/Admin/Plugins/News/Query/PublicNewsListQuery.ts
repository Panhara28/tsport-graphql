import { NewsCategoryLoader } from 'src/dataloader/newsCategoryLoader';
import { toKhmerFormat } from 'src/function/toKhmerFormat';
import { Graph } from 'src/generated/graph';
import { table_news } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export const PublicNewsListQuery = async (
  _,
  { filter, pagination }: { filter: Graph.FilterNews; pagination: Graph.PaginationInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const query = knex.table('news').orderBy('created_at', 'desc');

  if (filter?.status != undefined) {
    query.andWhere({ status: filter.status });
  }

  if (pagination?.page != undefined || pagination?.size != undefined) {
    query.limit(pagination.size).offset(pagination.page);
  }

  const data: table_news[] = await query;

  // const newsCategories = await knex.table('news_category');
  const newsCategory = NewsCategoryLoader(ctx);

  return data.map(item => {
    return {
      ...item,
      created_at: toKhmerFormat(item.created_at),
      created_date: toKhmerFormat(item.created_date),
      category: () => newsCategory.load(item.new_category_id),
    };
  });
};
