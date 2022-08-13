import { ChangeOrderStatusResolver } from './ChangeOrderStatusResolver';
import { CreateOrderResolver } from './CreateOrderResolver';
import { OrderListResolver } from './OrderListResolver';

// About status order
export enum OrderStatus {
  ORDER_RECEIVED = 0, // Status are first create order wating.
  ORDER_PROCESSING = 1, // Status are preparing product order.
  READY_TO_DELIVERY = 2, // Status are wating or delivery.
  ORDER_DELIVERY = 3, // Status are delivering.
  CONFIRM_PICK_UP = 4, // Status customer are received product and pay off.
  RETURN = 5, // Sometime customer request refund for some reason so use status return and give us some reason why return.
}

export const OrderResolver = {
  Mutation: {
    createOrder: CreateOrderResolver,
    changeOrderStatus: ChangeOrderStatusResolver,
  },
  Query: {
    orderList: OrderListResolver,
  },
  OrderStatus: {
    ORDER_RECEIVED: 0,
    ORDER_PROCESSING: 1,
    READY_TO_DELIVERY: 2,
    ORDER_DELIVERY: 3,
    CONFIRM_PICK_UP: 4,
    RETURN: 5,
  },
};
