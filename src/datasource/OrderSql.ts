import { SQLDataSource } from 'datasource-sql';
import Knex from 'knex';
import { generatedID, generatedPrefix } from 'src/generated/id';

interface OrderCart {
  productId: number;
  skuId: number;
  qty: number;
  price: number;
  discount: number;
  customerId: number;
  color: string;
  size: string;
  order_uuid: string;
  status: number;
}

export class OrderSql extends SQLDataSource {
  knex: Knex;

  constructor(config: any) {
    super(config);
    this.knex = Knex(config);
  }

  async createOrder(data: OrderCart[], address: string) {
    const order = data.reduce(
      (a, b) => {
        const amt = Number(b.price * b.qty);
        const total = amt - b.discount;
        return {
          qty: a.qty + b.qty,
          discount: a.discount + b.discount,
          amount: a.amount + amt,
          total: a.total + total,
        };
      },
      { qty: 0, discount: 0, amount: 0, total: 0 },
    );

    this.knex.transaction(async tx => {
      const o = await tx.table('orders').insert({
        customer: data[0].customerId,
        address,
        ...order,
        delivery_fee: 0,
      });

      if (o[0]) {
        const dataInput = data.map(x => {
          return {
            order_id: o[0],
            description_status: JSON.stringify([
              { status: 0, date: new Date(), descripition: 'Product in order received' },
            ]),
            product_id: x.productId,
            sku_id: x.skuId,
            color: x.color,
            size: x.size,
            status: x.status,
            customer: x.customerId,
            order_uuid: generatedID(8) + new Date().getTime(),
            qty: x.qty,
            discount: x.discount,
            amount: x.qty * x.price,
            total: Number(x.qty * x.price) - x.discount,
            order_received_date: new Date(),
            price: Number(x.price),
          };
        });

        await tx.table('order_items').insert(dataInput);

        for (const x of dataInput) {
          await tx
            .table('products')
            .where({ id: x.product_id })
            .decrement('stock', x.qty);

          await tx
            .table('product_stock')
            .where({ id: x.sku_id })
            .decrement('stock', x.qty);
        }
      }
    });
  }
}
