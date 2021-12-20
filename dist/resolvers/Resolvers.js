"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreatePluginMutation = require("./Plugin/Mutation/CreatePluginMutation");

var _UpdatePluginMutation = require("./Plugin/Mutation/UpdatePluginMutation");

var _PluginListQuery = require("./Plugin/Query/PluginListQuery");

var _PluginQuery = require("./Plugin/Query/PluginQuery");

var _CreateRoleMutation = require("./Role/Mutation/CreateRoleMutation");

var _UpdateRoleMutation = require("./Role/Mutation/UpdateRoleMutation");

var _RoleListQuery = require("./Role/Query/RoleListQuery");

var _CreateUserMutation = require("./User/Mutation/CreateUserMutation");

var _UpdateUserMutation = require("./User/Mutation/UpdateUserMutation");

var _UserListQuery = require("./User/Query/UserListQuery");

var _UserQuery = require("./User/Query/UserQuery");

var _AddPeopleToWebsiteMutation = require("./Website/Mutation/AddPeopleToWebsiteMutation");

var _AddPluginToWebsiteMutation = require("./Website/Mutation/AddPluginToWebsiteMutation");

var _CreateWebsiteMutation = require("./Website/Mutation/CreateWebsiteMutation");

var _UninstallPluginToWebsiteMutation = require("./Website/Mutation/UninstallPluginToWebsiteMutation");

var _UpdateWebsiteMutation = require("./Website/Mutation/UpdateWebsiteMutation");

var _AddedPeopleQuery = require("./Website/Query/AddedPeopleQuery");

var _InstalledPluginQuery = require("./Website/Query/InstalledPluginQuery");

var _WebsiteListQuery = require("./Website/Query/WebsiteListQuery");

var _WebsiteQuery = require("./Website/Query/WebsiteQuery");

const AppResolver = [{
  Query: {
    testing: () => {
      return 'Hello World';
    },
    userList: _UserListQuery.UserListQuery,
    user: _UserQuery.UserQuery,
    websiteList: _WebsiteListQuery.WebsiteListQuery,
    website: _WebsiteQuery.WebsiteQuery,
    pluginList: _PluginListQuery.PluginListQuery,
    plugin: _PluginQuery.PluginQuery,
    roleList: _RoleListQuery.RoleListQuery,
    installedPluginList: _InstalledPluginQuery.InstalledPluginQuery,
    addedPeopleList: _AddedPeopleQuery.AddedPeopleListQuery
  },
  Mutation: {
    testing: () => {
      return true;
    },
    createUser: _CreateUserMutation.CreateUserMutation,
    updateUser: _UpdateUserMutation.UpdateUserMutation,
    createWebsite: _CreateWebsiteMutation.CreateWebsiteMutation,
    updateWebsite: _UpdateWebsiteMutation.UpdateWebsiteMutation,
    createPlugin: _CreatePluginMutation.CreatePluginMutation,
    updatePlugin: _UpdatePluginMutation.UpdatePluginMutation,
    createRole: _CreateRoleMutation.CreateRoleMutation,
    updateRole: _UpdateRoleMutation.UpdateRoleMutation,
    addPeopleToWebsite: _AddPeopleToWebsiteMutation.AddPeopleToWebsiteMutation,
    addPluginToWebsite: _AddPluginToWebsiteMutation.AddPluginToWebsiteMutation,
    uninstallPlugin: _UninstallPluginToWebsiteMutation.UninstallPluginToWebsiteMutation
  }
}];
var _default = AppResolver;
exports.default = _default;