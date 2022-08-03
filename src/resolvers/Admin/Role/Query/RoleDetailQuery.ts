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
      generalDepartmentRead: role?.generalDepartmentRead,
      generalDepartmentWrite: role?.generalDepartmentWrite,
      generalDepartmentModify: role?.generalDepartmentModify,
      generalDepartmentRemove: role?.generalDepartmentRemove,
      departmentRead: role?.departmentRead,
      departmentWrite: role?.departmentWrite,
      departmentModify: role?.departmentModify,
      departmentRemove: role?.departmentRemove,
      officeRead: role?.officeRead,
      officeWrite: role?.officeWrite,
      officeModify: role?.officeModify,
      officeRemove: role?.officeRemove,
      officerRead: role?.officerRead,
      officerWrite: role?.officerWrite,
      officerModify: role?.officerModify,
      officerRemove: role?.officerRemove,
    },
  };
};
