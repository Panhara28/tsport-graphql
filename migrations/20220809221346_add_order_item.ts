import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('order_items'))) {
    return await knex.schema.createTable('order_items', function(table) {
      table.increments();
      table.integer('product_id');
      table.integer('sku_id');
      table.string('color');
      table.string('size');
      table.integer('status');
      table.integer('customer');
      table.json('description_status');
      table.string('note');
      table.string('order_uuid');
      table.decimal('price');
      table.decimal('discount');
      table.decimal('total');
      table.integer('qty');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
