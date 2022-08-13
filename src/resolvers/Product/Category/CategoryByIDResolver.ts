import { table_product_category } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';
import { LoadCategoryParent } from '.';

export async function CategoryByIDResolver(_: any, { id }: { id: number }, ctx: ContextType) {
  const items = await ctx.dataSources.category.getCategoryList();
  const item = items.find(x => x.id === id);

  return {
    ...item,
    src: item.image,
    parents: LoadCategoryParent(item.id, items as table_product_category[]),
  };
}
