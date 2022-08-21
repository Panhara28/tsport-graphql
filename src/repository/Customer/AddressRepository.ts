import { Graph } from 'src/generated/graph';
import { table_customer_address } from 'src/generated/tables/table_customer_address';
import BaseRepository from '../BaseRepository';

export class AddressRepository extends BaseRepository<any> {
  tableName = 'customer_address';

  async addCustomerAddress(customerId: number, data: Graph.CustomerAddressInput) {
    const address = await this.tx
      .table(this.tableName)
      .where({ customer_id: customerId, default: true })
      .first();

    return await this.tx.table(this.tableName).insert({
      customer_id: customerId,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      default: address ? false : true,
    });
  }

  async editCustomerAddress(customerId: number, addressId: number, data: Graph.CustomerAddressInput) {
    return await this.tx
      .table(this.tableName)
      .where({ customer_id: customerId, address_id: addressId })
      .update({
        customer_id: customerId,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
      });
  }

  async deleteCustomerAddress(customerId: number, addressId: number) {
    return await this.tx
      .table(this.tableName)
      .where({ customer_id: customerId, id: addressId })
      .delete();
  }

  async setDefaultAddress(customerId: number, addressId: number) {
    this.tx.transaction(async tx => {
      await tx(this.tableName)
        .where({ customer_id: customerId })
        .update({ default: false });

      await tx(this.tableName)
        .where({ customer_id: customerId, id: addressId })
        .update({ default: true });
    });

    return true;
  }

  static map(customer_address: table_customer_address[]) {
    return customer_address.map(address => {
      return {
        id: address.id,
        title: address.address,
        default: address.default,
        type: 'SHIPPING',
        address: {
          country: '',
          city: '',
          state: '',
          zip: '',
          street_address: '',
        },
      };
    });
  }
}
