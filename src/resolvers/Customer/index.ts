import ContextType from 'src/graphql/ContextType';
import { ChangePasswordCustomerResolver } from './ChangePasswordCustomerResolver';
import { CreateCustomerResolver } from './CreactCustomerResolver';
import { CustomerByIdResolver } from './CustomerByIdResolver';
import { CustomerListResolver } from './CustomerListResolver';
import { LoginCustomerResolver } from './LoginCustomerResolver';
import { UpdateCustomerResolver } from './UpdateCustomerResolver';

export const CustomerResolver = {
  Query: {
    customer: (_: any, {}, ctx: ContextType) => ({ ...ctx.authCustomer, fullname: ctx.authCustomer.display }),
    customerList: CustomerListResolver,
    customerById: CustomerByIdResolver,
  },
  Mutation: {
    createCustomer: CreateCustomerResolver,
    changePasswordCustomer: ChangePasswordCustomerResolver,
    loginCustomer: LoginCustomerResolver,
    updateCustomer: UpdateCustomerResolver,
  },
};
