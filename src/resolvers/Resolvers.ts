import { AdminAssignRoleToUserMutation } from './Admin/Role/Mutation/AdminAssignRoleToUserMutation';
import { AdminHasRoleQuery } from './Admin/Role/Query/AdminHasRoleQuery';
import { AdminRoleListQuery } from './Admin/Role/Query/AdminRoleListQuery';
import { SignInMutation } from './Authentication/Mutation/SignInMutation';
import { SignInSuperAdminMutation } from './Authentication/Mutation/SignInSuperAdminMutation';
import { SignOutMutation } from './Authentication/Mutation/SignOutMutation';
import { SignOutSuperAdminMutation } from './Authentication/Mutation/SignOutSuperAdminMutation';
import { AdminMeQuery } from './Authentication/Query/AdminMeQuery';
import { MeQuery } from './Authentication/Query/MeQuery';
import { UploadResolver } from './Upload/Mutation/UploadResolver';
import { AdminCreateUserMutation } from './Admin/User/Mutation/AdminCreateUserMutation';
import { AdminUpdateUserMutation } from './Admin/User/Mutation/AdminUpdateUserMutation';
import { AdminUserListQuery } from './Admin/User/Query/AdminUserListQuery';
import { AdminUserDetailQuery } from './Admin/User/Query/AdminUserDetailQuery';
import { ActivityLogsListQuery } from './Admin/ActivityLog/Query/ActivityLogsListQuery';
import { ActivityLogsNewsQuery } from './Admin/ActivityLog/Query/ActivityLogsNewsQuery';
import { ActivityLogsOptionsQuery } from './Admin/ActivityLog/Query/ActivityLogsOptionsQuery';
import { PlaygroundListQuery } from './Playground/Query/PlaygroundListQuery';
import { CreatePlaygrounMutation } from './Playground/Mutation/CreatePlaygroundMutation';
import { ChangePasswordMutation } from './Authentication/Mutation/ChangePasswordMutation';
import { RoleDetailQuery } from './Admin/Role/Query/RoleDetailQuery';
import { RoleManageAccessMutation } from './Admin/Role/Mutation/RoleManageAccessMutation';
import { HrEmployeeListQuery } from './Admin/HrEmployee/Query/HrEmployeeListQuery';
import { HrEmployeeDetailQuery } from './Admin/HrEmployee/Query/HrEmployeeDetailQuery';
import { CreateHrEmployeeMutation } from './Admin/HrEmployee/Mutation/CreateHrEmployeeMutation';
import { UpdateHrEmployeeMutation } from './Admin/HrEmployee/Mutation/UpdateHrEmployeeMutation';
import { CreateHrDepartmentMutation } from './Admin/HrDepartment/Mutation/CreateHrDepartmentMutation';
import { HrDepartmentListQuery } from './Admin/HrDepartment/Query/HrDepartmentListQuery';
import { UpdateHrDepartmentMutation } from './Admin/HrDepartment/Mutation/UpdateHrDepartmentMutation';
import { HrDepartmentDetailQuery } from './Admin/HrDepartment/Query/HrDepartmentDetailQuery';
import { EmployeeReportQuery } from './Admin/Reports/EmployeeReportQuery';

const AppResolver = [
  {
    Query: {
      testing: () => {
        return 'Hello World';
      },
      me: MeQuery,
      adminMe: AdminMeQuery,
      adminRoleList: AdminRoleListQuery,
      adminHasRole: AdminHasRoleQuery,
      adminUserList: AdminUserListQuery,
      adminUserDetail: AdminUserDetailQuery,
      activityLogsList: ActivityLogsListQuery,
      activityLogsNews: ActivityLogsNewsQuery,
      activityLogsOptions: ActivityLogsOptionsQuery,
      playgroundList: PlaygroundListQuery,
      roleDetail: RoleDetailQuery,
      hrEmployeeList: HrEmployeeListQuery,
      hrEmployee: HrEmployeeDetailQuery,
      hrDepartmentList: HrDepartmentListQuery,
      hrDepartment: HrDepartmentDetailQuery,
      employeeReport: EmployeeReportQuery,
    },

    Mutation: {
      testing: () => {
        return true;
      },
      createPlayground: CreatePlaygrounMutation,
      singleUpload: UploadResolver,
      signInSuperAdmin: SignInSuperAdminMutation,
      signOutSuperAdmin: SignOutSuperAdminMutation,
      signIn: SignInMutation,
      signOut: SignOutMutation,
      adminCreateUser: AdminCreateUserMutation,
      adminUpdateUser: AdminUpdateUserMutation,
      changePassword: ChangePasswordMutation,
      adminAssignRoleToUser: AdminAssignRoleToUserMutation,
      roleManageAccess: RoleManageAccessMutation,
      createHrEmployee: CreateHrEmployeeMutation,
      updateHrEmployee: UpdateHrEmployeeMutation,
      createHrDepartment: CreateHrDepartmentMutation,
      updateHrDepartment: UpdateHrDepartmentMutation,
    },
  },
];

export default AppResolver;
