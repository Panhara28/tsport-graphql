import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('activity_log'))) {
    return await knex.schema.createTable('activity_log', field => {
      field.increments();
      field.string('type');
      field.json('activity');
      field.integer('user_id');
      field.integer('news_id');
      field.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
