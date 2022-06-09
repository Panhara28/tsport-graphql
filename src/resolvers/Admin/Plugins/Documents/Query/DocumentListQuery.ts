import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const DocumentListQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.FilterDocumentInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const isRead = ctx?.authUser?.user?.read;
  if (isRead) {
    const query = knex.table('documents');

    if (pagination.size != undefined && pagination.page != undefined) {
      query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
    }

    if (filter?.category !== undefined) {
      query.andWhere({ document_category_id: filter?.category });
    }

    if (filter?.categorySubId !== undefined) {
      query.andWhere({ document_category_sub_id: filter?.categorySubId });
    }

    if (filter?.published_date !== undefined) {
      query.andWhere({ published_date: filter?.published_date });
    }

    if (filter?.title !== undefined) {
      query.andWhere({ title: filter?.title });
    }

    const documentList = await query;

    return {
      data: documentList.map(item => {
        return {
          ...item,
        };
      }),
      pagination: {
        total: documentList.length,
        size: documentList.length,
        current: pagination.page,
      },
    };
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
