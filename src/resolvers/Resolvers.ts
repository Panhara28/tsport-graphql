import { ApplicationByUserList } from './Admin/Application/Query/ApplicationByUserList';
import { AdminRoleListQuery } from './Admin/Role/Query/AdminRoleListQuery';
import { UserListQuery } from './Admin/User/Query/UserListQuery';
import { UserQuery } from './Admin/User/Query/UserQuery';
import { SignInMutation } from './Authentication/Mutation/SignInMutation';
import { SignInSuperAdminMutation } from './Authentication/Mutation/SignInSuperAdminMutation';
import { SignOutMutation } from './Authentication/Mutation/SignOutMutation';
import { SignOutSuperAdminMutation } from './Authentication/Mutation/SignOutSuperAdminMutation';
import { MeQuery } from './Authentication/Query/MeQuery';
import { CreatePluginMutation } from './SuperAdministrator/Plugin/Mutation/CreatePluginMutation';
import { UpdatePluginMutation } from './SuperAdministrator/Plugin/Mutation/UpdatePluginMutation';
import { PluginListQuery } from './SuperAdministrator/Plugin/Query/PluginListQuery';
import { PluginQuery } from './SuperAdministrator/Plugin/Query/PluginQuery';
import { CreateRoleMutation } from './SuperAdministrator/Role/Mutation/CreateRoleMutation';
import { UpdateRoleMutation } from './SuperAdministrator/Role/Mutation/UpdateRoleMutation';
import { HasRoleQuery } from './SuperAdministrator/Role/Query/HasRoleQuery';
import { RoleListQuery } from './SuperAdministrator/Role/Query/RoleListQuery';
import { CreateSuperAdminMutation } from './SuperAdministrator/SuperAdmin/Mutation/CreateSuperAdminMutation';
import { UpdateSuperAdminMutation } from './SuperAdministrator/SuperAdmin/Mutation/UpdateSuperAdminMutation';
import { AddPeopleToWebsiteMutation } from './SuperAdministrator/Website/Mutation/AddPeopleToWebsiteMutation';
import { AddPluginToWebsiteMutation } from './SuperAdministrator/Website/Mutation/AddPluginToWebsiteMutation';
import { AssignRoleToUserMutation } from './SuperAdministrator/Website/Mutation/AssignRoleToUserMutation';
import { CreateWebsiteMutation } from './SuperAdministrator/Website/Mutation/CreateWebsiteMutation';
import { RemovePeopleFromWebsiteMutation } from './SuperAdministrator/Website/Mutation/RemovePeopleFromWebsiteMutation';
import { UninstallPluginToWebsiteMutation } from './SuperAdministrator/Website/Mutation/UninstallPluginToWebsiteMutation';
import { UpdateWebsiteMutation } from './SuperAdministrator/Website/Mutation/UpdateWebsiteMutation';
import { AddedPeopleListQuery } from './SuperAdministrator/Website/Query/AddedPeopleQuery';
import { InstalledPluginQuery } from './SuperAdministrator/Website/Query/InstalledPluginQuery';
import { WebsiteListQuery } from './SuperAdministrator/Website/Query/WebsiteListQuery';
import { WebsiteQuery } from './SuperAdministrator/Website/Query/WebsiteQuery';

const AppResolver = [
  {
    Query: {
      testing: () => {
        return 'Hello World';
      },
      me: MeQuery,
      superAdminList: UserListQuery,
      superAdmin: UserQuery,
      websiteList: WebsiteListQuery,
      website: WebsiteQuery,
      pluginList: PluginListQuery,
      plugin: PluginQuery,
      roleList: RoleListQuery,
      installedPluginList: InstalledPluginQuery,
      addedPeopleList: AddedPeopleListQuery,
      userList: UserListQuery,
      userDetail: UserQuery,
      applicationByUserList: ApplicationByUserList,
      adminRoleList: AdminRoleListQuery,
      hasRole: HasRoleQuery,
    },

    Mutation: {
      testing: () => {
        return true;
      },
      createSuperAdmin: CreateSuperAdminMutation,
      updateSuperAdmin: UpdateSuperAdminMutation,
      createWebsite: CreateWebsiteMutation,
      updateWebsite: UpdateWebsiteMutation,
      createPlugin: CreatePluginMutation,
      updatePlugin: UpdatePluginMutation,
      createRole: CreateRoleMutation,
      updateRole: UpdateRoleMutation,
      addPeopleToWebsite: AddPeopleToWebsiteMutation,
      addPluginToWebsite: AddPluginToWebsiteMutation,
      uninstallPlugin: UninstallPluginToWebsiteMutation,
      signInSuperAdmin: SignInSuperAdminMutation,
      signOutSuperAdmin: SignOutSuperAdminMutation,
      signIn: SignInMutation,
      signOut: SignOutMutation,
      removePeopleFromWebsite: RemovePeopleFromWebsiteMutation,
      assignRoleToUser: AssignRoleToUserMutation,
    },
  },
];

export default AppResolver;
