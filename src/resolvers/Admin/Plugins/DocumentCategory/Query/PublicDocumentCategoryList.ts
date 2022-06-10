import { AuthenticationError } from 'apollo-server';
import { ChildrenCategory } from 'src/dataloader/childrenCategory';
import { DocumentLoader } from 'src/dataloader/documentLoader';
import { buildTree } from 'src/function/buildTree';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const PublicDocumentCategoryList = async (
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
    const documents = DocumentLoader(ctx);
    let tree;

    if (filter?.brand_id) {
      tree = await buildTree(data, filter?.brand_id, documents);
    } else {
      tree = await buildTree(data, _, documents);
    }

    if (filter?.branch_level || filter?.branch_level === 0) {
      tree = tree.children;
    } else if (filter?.branch_level === 1) {
      const new_tree: any[] = [];

      for (const branch of tree.children) {
        new_tree.push(...branch.children);
      }

      tree = new_tree;
    } else if (filter?.branch_level === 2) {
      const new_tree: any[] = [];
      for (const branch of tree.children) {
        for (const child_branch of branch.children) {
          new_tree.push(...child_branch.children);
        }
      }
      tree = new_tree;
    }

    return tree;
  } else {
    throw new AuthenticationError(`You don't have permission!`);
  }
};
