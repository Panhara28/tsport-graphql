import { table_product_category } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export async function UpdateCategoryResolver(_: any, { id, data }, ctx: ContextType): Promise<boolean> {
  const knex = ctx.knex.default;

  if ((data.parent as number) > 0) {
    const category = await knex.table<table_product_category>('product_category').where({ id: data.parent as number });
    if (!category) {
      return false;
    }
  }

  const item = await knex
    .table<table_product_category>('product_category')
    .where({ id })
    .first();

  if (item) {
    if (item.parent === 0) {
      return false;
    }
  }

  const update = await knex
    .table<table_product_category>('product_category')
    .where({ id })
    .update({
      name: data.name,
      parent: data.parent,
      image: data.src,
    });

  return update ? true : false;
}
