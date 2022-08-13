import { generatedID, generatedPrefix } from 'src/generated/id';
import { generateSku } from 'src/generated/sku';
import { table_products, table_product_stock } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export async function UpdateProductResolver(_: any, { id, data }: any, ctx: ContextType): Promise<boolean> {
  const knex = ctx.knex.default;

  const transaction = await knex.transaction(async tx => {
    const product = await tx
      .table<table_products>('products')
      .where({ id })
      .update({
        title: data.title,
        code: data.code
          ? data.code
          : generatedPrefix(new Date().getTime() as number, data.title).toUpperCase() + generatedID(8).toUpperCase(),
        description: data.description,
        price: data.price,
        discount: data.discount,
        color: data.color,
        size: data.size,
        category: data.category,
        stock: (data.picture as any[]).reduce((a, b) => a + Number(b.stock), 0),
        unit: data.unit,
        picture: data.picture.find((x: any) => !!x.isMain).name,
        published: true,
        images: data.images,
      });

    if (product) {
      const sku = generateSku((data.color as string).split(','), (data.size as string).split(','), { ...data, id });

      const newSku = sku.filter(x => !x.id);
      const oldSku = sku.filter(x => Number(x.id) > 0);

      if (newSku.length > 0) {
        await tx.table<table_product_stock>('product_stock').insert(sku);
      }

      if (oldSku.length > 0) {
        for (const old of oldSku) {
          await tx
            .table<table_product_stock>('product_stock')
            .where({ id: old.id })
            .update(old);
        }
      }
    }

    return product ? true : false;
  });

  return transaction;
}
