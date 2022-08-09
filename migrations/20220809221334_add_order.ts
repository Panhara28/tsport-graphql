import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('orders'))) {
    return await knex.schema.createTable('orders', function(table) {
      table.increments();
      table.integer('customer');
      table.integer('qty');
      table.decimal('discount');
      table.decimal('amount');
      table.decimal('total');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
