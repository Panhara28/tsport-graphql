import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('notifications'))) {
    return await knex.schema.createTable('notifications', field => {
      field.increments();
      field.string('name');
      field.integer('website_id');
      field.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
