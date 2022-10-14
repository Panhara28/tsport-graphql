/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { AdminAssignRoleToUserMutation } from './Admin/Role/Mutation/AdminAssignRoleToUserMutation';
import { AdminHasRoleQuery } from './Admin/Role/Query/AdminHasRoleQuery';
import { AdminRoleListQuery } from './Admin/Role/Query/AdminRoleListQuery';
import { SignInMutation } from './Authentication/Mutation/SignInMutation';
import { SignInSuperAdminMutation } from './Authentication/Mutation/SignInSuperAdminMutation';
import { SignOutMutation } from './Authentication/Mutation/SignOutMutation';
import { SignOutSuperAdminMutation } from './Authentication/Mutation/SignOutSuperAdminMutation';
import { AdminMeQuery } from './Authentication/Query/AdminMeQuery';
import { MeQuery } from './Authentication/Query/MeQuery';
import { upload, UploadResolver } from './Upload/Mutation/UploadResolver';
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
import { GenderDashbaordCountQuery } from './Admin/Dashboard/Query/GenderDashboardCountQuery';
import { CustomerResolver, getCustomer } from './Customer';
import { ProductResolver } from './Product';
import { CategoryResolver } from './Product/Category';
import { BannerResolver } from './Banner';
import { OrderResolver } from './Order';
import { SettingResolver } from './Setting';
import { ProductPublish } from './Publish/ProductPublish';
import { CustomerPublish } from './Publish/CustomerPublish';
import { UserPublish } from './Publish/UserPublish';
import ContextType from 'src/graphql/ContextType';
import { SummaryReport } from './Report/SummaryReport';
import { OrderReport } from './Report/OrderReport';

const AppResolver = [
  {
    Query: {
      testing: () => {
        return 'Hello World';
      },
      me: getCustomer,
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
      genderDashboardCount: GenderDashbaordCountQuery,
      summaryReport: SummaryReport,
      orderReport: OrderReport,
    },

    Mutation: {
      testing: () => {
        return true;
      },
      createPlayground: CreatePlaygrounMutation,
      singleUpload: UploadResolver,
      upload,
      signInSuperAdmin: SignInSuperAdminMutation,
      signOutSuperAdmin: SignOutSuperAdminMutation,
      signIn: SignInMutation,
      signOut: SignOutMutation,
      adminCreateUser: AdminCreateUserMutation,
      adminUpdateUser: AdminUpdateUserMutation,
      changePassword: ChangePasswordMutation,
      adminAssignRoleToUser: AdminAssignRoleToUserMutation,
      roleManageAccess: RoleManageAccessMutation,
      publishProduct: ProductPublish,
      publishCustomer: CustomerPublish,
      publishUser: UserPublish,
    },
  },
  CustomerResolver,
  ProductResolver,
  CategoryResolver,
  BannerResolver,
  OrderResolver,
  SettingResolver,
];

export default AppResolver;
