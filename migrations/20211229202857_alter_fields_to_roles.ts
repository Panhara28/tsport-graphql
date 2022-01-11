import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('roles', function(field) {
    field.boolean('read').defaultTo(false);
    field.boolean('write').defaultTo(false);
    field.boolean('modified').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {}
