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

  const roles_permission = await knex.table('role_permissions').whereIn(
    'user_id',
    users.map(x => x.id),
  );

  const total_users: any = await knex.table('users').count('id as CNT');

  return {
    data: users?.map(x => {
      const role_id = roles_permission.find(f => f.user_id === x.id);
      return {
        ...x,
        phoneNumber: x?.phone_number,
        roleId: role_id ? role_id.role_id : 0,
      };
    }),
    pagination: {
      current: pagination?.page,
      total: total_users[0]?.CNT,
      size: users?.length,
    },
  };
};
