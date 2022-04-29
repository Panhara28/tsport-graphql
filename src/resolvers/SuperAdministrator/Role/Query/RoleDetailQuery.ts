import ContextType from 'src/graphql/ContextType';

export const RoleDetailQuery = async (
  _,
  { websiteId, roleId }: { websiteId: number; roleId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const roleDetail = await knex
    .table('roles')
    .where('website_id', '=', websiteId)
    .andWhere('id', '=', roleId)
    .first();

  return {
    ...roleDetail,
    access: {
      read: roleDetail.read,
      create: roleDetail.write,
      edit: roleDetail.modified,
    },
  };
};
