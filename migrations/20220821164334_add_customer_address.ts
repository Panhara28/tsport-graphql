import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('customer_address'))) {
    return await knex.schema.createTable('customer_address', function(table) {
      table.increments();
      table.integer('customer_id');
      table.string('address');
      table.string('lat');
      table.string('lng');
      table.timestamps(true, true);
      table.boolean('default').defaultTo(false);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
