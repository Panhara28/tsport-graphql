"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApplicationByUserList = require("./Admin/Application/Query/ApplicationByUserList");

var _AdminAssignRoleToUserMutation = require("./Admin/Role/Mutation/AdminAssignRoleToUserMutation");

var _AdminHasRoleQuery = require("./Admin/Role/Query/AdminHasRoleQuery");

var _AdminRoleListQuery = require("./Admin/Role/Query/AdminRoleListQuery");

var _SignInMutation = require("./Authentication/Mutation/SignInMutation");

var _SignInSuperAdminMutation = require("./Authentication/Mutation/SignInSuperAdminMutation");

var _SignOutMutation = require("./Authentication/Mutation/SignOutMutation");

var _SignOutSuperAdminMutation = require("./Authentication/Mutation/SignOutSuperAdminMutation");

var _AdminMeQuery = require("./Authentication/Query/AdminMeQuery");

var _MeQuery = require("./Authentication/Query/MeQuery");

var _CreatePluginMutation = require("./SuperAdministrator/Plugin/Mutation/CreatePluginMutation");

var _UpdatePluginMutation = require("./SuperAdministrator/Plugin/Mutation/UpdatePluginMutation");

var _PluginListQuery = require("./SuperAdministrator/Plugin/Query/PluginListQuery");

var _PluginQuery = require("./SuperAdministrator/Plugin/Query/PluginQuery");

var _CreateRoleMutation = require("./SuperAdministrator/Role/Mutation/CreateRoleMutation");

var _UpdateRoleMutation = require("./SuperAdministrator/Role/Mutation/UpdateRoleMutation");

var _HasRoleQuery = require("./SuperAdministrator/Role/Query/HasRoleQuery");

var _RoleListQuery = require("./SuperAdministrator/Role/Query/RoleListQuery");

var _CreateSuperAdminMutation = require("./SuperAdministrator/SuperAdmin/Mutation/CreateSuperAdminMutation");

var _UpdateSuperAdminMutation = require("./SuperAdministrator/SuperAdmin/Mutation/UpdateSuperAdminMutation");

var _AddPeopleToWebsiteMutation = require("./SuperAdministrator/Website/Mutation/AddPeopleToWebsiteMutation");

var _AddPluginToWebsiteMutation = require("./SuperAdministrator/Website/Mutation/AddPluginToWebsiteMutation");

var _InstallPluginToUserMutation = require("./SuperAdministrator/Website/Mutation/InstallPluginToUserMutation");

var _AssignRoleToUserMutation = require("./SuperAdministrator/Website/Mutation/AssignRoleToUserMutation");

var _CreateWebsiteMutation = require("./SuperAdministrator/Website/Mutation/CreateWebsiteMutation");

var _RemovePeopleFromWebsiteMutation = require("./SuperAdministrator/Website/Mutation/RemovePeopleFromWebsiteMutation");

var _UninstallPluginToWebsiteMutation = require("./SuperAdministrator/Website/Mutation/UninstallPluginToWebsiteMutation");

var _UpdateWebsiteMutation = require("./SuperAdministrator/Website/Mutation/UpdateWebsiteMutation");

var _AddedPeopleQuery = require("./SuperAdministrator/Website/Query/AddedPeopleQuery");

var _InstalledPluginQuery = require("./SuperAdministrator/Website/Query/InstalledPluginQuery");

var _WebsiteListQuery = require("./SuperAdministrator/Website/Query/WebsiteListQuery");

var _WebsiteQuery = require("./SuperAdministrator/Website/Query/WebsiteQuery");

var _NewsListQuery = require("./Admin/Plugins/News/Query/NewsListQuery");

var _NewsDetailQuery = require("./Admin/Plugins/News/Query/NewsDetailQuery");

var _NewsCategoryListQuery = require("./Admin/Plugins/NewsCategory/Query/NewsCategoryListQuery");

var _NewsCategoryDetailQuery = require("./Admin/Plugins/NewsCategory/Query/NewsCategoryDetailQuery");

var _PublicNewsListQuery = require("./Admin/Plugins/News/Query/PublicNewsListQuery");

var _PublicNewsDetailQuery = require("./Admin/Plugins/News/Query/PublicNewsDetailQuery");

