import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const CreateHrEmployeeMutation = async (_, { input }: { input: Graph.HrEmployeeInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  const hash = await bcrypt.hashSync(input?.password, 12);
  const admin_id = await ctx.authUser.user.id;

  const [hrEmployee] = await knex.table('hr_employees').insert({
    username: input?.username,
    fullname: input?.fullname,
    password: input?.password ? hash : undefined,
    fullname_en: input?.fullname_en,
    profile: input?.profile,
    phoneNumber: input?.phoneNumber,
    email: input?.email,
    gender: input?.gender,
    nationality: input?.nationality,
    dob: input?.dob,
    district: input?.district,
    commune: input?.commune,
    education_level: input?.education_level,
    passport_id: input?.passport_id,
    national_id: input?.national_id,
    position_level: input?.position_level,
    position_description: input?.position_description,
    unit: input?.unit,
    department_id: input?.department_id,
    general_department_id: input?.general_department_id,
    contact_city_or_province: input?.contact_city_or_province,
    province: input?.province,
    homeNo: input?.homeNo,
    streetNo: input?.streetNo,
    village_or_group: input?.village_or_group,
    contact_district: input?.contact_district,
    contact_village: input?.contact_village,
    contact_commune: input?.contact_commune,
    officer_id: input?.officer_id,
    office_id: input?.office_id,
  });

  if (hrEmployee) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'HR_EMPLOYEE',
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }','activityType': 'create_hr_employee', 'hr_employee_id': '${hrEmployee}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });

    return hrEmployee;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
