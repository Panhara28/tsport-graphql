import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateDocumentCategoryMutation = async (
  _,
  { id, input }: { id: number; input: Graph.DocumentCategoryInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  const admin_id = ctx.authUser.user.id;
  const isUpdated = ctx?.authUser?.user?.modified;
  if (isUpdated) {
    const updateDocumentCategory = await knex
      .table('document_category')
      .update({
        category_name: input.category_name,
        parent_id: input.parent_id ? input.parent_id : 0,
        updated_by: admin_id,
      })
      .where({ id });

    return updateDocumentCategory > 0;
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
