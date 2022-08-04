import { CreateCustomerResolver } from './CreactCustomerResolver';

export const CustomerResolver = {
  Query: {},
  Mutation: {
    createCustomer: CreateCustomerResolver,
    changePasswordCustomer: () => {},
    loginCustomer: () => {},
  },
};
