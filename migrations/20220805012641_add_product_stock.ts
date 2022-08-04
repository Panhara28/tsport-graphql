import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('product_stock'))) {
    return await knex.schema.createTable('product_stock', function(table) {
      table.increments();
      table.string('barcode');
      table.integer('product_id');
      table.string('color');
      table.string('size');
      table.string('image');
      table.integer('stock').defaultTo(0);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
