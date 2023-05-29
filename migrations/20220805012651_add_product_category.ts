import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('product_category'))) {
    return await knex.schema.createTable('product_category', function(table) {
      table.increments();
      table.string('name');
      table.integer('parent').defaultTo(0);
      table.integer('created_by').defaultTo(0);
      table.string('image');
      table.boolean('acitve').defaultTo(1);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
