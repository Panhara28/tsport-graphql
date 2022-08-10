/* eslint-disable @typescript-eslint/no-var-requires */
import * as Knex from 'knex';

const set = require('./setting.json');

export async function seed(knex: Knex): Promise<void> {
  const data = [
    { label: 'siteTitle', value: set['siteTitle'] },
    { label: 'siteSubtitle', value: set['siteSubtitle'] },
    { label: 'currency', value: set['currency'] },
    { label: 'useOtp', value: set['useOtp'] },
    { label: 'taxClass', value: set['taxClass'] },
    { label: 'shippingClass', value: set['shippingClass'] },
    { label: 'google', value: set['google'] },
    { label: 'facebook', value: set['facebook'] },
  ];

  // Deletes ALL existing entries
  await knex('settings').del();
  // Inserts seed entries
  await knex('settings').insert(data);
}
