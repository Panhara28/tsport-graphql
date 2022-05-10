import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateProvinceMutation = async (
  _,
  { input, id }: { input: Graph.ProvinceInput; id: number },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const updateProvince = await knex
    .table('provinces')
    .update({
      name: input.name,
      created_by: input.created_by,
      updated_by: input.updated_by,
    })
    .where({ id });

  return updateProvince >= 0;
};
