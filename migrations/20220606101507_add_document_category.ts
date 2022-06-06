import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('document_category'))) {
    return await knex.schema.createTable('document_category', function(table) {
      table.increments();
      table.string('category_name');
      table.integer('parent_id').defaultTo(0);
      table.integer('website_id');
      table.integer('created_by');
      table.integer('updated_by');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
