import { AuthenticationError } from 'apollo-server';
import ContextType from '../../../graphql/ContextType';

export const AdminMeQuery = async (_, { websiteId }: { websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const token = ctx.authUser.user.token;

  if (token) {
    const queryUser = knex
      .table('user_token')
      .innerJoin('users', 'users.id', 'user_token.user_id')
      .innerJoin('website_user_details', 'website_user_details.user_id', 'users.id')
      .innerJoin('role_permissions', 'role_permissions.user_id', 'users.id')
      .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
      .innerJoin('user_plugins', 'user_plugins.user_id', 'users.id')
      .select(
        'users.id',
        'users.fullname',
        'roles.name as roleName',
        'roles.id as roleId',
        'user_plugins.plugin_id as pluginId',
        'website_user_details.website_id as websiteId',
      )
      .where({ token })
      .first();

    if (websiteId) {
      queryUser.andWhere('website_user_details.website_id', '=', websiteId);
    }

    const user = await queryUser;

    if (!user) {
      throw new AuthenticationError(`Please contact your admin to add you a plugin`);
    }

    const plugins = await knex
      .table('user_plugins')
      .innerJoin('plugins', 'plugins.id', 'user_plugins.plugin_id')
      .select(
        'plugins.name',
        'plugins.slug',
        'user_plugins.read',
        'user_plugins.create',
        'user_plugins.remove',
        'user_plugins.edit',
      )
      .where('user_plugins.website_id', '=', user.websiteId)
      .andWhere('user_plugins.user_id', '=', user.id);

    return {
      ...user,
      plugins: plugins.map(item => {
        return {
          ...item,
          access: {
            ...item,
          },
        };
      }),
    };
  }

  return null;
};
