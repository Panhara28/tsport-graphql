import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AdminUserListQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.UserFilter },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const query = knex.table('users');

  if (filter?.fullname) {
    query?.andWhere('fullname', 'like', `%${filter?.fullname}%`);
  }

  if (pagination?.size != undefined && pagination?.page != undefined) {
    query.limit(pagination?.size).offset((pagination?.page - 1) * pagination?.size);
  }

  const users = await query;
  const tatal_users: any = await knex.table('users').count('id as CNT');

  return {
    data: users?.map(x => {
      return {
        ...x,
      };
    }),
    pagination: {
      current: pagination?.page,
      total: tatal_users[0]?.CNT,
      size: users?.length,
    },
  };
};
