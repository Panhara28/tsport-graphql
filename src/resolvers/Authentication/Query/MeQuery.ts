import ContextType from '../../../graphql/ContextType';

export const MeQuery = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const token = ctx.token;

  if (token) {
    const user = await knex
      .table('user_token')
      .innerJoin('users', 'users.id', 'user_token.user_id')
      .select('users.id', 'users.fullname')
      .where({ token })
      .first();

    const permissions = await knex
      .table('users')
      .innerJoin('role_permissions', 'users.id', 'role_permissions.user_id')
      .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
      .select('roles.name', 'roles.id')
      .where({ 'users.id': user.id });

    return {
      ...user,
      permissions,
    };
  }

  return null;
};
