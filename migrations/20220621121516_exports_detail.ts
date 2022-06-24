import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('exports_detail'))) {
    return await knex.schema.createTable('exports_detail', table => {
      table.increments();
      table.string('year');
      table.string('month');
      table.string('destination_country');
      table.string('hs_code');
      table.string('net_weight_kgm');
      table.string('supplementary_unit');
      table.string('quantity');
      table.double('custom_value_khr');
      table.double('custom_value_usd');
      table.string('type');
      table.string('hs2_code');
      table.string('hs4_code');
      table.string('hs6_code');
      table.integer('exports_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}