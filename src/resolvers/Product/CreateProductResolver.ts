import { generatedID, generatedPrefix } from 'src/generated/id';
import { generateSku } from 'src/generated/sku';
import { table_products, table_product_stock } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export async function CreateProductResolver(_: any, { data }: any, ctx: ContextType): Promise<boolean> {
  const knex = ctx.knex.default;

  const transaction = await knex.transaction(async tx => {
    const product = await tx.table<table_products>('products').insert({
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
    });

    if (product[0] > 0) {
      const sku = generateSku((data.color as string).split(','), (data.size as string).split(','), {
        ...data,
        id: product[0],
      });
      await tx.table<table_product_stock>('product_stock').insert(sku);
    }

    return product[0] > 0 ? true : false;
  });

  return transaction;
}
