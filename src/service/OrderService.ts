import { ApolloError } from 'apollo-server-core';
import Knex from 'knex';
import { Graph } from 'src/generated/graph';
import { table_order_items } from 'src/generated/tables';
import { OrderStatus } from 'src/resolvers/Order';

export class OrderService {
  knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getOrderItem(id: number): Promise<table_order_items> {
    return await this.knex
      .table('order_items')
      .where({ id })
      .first();
  }

  //   ORDER_RECEIVED
  async changeOrderToOrderRecived(id: number) {
    const item = await this.getOrderItem(id);

    if (!item) {
      throw new ApolloError('Order item not found!');
    }

    const status: OrderStatus = item.status || 0;

    if (status === 1 || status === 2) {
      const data: any[] = [...item.description_status];
      data.push({
        status: 0,
        date: new Date(),
        description: 'Order item waiting.',
      });

      await this.knex
        .table('order_items')
        .where({ id })
        .update({ status: 0, order_received_date: new Date(), description_status: JSON.stringify(data) });
    } else {
      throw new ApolloError('Change to order recived only are status in processing or ready delivery');
    }
  }

  // ORDER_PROCESSING
  async changeOrderToOrderProcessing(id: number) {
    const item = await this.getOrderItem(id);

    if (!item) {
      throw new ApolloError('Order item not found!');
    }

    const status: OrderStatus = item.status;
    if (status === 0 || status === 2) {
      const data: any[] = [...item.description_status];
      data.push({
        status: 1,
        date: new Date(),
        description: 'Order item processing.',
      });

      await this.knex
        .table('order_items')
        .where({ id })
        .update({ status: 1, order_processing_date: new Date(), description_status: JSON.stringify(data) });
    } else {
      throw new ApolloError('Change to order processing only are status in waiting or ready delivery');
    }
  }

  // READY_TO_DELIVERY
  async changeOrderToReadyToDelivery(id: number) {
    const item = await this.getOrderItem(id);

    if (!item) {
      throw new ApolloError('Order item not found!');
    }

    const status: OrderStatus = item.status;

    if (status === 1) {
      const data: any[] = [...item.description_status];
      data.push({
        status: 2,
        date: new Date(),
        description: 'Order item ready to delivery.',
      });

      await this.knex
        .table('order_items')
        .where({ id })
        .update({ status: 2, ready_to_delivery_date: new Date(), description_status: JSON.stringify(data) });
    } else {
      throw new ApolloError('Change to order delivery only are status in processing.');
    }
  }

  // ORDER_DELIVERY
  async changeOrderToOrderDelivery(id: number, fee: number) {
    const item = await this.getOrderItem(id);

    if (!item) {
      throw new ApolloError('Order item not found!');
    }

    const status: OrderStatus = item.status;

    if (status === 0 || status === 1 || status === 2) {
      await this.knex
        .table('orders')
        .where({ id: item.order_id })
        .update({ delivery_fee: fee });

      const data: any[] = [...item.description_status];
      data.push({
        status: 3,
        date: new Date(),
        description: 'Order item are delivering.',
      });

      await this.knex
        .table('order_items')
        .where({ order_id: item.order_id })
        .update({ status: 3, order_delivery_date: new Date(), description_status: JSON.stringify(data) });
    } else {
      throw new ApolloError('Change to delivering only are status in wating, processing and ready delivery');
    }
  }

  async changeOrderToPickUp(id: number) {
    const item = await this.getOrderItem(id);

    if (!item) {
      throw new ApolloError('Order item not found!');
    }

    const status: OrderStatus = item.status;

    if (status === 3) {
      const data: any[] = [...item.description_status];
      data.push({
        status: 4,
        date: new Date(),
        description: 'Order item are confirm pick up.',
      });

      await this.knex
        .table('order_items')
        .where({ id })
        .update({ status: 4, pick_up_date: new Date(), description_status: JSON.stringify(data) });
    } else {
      throw new ApolloError('Change to pick up only are status in delivering');
    }
  }

  async changeOrderToReturn(id: number, reason: string) {
    const item = await this.getOrderItem(id);

    if (!item) {
      throw new ApolloError('Order item not found!');
    }

    const status: OrderStatus = item.status;

    if (status === 4) {
      const data: any[] = [...item.description_status];
      data.push({
        status: 5,
        date: new Date(),
        description: 'Order item was returned.',
      });

      this.knex.transaction(async tx => {
        await tx
          .table('order_items')
          .where({ id })
          .update({
            status: 5,
            return_date: new Date(),
            description_status: JSON.stringify(data),
            return_reason: reason,
          });

        await tx
          .table('product_stock')
          .where({ id: item.sku_id })
          .increment('stock', item.qty);

        await tx
          .table('product_stock')
          .where({ id: item.sku_id })
          .increment('qty', item.qty);

        await tx
          .table('products')
          .where({ id: item.product_id })
          .increment('stock', item.qty);

        await tx
          .table('products')
          .where({ id: item.product_id })
          .increment('qty', item.qty);
      });
    } else {
      throw new ApolloError('Change to return only are status in pick up');
    }
  }
}
