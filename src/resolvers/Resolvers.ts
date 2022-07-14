import { AdminAssignRoleToUserMutation } from './Admin/Role/Mutation/AdminAssignRoleToUserMutation';
import { AdminHasRoleQuery } from './Admin/Role/Query/AdminHasRoleQuery';
import { AdminRoleListQuery } from './Admin/Role/Query/AdminRoleListQuery';
import { SignInMutation } from './Authentication/Mutation/SignInMutation';
import { SignInSuperAdminMutation } from './Authentication/Mutation/SignInSuperAdminMutation';
import { SignOutMutation } from './Authentication/Mutation/SignOutMutation';
import { SignOutSuperAdminMutation } from './Authentication/Mutation/SignOutSuperAdminMutation';
import { AdminMeQuery } from './Authentication/Query/AdminMeQuery';
import { MeQuery } from './Authentication/Query/MeQuery';
import { CreateRoleMutation } from './SuperAdministrator/Role/Mutation/CreateRoleMutation';
import { UpdateRoleMutation } from './SuperAdministrator/Role/Mutation/UpdateRoleMutation';
import { HasRoleQuery } from './SuperAdministrator/Role/Query/HasRoleQuery';
import { RoleListQuery } from './SuperAdministrator/Role/Query/RoleListQuery';
import { CreateSuperAdminMutation } from './SuperAdministrator/SuperAdmin/Mutation/CreateSuperAdminMutation';
import { UpdateSuperAdminMutation } from './SuperAdministrator/SuperAdmin/Mutation/UpdateSuperAdminMutation';
import { UploadResolver } from './Upload/Mutation/UploadResolver';
import { RoleDetailQuery } from './SuperAdministrator/Role/Query/RoleDetailQuery';
import { RoleManageAccessMutation } from './SuperAdministrator/Role/Mutation/RoleManageAccessMutation';
import { UserListQuery } from './SuperAdministrator/User/Query/UserListQuery';
import { UserQuery } from './SuperAdministrator/User/Query/UserQuery';
import { CreateUserMutation } from './SuperAdministrator/User/Mutation/CreateUserMutation';
import { UpdateUserMutation } from './SuperAdministrator/User/Mutation/UpdateUserMutation';
import { AdminCreateUserMutation } from './Admin/User/Mutation/AdminCreateUserMutation';
import { AdminUpdateUserMutation } from './Admin/User/Mutation/AdminUpdateUserMutation';
import { AdminUserListQuery } from './Admin/User/Query/AdminUserListQuery';
import { AdminUserDetailQuery } from './Admin/User/Query/AdminUserDetailQuery';
import { AdminAddPeopleToWebsiteMutation } from './Admin/Website/Mutation/AdminAddPeopleToWebsiteMutation';
import { AdminPluginManageAccessForUser } from './Admin/Website/Mutation/AdminPluginManageAccessForUser';
import { ActivityLogsListQuery } from './Admin/ActivityLog/Query/ActivityLogsListQuery';
import { ActivityLogsNewsQuery } from './Admin/ActivityLog/Query/ActivityLogsNewsQuery';
import { ActivityLogsOptionsQuery } from './Admin/ActivityLog/Query/ActivityLogsOptionsQuery';
import { PlaygroundListQuery } from './Playground/Query/PlaygroundListQuery';
import { CreatePlaygrounMutation } from './Playground/Mutation/CreatePlaygroundMutation';
import { ChangePasswordMutation } from './Authentication/Mutation/ChangePasswordMutation';

const AppResolver = [
  {
    Query: {
      testing: () => {
        return 'Hello World';
      },
      me: MeQuery,
      adminMe: AdminMeQuery,
      superAdminList: UserListQuery,
      superAdmin: UserQuery,
      roleList: RoleListQuery,
      userList: UserListQuery,
      userDetail: UserQuery,
      adminRoleList: AdminRoleListQuery,
      hasRole: HasRoleQuery,
      adminHasRole: AdminHasRoleQuery,
      roleDetail: RoleDetailQuery,
      adminUserList: AdminUserListQuery,
      adminUserDetail: AdminUserDetailQuery,
      activityLogsList: ActivityLogsListQuery,
      activityLogsNews: ActivityLogsNewsQuery,
      activityLogsOptions: ActivityLogsOptionsQuery,
      playgroundList: PlaygroundListQuery,
    },

    Mutation: {
      testing: () => {
        return true;
      },
      createPlayground: CreatePlaygrounMutation,
      singleUpload: UploadResolver,
      createSuperAdmin: CreateSuperAdminMutation,
      updateSuperAdmin: UpdateSuperAdminMutation,
      createRole: CreateRoleMutation,
      updateRole: UpdateRoleMutation,
      signInSuperAdmin: SignInSuperAdminMutation,
      signOutSuperAdmin: SignOutSuperAdminMutation,
      signIn: SignInMutation,
      signOut: SignOutMutation,
      createUser: CreateUserMutation,
      updateUser: UpdateUserMutation,
      roleManageAccess: RoleManageAccessMutation,
      adminCreateUser: AdminCreateUserMutation,
      adminUpdateUser: AdminUpdateUserMutation,
      changePassword: ChangePasswordMutation,
    },
  },
];

export default AppResolver;
