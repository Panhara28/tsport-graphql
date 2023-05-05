import ContextType from 'src/graphql/ContextType';

export const AdminRoleListQuery = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const adminRoleList = await knex.table('roles');

  return {
    data: adminRoleList.map(item => {
      return {
        ...item,
        access: {
          read: item.read,
          write: item.write,
          modify: item.modify,
          delete: item.delete,
        },
      };
    }),
  };
};
