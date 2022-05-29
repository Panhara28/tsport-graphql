import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('website_user_details'))) {
    return await knex.schema.createTable('website_user_details', function(table) {
      table.increments();
      table.integer('super_admin_id');
      table.integer('website_id');
      table.integer('user_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
