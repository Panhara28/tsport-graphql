import ContextType from '../../../graphql/ContextType';

export const AdminMeQuery = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const token = ctx.authUser.user.token;

  if (token) {
    const user = await knex
      .table('user_token')
      .innerJoin('users', 'users.id', 'user_token.user_id')
      .innerJoin('role_permissions', 'role_permissions.user_id', 'users.id')
      .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
      .select('users.id', 'users.fullname', 'roles.name as roleName', 'roles.id as roleId')
      .where({ token })
      .first();

    return {
      ...user,
    };
  }

  return null;
};
