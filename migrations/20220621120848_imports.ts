import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('imports'))) {
    return await knex.schema.createTable('imports', table => {
      table.increments();
      table.string('name');
      table.string('referenceFile');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
