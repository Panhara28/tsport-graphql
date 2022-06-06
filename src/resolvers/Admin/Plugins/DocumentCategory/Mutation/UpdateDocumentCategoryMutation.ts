import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateDocumentCategoryMutation = async (
  _,
  { id, input }: { id: number; input: Graph.DocumentCategoryInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const updateDocumentCategory = await knex
    .table('document_category')
    .update({
      category_name: input.category_name,
      parent_id: input.parent_id ? input.parent_id : 0,
    })
    .where({ id });

  return updateDocumentCategory > 0;
};
