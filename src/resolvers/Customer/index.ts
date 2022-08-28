import { table_customer_address } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';
import { AddressRepository } from 'src/repository/Customer/AddressRepository';
import { CreateCustomerAddressResolver } from './Address/CreateCustomerAddressResolver';
import {
  deleteCustomerAddress,
  SetDefaultAddress,
  UpdateCustomerAddressResolver,
} from './Address/UpdateCustomerAddressResolver';
import { ChangePasswordCustomerResolver } from './ChangePasswordCustomerResolver';
import { CreateCustomerResolver } from './CreactCustomerResolver';
import { CustomerByIdResolver } from './CustomerByIdResolver';
import { CustomerListResolver } from './CustomerListResolver';
import { LoginCustomerResolver } from './LoginCustomerResolver';
import { UpdateCustomerResolver } from './UpdateCustomerResolver';

export async function getCustomer(_: any, {}, ctx: ContextType) {
  const knex = ctx.knex.default;
  const customer = ctx.authCustomer;

  if (!customer) {
    return null;
  }

  const address: table_customer_address[] = await knex.table('customer_address').where({ customer_id: customer.id });

  return {
    id: customer.id,
    name: customer.display,
    email: '',
    profile: {
      id: 0,
      avatar: {
        id: 0,
        thumbnail: customer.profile,
        original: customer.profile,
      },
      bio: '',
      socials: [
        {
          type: '',
          link: '',
        },
      ],
      contact: customer.phone,
    },
    address: AddressRepository.map(address),
    wallet: {
      id: 0,
      total_points: 0,
      points_used: 0,
      available_points: 0,
    },
    type: customer.type,
    discount: customer.discount,
  };
}

export const CustomerResolver = {
  Query: {
    customer: getCustomer,
    customerList: CustomerListResolver,
    customerById: CustomerByIdResolver,
  },
  Mutation: {
    createCustomer: CreateCustomerResolver,
    changePasswordCustomer: ChangePasswordCustomerResolver,
    updateCustomer: UpdateCustomerResolver,
    login: LoginCustomerResolver,
    createCustomerAddress: CreateCustomerAddressResolver,
    updateCustomerAddress: UpdateCustomerAddressResolver,
    deleteCustomerAddress: deleteCustomerAddress,
    setDefaultAddress: SetDefaultAddress,
  },
};
