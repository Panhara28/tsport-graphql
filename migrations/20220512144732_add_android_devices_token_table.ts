import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('android_devices_token'))) {
    await knex.schema.createTable('android_devices_token', field => {
      field.increments();
      field.string('devices_token');
      field.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
