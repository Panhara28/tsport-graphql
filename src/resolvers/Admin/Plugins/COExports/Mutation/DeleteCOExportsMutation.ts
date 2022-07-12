import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const DeleteCOExportsMutation = async (_: any, { coExportId }: { coExportId: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  await knex
    .table('co_exports')
    .where('id', '=', coExportId)
    .del();
  await knex
    .table('co_exports_detail')
    .where('co_exports_id', '=', coExportId)
    .del();

  return true;
};
