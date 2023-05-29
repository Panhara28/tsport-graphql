import { table_product_category } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';
import { LoadCategoryParent } from '.';

export async function CategoryListResolver(_: any, { nested, active }: any, ctx: ContextType) {
  const knex = ctx.knex.default;

  const query = knex.table('product_category');

  if (active) {
    query.where({ active });
  }

  const items = await query.clone().select();

  if (!nested) {
    return items.length === 0 ? [] : items;
  }

  return items.length === 0
    ? []
    : items
        .filter(item => item.parent === 0)
        .map(item => {
          return {
            ...item,
            src: item.image,
            parents: LoadCategoryParent(item.id, items as table_product_category[]),
            children: LoadCategoryParent(item.id, items as table_product_category[]),
          };
        });
}
