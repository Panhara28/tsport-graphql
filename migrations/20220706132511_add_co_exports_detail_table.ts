import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('co_exports_detail'))) {
    return await knex.schema.createTable('co_exports_detail', table => {
      table.increments();
      table.string('year');
      table.string('month');
      table.string('destination_country');
      table.string('hs_code');
      table.string('unit');
      table.double('quantity');
      table.double('fob_value_usd');
      table.string('form_type');
      table.integer('co_exports_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
