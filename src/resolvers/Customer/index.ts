import ContextType from 'src/graphql/ContextType';
import { ChangePasswordCustomerResolver } from './ChangePasswordCustomerResolver';
import { CreateCustomerResolver } from './CreactCustomerResolver';
import { CustomerByIdResolver } from './CustomerByIdResolver';
import { CustomerListResolver } from './CustomerListResolver';
import { LoginCustomerResolver } from './LoginCustomerResolver';
import { UpdateCustomerResolver } from './UpdateCustomerResolver';

export async function getCustomer(_: any, {}, ctx: ContextType) {
  const customer = ctx.authCustomer;

  if (!customer) {
    return null;
  }

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
    address: [
      {
        id: 0,
        title: customer.address,
        default: true,
        type: 'SHIPPING',
        address: {
          country: '',
          city: '',
          state: '',
          zip: '',
          street_address: '',
        },
      },
    ],
    wallet: {
      id: 0,
      total_points: 0,
      points_used: 0,
      available_points: 0,
    },
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
  },
};
