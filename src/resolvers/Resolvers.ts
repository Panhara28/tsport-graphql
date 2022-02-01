import { ApplicationByUserList } from './Admin/Application/Query/ApplicationByUserList';
import { AdminAssignRoleToUserMutation } from './Admin/Role/Mutation/AdminAssignRoleToUserMutation';
import { AdminHasRoleQuery } from './Admin/Role/Query/AdminHasRoleQuery';
import { AdminRoleListQuery } from './Admin/Role/Query/AdminRoleListQuery';
import { UserListQuery } from './Admin/User/Query/UserListQuery';
import { UserQuery } from './Admin/User/Query/UserQuery';
import { SignInMutation } from './Authentication/Mutation/SignInMutation';
import { SignInSuperAdminMutation } from './Authentication/Mutation/SignInSuperAdminMutation';
import { SignOutMutation } from './Authentication/Mutation/SignOutMutation';
import { SignOutSuperAdminMutation } from './Authentication/Mutation/SignOutSuperAdminMutation';
import { AdminMeQuery } from './Authentication/Query/AdminMeQuery';
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
import { InstallPluginToUserMutation } from './SuperAdministrator/Website/Mutation/InstallPluginToUserMutation';
import { AssignRoleToUserMutation } from './SuperAdministrator/Website/Mutation/AssignRoleToUserMutation';
import { CreateWebsiteMutation } from './SuperAdministrator/Website/Mutation/CreateWebsiteMutation';
import { RemovePeopleFromWebsiteMutation } from './SuperAdministrator/Website/Mutation/RemovePeopleFromWebsiteMutation';
import { UninstallPluginToWebsiteMutation } from './SuperAdministrator/Website/Mutation/UninstallPluginToWebsiteMutation';
import { UpdateWebsiteMutation } from './SuperAdministrator/Website/Mutation/UpdateWebsiteMutation';
import { AddedPeopleListQuery } from './SuperAdministrator/Website/Query/AddedPeopleQuery';
import { InstalledPluginQuery } from './SuperAdministrator/Website/Query/InstalledPluginQuery';
import { WebsiteListQuery } from './SuperAdministrator/Website/Query/WebsiteListQuery';
import { WebsiteQuery } from './SuperAdministrator/Website/Query/WebsiteQuery';
import { NewsListQuery } from './Admin/Plugins/News/Query/NewsListQuery';
import { NewsDetailQuery } from './Admin/Plugins/News/Query/NewsDetailQuery';
import { NewsCategoryListQuery } from './Admin/Plugins/NewsCategory/Query/NewsCategoryListQuery';
import { NewsCateogryDetailQuery } from './Admin/Plugins/NewsCategory/Query/NewsCategoryDetailQuery';
import { PublicNewsListQuery } from './Admin/Plugins/News/Query/PublicNewsListQuery';
import { PublicNewsDetailQuery } from './Admin/Plugins/News/Query/PublicNewsDetailQuery';
import { CreateNewsMutation } from './Admin/Plugins/News/Mutation/CreateNewsMutation';
import { UpdateNewsMuation } from './Admin/Plugins/News/Mutation/UpdateNewsMutation';
import { UpdateNewsStatusMutation } from './Admin/Plugins/News/Mutation/UpdateNewsStatusMutation';
import { CreateNewsCategoryMutation } from './Admin/Plugins/NewsCategory/Mutation/CreateNewsCategoryMutation';
import { UpdateNewsCategoryMutation } from './Admin/Plugins/NewsCategory/Mutation/UpdateNewsCategoryMutation';
import { UploadResolver } from './Upload/Mutation/UploadResolver';
import { PublicNewsCategoryListQuery } from './Admin/Plugins/NewsCategory/Query/PublicNewsCategoryListQuery';
import { CreateUserMutation } from './Admin/User/Mutation/CreateUserMutation';
import { UpdateUserMutation } from './Admin/User/Mutation/UpdateUserMutation';

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
      adminHasRole: AdminHasRoleQuery,
      newsList: NewsListQuery,
      newsDetail: NewsDetailQuery,
      newsCategoryList: NewsCategoryListQuery,
      newsCategoryDetail: NewsCateogryDetailQuery,
      publicNewsList: PublicNewsListQuery,
      publicNewsDetail: PublicNewsDetailQuery,
      publicNewsCategoryList: PublicNewsCategoryListQuery,
    },

    Mutation: {
      testing: () => {
        return true;
      },
      singleUpload: UploadResolver,
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
      adminAssignRoleToUser: AdminAssignRoleToUserMutation,
      installPluginToUser: InstallPluginToUserMutation,
      createNews: CreateNewsMutation,
      updateNews: UpdateNewsMuation,
      updateNewsStatus: UpdateNewsStatusMutation,
      createNewsCategory: CreateNewsCategoryMutation,
      updateNewsCategory: UpdateNewsCategoryMutation,
      createUser: CreateUserMutation,
      updateUser: UpdateUserMutation,
    },
  },
];

export default AppResolver;
