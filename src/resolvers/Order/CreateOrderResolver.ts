import ContextType from 'src/graphql/ContextType';
import md5 from 'md5';
import { ApolloError } from 'apollo-server-core';
import { table_customers } from 'src/generated/tables';

export async function CreateOrderResolver(_: any, { data, customerId, address }: any, ctx: ContextType) {
  const datasources = ctx.dataSources;

  if (!customerId && !ctx.authCustomer) {
    throw new ApolloError('Undefind customer');
  }

  const input: any[] = [];

  for (const x of data) {
    const product = await datasources.product.getProduct(x.productId);
    const sku = await datasources.sku.getSku(x.skuId, x.productId);

    if (!product) {
      throw new ApolloError('Undefind product: ' + x.productId);
    }

    if (!sku) {
      throw new ApolloError('Undefind sku: ' + x.skuId);
    }

    if (product && sku) {
      input.push({
        productId: product.id,
        skuId: sku.id,
        color: sku.color,
        size: sku.size,
        status: 0,
        qty: x.qty,
        order_uuid: md5(product.id + sku.id + new Date()),
        customerId: customerId ? customerId : ctx.authCustomer.id,
        discount: x.discountPrice,
        price: x.price,
      });
    }
  }

  await datasources.order.createOrder(input, address);

  return true;
}
