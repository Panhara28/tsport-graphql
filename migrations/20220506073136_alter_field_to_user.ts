import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table('users', function(table) {
    table.string('fullname_en');
    table.enum('gender', ['MALE', 'FEMALE']);
    table.string('nationality');
    table.string('dob');
    table.string('homeNo');
    table.string('streetNo');
    table.string('email');
    table.string('contact_district');
    table.string('contact_commune');
    table.string('contact_village');
    table.string('contact_city_or_province');
    table.string('profile_picture');
  });
}

export async function down(knex: Knex): Promise<void> {}
