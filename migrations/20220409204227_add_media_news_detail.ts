import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('media_news_detail'))) {
    return await knex.schema.createTable('media_news_detail', function(table) {
      table.increments();
      table.string('news_id');
      table.integer('media_id');
      table.integer('created_by');
      table.integer('updated_by');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