var _CreateNewsMutation = require("./Admin/Plugins/News/Mutation/CreateNewsMutation");

var _UpdateNewsMutation = require("./Admin/Plugins/News/Mutation/UpdateNewsMutation");

var _UpdateNewsStatusMutation = require("./Admin/Plugins/News/Mutation/UpdateNewsStatusMutation");

var _CreateNewsCategoryMutation = require("./Admin/Plugins/NewsCategory/Mutation/CreateNewsCategoryMutation");

var _UpdateNewsCategoryMutation = require("./Admin/Plugins/NewsCategory/Mutation/UpdateNewsCategoryMutation");

var _UploadResolver = require("./Upload/Mutation/UploadResolver");

var _PublicNewsCategoryListQuery = require("./Admin/Plugins/NewsCategory/Query/PublicNewsCategoryListQuery");

var _PluginManageAccessForUser = require("./SuperAdministrator/Plugin/Mutation/PluginManageAccessForUser");

var _PluginManageAccessForUserQuery = require("./SuperAdministrator/Plugin/Query/PluginManageAccessForUserQuery");

var _RoleDetailQuery = require("./SuperAdministrator/Role/Query/RoleDetailQuery");

var _RoleManageAccessMutation = require("./SuperAdministrator/Role/Mutation/RoleManageAccessMutation");

var _UserListQuery = require("./SuperAdministrator/User/Query/UserListQuery");

var _UserQuery = require("./SuperAdministrator/User/Query/UserQuery");

var _CreateUserMutation = require("./SuperAdministrator/User/Mutation/CreateUserMutation");

var _UpdateUserMutation = require("./SuperAdministrator/User/Mutation/UpdateUserMutation");

var _CreateMediaMutation = require("./Admin/Plugins/Media/Mutation/CreateMediaMutation");

var _MediaListQuery = require("./Admin/Plugins/Media/Query/MediaListQuery");

var _RemoveMediaMutation = require("./Admin/Plugins/Media/Mutation/RemoveMediaMutation");

var _AdminCreateUserMutation = require("./Admin/User/Mutation/AdminCreateUserMutation");

var _AdminUpdateUserMutation = require("./Admin/User/Mutation/AdminUpdateUserMutation");

var _AdminUserListQuery = require("./Admin/User/Query/AdminUserListQuery");

var _AdminUserDetailQuery = require("./Admin/User/Query/AdminUserDetailQuery");

var _AdminAddPeopleToWebsiteMutation = require("./Admin/Website/Mutation/AdminAddPeopleToWebsiteMutation");

var _AdminPluginManageAccessForUserDetail = require("./Admin/Website/Query/AdminPluginManageAccessForUserDetail");

var _AdminPluginManageAccessForUser = require("./Admin/Website/Mutation/AdminPluginManageAccessForUser");

