import { table_product_category } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';
import { LoadCategoryParent } from '.';

export async function CategoryListResolver(_: any, {}, ctx: ContextType) {
  const items = await ctx.dataSources.category.getCategoryList();

  return items.length === 0
    ? []
    : items
        .filter(item => item.parent === 0)
        .map(item => {
          return {
            ...item,
            parents: LoadCategoryParent(item.id, items as table_product_category[]),
          };
        });
}
