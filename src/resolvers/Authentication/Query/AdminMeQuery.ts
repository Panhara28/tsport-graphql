import ContextType from '../../../graphql/ContextType';

export const AdminMeQuery = async (_, { websiteId }: { websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const token = ctx.authUser.user.token;
  console.log(websiteId);

  if (token) {
    const user = await knex
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
    console.log(user);

    // const plugins = await knex
    //   .table('user_plugins')
    //   .innerJoin('plugins', 'plugins.id', 'user_plugins.plugin_id')
    //   .select(
    //     'plugins.name',
    //     'plugins.slug',
    //     'user_plugins.read',
    //     'user_plugins.create',
    //     'user_plugins.remove',
    //     'user_plugins.edit',
    //   )
    //   .where('user_plugins.website_id', '=', user.websiteId)
    //   .andWhere('user_plugins.user_id', '=', user.id);

    return {
      ...user,
      plugins: [],
      // plugins: plugins.map(item => {
      //   return {
      //     ...item,
      //     access: {
      //       ...item,
      //     },
      //   };
      // }),
    };
  }

  return null;
};
