import { ChangeOrderStatusResolver } from './ChangeOrderStatusResolver';
import { CreateOrderResolver } from './CreateOrderResolver';
import { OrderListResolver } from './OrderListResolver';

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
