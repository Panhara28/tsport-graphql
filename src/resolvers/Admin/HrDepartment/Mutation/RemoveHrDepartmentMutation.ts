import ContextType from 'src/graphql/ContextType';

export const RemoveHrDepartmentMutation = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  await knex
    .table('hr_departments')
    .where({ id })
    .delete();

  return true;
};
