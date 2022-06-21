import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateExportsMutation = async (
  _: any,
  { id, input }: { id: number; input: Graph.ExportsInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const updateExports = await knex
    .table('exports')
    .where({
      id,
    })
    .update({
      name: input?.name,
      referenceFile: input?.referenceFile,
    });

  return updateExports[0] > 0;
};
