import ContextType from 'src/graphql/ContextType';

export const RoleDetailQuery = async (_, { roleId }: { roleId: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const role = await knex
    .table('roles')
    .where({ id: roleId })
    .first();

  return {
    id: role?.id,
    name: role?.name,
    access: {
      read: role?.read,
      write: role?.write,
      modify: role?.modify,
      delete: role?.delete,
    },
  };
};
