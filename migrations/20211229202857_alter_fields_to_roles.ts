import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('roles', function(field) {
    field.boolean('isCreated').defaultTo(false);
    field.boolean('isModified').defaultTo(false);
    field.boolean('isList').defaultTo(false);
    field.boolean('isDetail').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {}
