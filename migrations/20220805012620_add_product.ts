import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('products'))) {
    return await knex.schema.createTable('products', function(table) {
      table.increments();
      table.string('title');
      table.string('code');
      table.string('description');
      table.decimal('price');
      table.decimal('discount');
      table.integer('stock').defaultTo(0);
      table.string('color');
      table.string('size');
      table.string('unit');
      table.string('picture');
      table.integer('category');
      table.integer('created_by').defaultTo(0);
      table.boolean('published').defaultTo(false);
      table.timestamps(true, true);
      table.text('images');
      table.decimal('price_hold_sale');
      table.decimal('price_premium');
      table.decimal('discount_hold_sale');
      table.decimal('discount_premium');
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
