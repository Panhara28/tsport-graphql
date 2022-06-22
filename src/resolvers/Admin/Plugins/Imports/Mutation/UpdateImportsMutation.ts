import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateImportsMutation = async (
  _: any,
  { id, input }: { id: number; input: Graph.ImportsInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const updateImports = await knex
    .table('imports')
    .where({
      id,
    })
    .update({
      name: input?.name,
    });

  return updateImports[0] > 0;
};
