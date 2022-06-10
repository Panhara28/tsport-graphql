import { AuthenticationError } from 'apollo-server';
import { ChildrenCategory } from 'src/dataloader/childrenCategory';
import { DocumentLoader } from 'src/dataloader/documentLoader';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const DocumentCategoryListQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.FilterDocumentCategory },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  const isRead = ctx?.authUser?.user?.read;

  if (isRead) {
    const query = knex.table('document_category').where({ website_id: 1 });

    if (filter?.category_name !== undefined) {
      query.andWhere({ category_name: filter?.category_name });
    }

    if (pagination?.page != undefined || pagination?.size != undefined) {
      query.offset((pagination.page - 1) * pagination.size).limit(pagination.size);
    } else {
      query.limit(20).offset(0);
    }

    const data = await query;

    return {
      data: data.map(async item => {
        return {
          ...item,
        };
      }),
    };
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
