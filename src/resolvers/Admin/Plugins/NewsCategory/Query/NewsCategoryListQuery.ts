import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const NewsCategoryListQuery = async (
  _,
  { websiteId, pagination }: { websiteId: number; pagination: Graph.PaginationInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const isRead = await ctx.authUser?.user?.read;
  if (isRead) {
    const query = knex
      .table('news_category')
      .orderBy('id', 'desc')
      .where('website_id', '=', websiteId);

    if (pagination.size != undefined && pagination.page != undefined) {
      query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
    }

    const data = await query;

    return {
      data: data.map(item => {
        return {
          ...item,
        };
      }),
      pagination: {
        total: data.length,
        size: data.length,
        current: pagination.page,
      },
    };
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
