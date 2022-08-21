import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('customer_phone'))) {
    return await knex.schema.createTable('customer_phone', function(table) {
      table.increments();
      table.integer('customer_id');
      table.string('phone');
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
