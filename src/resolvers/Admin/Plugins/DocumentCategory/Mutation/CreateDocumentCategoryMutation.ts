import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateDocumentCategoryMutation = async (
  _,
  { input }: { input: Graph.DocumentCategoryInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  const admin_id = ctx.authUser.user.id;
  const [createDocumentCategory] = await knex.table('document_category').insert({
    category_name: input.category_name,
    parent_id: input.parent_id ? input.parent_id : 0,
    website_id: 1,
    created_by: admin_id,
    updated_by: admin_id,
  });

  return createDocumentCategory;
};
