import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import { AddressRepository } from 'src/repository/Customer/AddressRepository';

export async function UpdateCustomerAddressResolver(
  _,
  { id, data }: { id: number; data: Graph.CustomerAddressInput },
  ctx: ContextType,
) {
  const customer = ctx.authCustomer;
  const address = new AddressRepository(ctx.knex.default);

  await address.editCustomerAddress(customer.id, id, data);

  return true;
}

export async function SetDefaultAddress(_, { id }: { id: number }, ctx: ContextType) {
  const customer = ctx.authCustomer;
  const address = new AddressRepository(ctx.knex.default);

  await address.setDefaultAddress(customer.id, id);

  return true;
}

export async function deleteCustomerAddress(_, { id }: { id: number }, ctx: ContextType) {
  const customer = ctx.authCustomer;
  const address = new AddressRepository(ctx.knex.default);

  await address.deleteCustomerAddress(customer.id, id);

  return true;
}
