import { buildTree } from 'src/function/buildTree';
import ContextType from 'src/graphql/ContextType';

export const HrDepartmentListQuery = async (_, { branch_level }: { branch_level: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const data = await knex.table('hr_departments');

  let tree;

  tree = buildTree(data);

  if (branch_level === 0) {
    {
      tree = tree?.children?.map((gd: any) => {
        return {
          id: gd?.id,
          name: gd?.name,
          parent_id: 0,
        };
      });
    }
  } else if (branch_level === 1) {
    let new_tree = [];

    for (const branch of tree.children) {
      if (branch?.children?.length > 0) {
        new_tree.push({
          department: [...branch.children],
          parent_id: branch?.id,
        });
      }
    }

    tree = [];
    for (const x of new_tree) {
      for (const y of x?.department) {
        tree.push({
          parent_id: x?.id,
          id: y?.id,
          name: y?.name,
        });
      }
    }
  } else if (branch_level === 2) {
    let new_tree = [];

    for (const branch of tree.children) {
      for (const child_branch of branch.children) {
        if (child_branch?.children?.length > 0) {
          new_tree.push({
            department: [...child_branch.children],
            parent_id: child_branch?.id,
          });
        }
      }
    }

    tree = [];
    for (const x of new_tree) {
      for (const y of x?.department) {
        tree.push({
          parent_id: x?.id,
          id: y?.id,
          name: y?.name,
        });
      }
    }
  }

  return tree;
};
