import { ChildrenCategory } from 'src/dataloader/childrenCategory';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const DocumentCategoryListQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.FilterDocumentCategory },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const query = knex.table('document_category').where({ website_id: 1 });

  if (filter?.category_name !== undefined) {
    query.andWhere({ category_name: filter?.category_name });
  }

  if (filter?.hasChildren !== undefined) {
    if (filter?.hasChildren === 'PARENT') {
      query.andWhere({ parent_id: 0 });
    }
  }

  if (pagination?.page != undefined || pagination?.size != undefined) {
    query.offset((pagination.page - 1) * pagination.size).limit(pagination.size);
  } else {
    query.limit(20).offset(0);
  }

  const data = await query;

  const children = ChildrenCategory(ctx);

  return {
    data: data.map(item => {
      return {
        ...item,
        layerOne: children.load(item.id),
      };
    }),
  };
};
