import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('media'))) {
    return await knex.schema.createTable('media', function(table) {
      table.increments();
      table.string('image_url');
      table.decimal('upload_storage');
      table.string('mimetype');
      table.string('width');
      table.string('height');
      table.integer('website_id');
      table.integer('created_by');
      table.integer('updated_by');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
