import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AdminUserListQuery = async (
  _,
  { pagination }: { pagination: Graph.PaginationInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const query = knex.table('users');

  if (pagination.size != undefined && pagination.page != undefined) {
    query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
  }

  const users = await query;

  return {
    data: users.map(x => {
      return {
        ...x,
      };
    }),
    pagination: {
      current: pagination.page,
      total: users.length,
      page: users.length,
    },
  };
};
