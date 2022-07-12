import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const DeleteExportsMutation = async (_: any, { exportId }: { exportId: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  await knex
    .table('exports')
    .where('id', '=', exportId)
    .del();
  await knex
    .table('exports_detail')
    .where('exports_id', '=', exportId)
    .del();

  return true;
};
