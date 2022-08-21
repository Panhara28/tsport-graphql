import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import { AddressRepository } from 'src/repository/Customer/AddressRepository';

export async function CreateCustomerAddressResolver(
  _,
  { data }: { data: Graph.CustomerAddressInput },
  ctx: ContextType,
) {
  const customer = ctx.authCustomer;
  const address = new AddressRepository(ctx.knex.default);

  await address.addCustomerAddress(customer.id, data);

  return true;
}
