import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('documents'))) {
    return await knex.schema.createTable('documents', function(table) {
      table.increments();
      table.string('title');
      table.integer('document_category_id');
      table.integer('document_category_sub_id');
      table.dateTime('published_date');
      table.string('file_url');
      table.enum('status', ['PENDING', 'INREVIEW', 'REVERSION', 'PUBLISHED']);
      table.integer('website_id');
      table.integer('created_by');
      table.integer('updated_by');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
