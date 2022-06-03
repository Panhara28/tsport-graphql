import { AuthorLoader } from 'src/dataloader/authorLoader';
import { NewsCategoryLoader } from 'src/dataloader/newsCategoryLoader';
import { toKhmerFormat } from 'src/function/toKhmerFormat';
import { Graph } from 'src/generated/graph';
import { table_news } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export const NewsByCategoryQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.FilterNews },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const query = knex.table('news').where({ website_id: 1 });

  if (filter?.status != undefined) {
    query.andWhere({ status: filter.status });
  }

  if (pagination?.page != undefined || pagination?.size != undefined) {
    query.offset((pagination.page - 1) * pagination.size).limit(pagination.size);
  } else {
    query.limit(20).offset(0);
  }

  if (filter?.sort === 'PAGEVIEW') {
    query.orderBy('pageview', 'desc');
  } else if (filter?.sort === 'PUBLISHED_DATE') {
    query.orderBy('published_date', 'desc');
  }

  if (filter?.category_id !== undefined) {
    query.andWhere('new_category_id', '=', filter?.category_id);
  }

  const data: table_news[] = await query;

  const newsCategory = NewsCategoryLoader(ctx);
  const author = AuthorLoader(ctx);

  return {
    data: data.map(item => {
      return {
        ...item,
        created_at: toKhmerFormat(item?.created_at),
        published_date: item?.published_date ? toKhmerFormat(item?.published_date) : undefined,
        category: () => newsCategory.load(item?.new_category_id),
        author: () => author.load(item.created_by),
      };
    }),
  };
};
