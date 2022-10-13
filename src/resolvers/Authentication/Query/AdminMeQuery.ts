import { AuthenticationError } from 'apollo-server';
import ContextType from '../../../graphql/ContextType';

export const AdminMeQuery = async (
  _,
  { websiteId, clientToken }: { websiteId: number; clientToken: string },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  if (clientToken) {
    const queryUser = knex
      .table('user_token')
      .innerJoin('users', 'users.id', 'user_token.user_id')
      .innerJoin('role_permissions', 'role_permissions.user_id', 'users.id')
      .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
      .select(
        'users.id',
        'users.fullname',
        'roles.name as roleName',
        'roles.id as roleId',
        'users.profile_picture',
        'users.email',
        'users.phone_number as phoneNumber',
      )
      .where({ token: clientToken, 'users.published': true })
      .first();
    // Query current user by websiteId

    const user = await queryUser;

    const access = await knex
      .table('roles')
      .where({ id: user?.roleId })
      .first();

    if (!user) {
      throw new AuthenticationError(`Please contact your admin to add you a plugin`);
    }

    return {
      ...user,
      profilePicture: user?.profile_picture,
      access: {
        ...access,
      },
    };
  }

  return null;
};