const AppResolver = [{
  Query: {
    testing: () => {
      return 'Hello World';
    },
    me: _MeQuery.MeQuery,
    adminMe: _AdminMeQuery.AdminMeQuery,
    superAdminList: _UserListQuery.UserListQuery,
    superAdmin: _UserQuery.UserQuery,
    websiteList: _WebsiteListQuery.WebsiteListQuery,
    website: _WebsiteQuery.WebsiteQuery,
    pluginList: _PluginListQuery.PluginListQuery,
    plugin: _PluginQuery.PluginQuery,
    roleList: _RoleListQuery.RoleListQuery,
    installedPluginList: _InstalledPluginQuery.InstalledPluginQuery,
    addedPeopleList: _AddedPeopleQuery.AddedPeopleListQuery,
    userList: _UserListQuery.UserListQuery,
    userDetail: _UserQuery.UserQuery,
    applicationByUserList: _ApplicationByUserList.ApplicationByUserList,
    adminRoleList: _AdminRoleListQuery.AdminRoleListQuery,
    hasRole: _HasRoleQuery.HasRoleQuery,
    adminHasRole: _AdminHasRoleQuery.AdminHasRoleQuery,
    newsList: _NewsListQuery.NewsListQuery,
    newsDetail: _NewsDetailQuery.NewsDetailQuery,
    newsCategoryList: _NewsCategoryListQuery.NewsCategoryListQuery,
    newsCategoryDetail: _NewsCategoryDetailQuery.NewsCateogryDetailQuery,
    publicNewsList: _PublicNewsListQuery.PublicNewsListQuery,
    publicNewsDetail: _PublicNewsDetailQuery.PublicNewsDetailQuery,
    publicNewsCategoryList: _PublicNewsCategoryListQuery.PublicNewsCategoryListQuery,
    pluginManageAccessForUserDetail: _PluginManageAccessForUserQuery.PluginManageAccessForUserQuery,
    roleDetail: _RoleDetailQuery.RoleDetailQuery,
    mediaList: _MediaListQuery.MediaListQuery,
    adminUserList: _AdminUserListQuery.AdminUserListQuery,
    adminUserDetail: _AdminUserDetailQuery.AdminUserDetailQuery,
    adminPluginManageAccessForUserDetail: _AdminPluginManageAccessForUserDetail.AdminPluginManageAccessForUserQuery
  },
  Mutation: {
    testing: () => {
      return true;
    },
    singleUpload: _UploadResolver.UploadResolver,
    createSuperAdmin: _CreateSuperAdminMutation.CreateSuperAdminMutation,
    updateSuperAdmin: _UpdateSuperAdminMutation.UpdateSuperAdminMutation,
    createWebsite: _CreateWebsiteMutation.CreateWebsiteMutation,
    updateWebsite: _UpdateWebsiteMutation.UpdateWebsiteMutation,
    createPlugin: _CreatePluginMutation.CreatePluginMutation,
    updatePlugin: _UpdatePluginMutation.UpdatePluginMutation,
    createRole: _CreateRoleMutation.CreateRoleMutation,
    updateRole: _UpdateRoleMutation.UpdateRoleMutation,
    addPeopleToWebsite: _AddPeopleToWebsiteMutation.AddPeopleToWebsiteMutation,
    addPluginToWebsite: _AddPluginToWebsiteMutation.AddPluginToWebsiteMutation,
    uninstallPlugin: _UninstallPluginToWebsiteMutation.UninstallPluginToWebsiteMutation,
    signInSuperAdmin: _SignInSuperAdminMutation.SignInSuperAdminMutation,
    signOutSuperAdmin: _SignOutSuperAdminMutation.SignOutSuperAdminMutation,
    signIn: _SignInMutation.SignInMutation,
    signOut: _SignOutMutation.SignOutMutation,
    removePeopleFromWebsite: _RemovePeopleFromWebsiteMutation.RemovePeopleFromWebsiteMutation,
    assignRoleToUser: _AssignRoleToUserMutation.AssignRoleToUserMutation,
    adminAssignRoleToUser: _AdminAssignRoleToUserMutation.AdminAssignRoleToUserMutation,
    installPluginToUser: _InstallPluginToUserMutation.InstallPluginToUserMutation,
    createNews: _CreateNewsMutation.CreateNewsMutation,
    updateNews: _UpdateNewsMutation.UpdateNewsMuation,
    updateNewsStatus: _UpdateNewsStatusMutation.UpdateNewsStatusMutation,
    createNewsCategory: _CreateNewsCategoryMutation.CreateNewsCategoryMutation,
    updateNewsCategory: _UpdateNewsCategoryMutation.UpdateNewsCategoryMutation,
    createUser: _CreateUserMutation.CreateUserMutation,
    updateUser: _UpdateUserMutation.UpdateUserMutation,
    pluginManageAccessForUser: _PluginManageAccessForUser.PluginManageAccessForUser,
    roleManageAccess: _RoleManageAccessMutation.RoleManageAccessMutation,
    createMedia: _CreateMediaMutation.CreateMediaMutation,
    removeMedia: _RemoveMediaMutation.RemoveMediaMutation,
    adminCreateUser: _AdminCreateUserMutation.AdminCreateUserMutation,
    adminUpdateUser: _AdminUpdateUserMutation.AdminUpdateUserMutation,
    adminAddPeopleToWebsite: _AdminAddPeopleToWebsiteMutation.AdminAddPeopleToWebsiteMutation,
    adminPluginManageAccessForUser: _AdminPluginManageAccessForUser.AdminPluginManageAccessForUser
  }
}];
var _default = AppResolver;
exports.default = _default;