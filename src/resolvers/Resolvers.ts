import { CreatePluginMutation } from './Plugin/Mutation/CreatePluginMutation';
import { UpdatePluginMutation } from './Plugin/Mutation/UpdatePluginMutation';
import { PluginListQuery } from './Plugin/Query/PluginListQuery';
import { PluginQuery } from './Plugin/Query/PluginQuery';
import { CreateRoleMutation } from './Role/Mutation/CreateRoleMutation';
import { UpdateRoleMutation } from './Role/Mutation/UpdateRoleMutation';
import { RoleListQuery } from './Role/Query/RoleListQuery';
import { CreateUserMutation } from './User/Mutation/CreateUserMutation';
import { UpdateUserMutation } from './User/Mutation/UpdateUserMutation';
import { UserListQuery } from './User/Query/UserListQuery';
import { UserQuery } from './User/Query/UserQuery';
import { AddPeopleToWebsiteMutation } from './Website/Mutation/AddPeopleToWebsiteMutation';
import { AddPluginToWebsiteMutation } from './Website/Mutation/AddPluginToWebsiteMutation';
import { CreateWebsiteMutation } from './Website/Mutation/CreateWebsiteMutation';
import { UninstallPluginToWebsiteMutation } from './Website/Mutation/UninstallPluginToWebsiteMutation';
import { UpdateWebsiteMutation } from './Website/Mutation/UpdateWebsiteMutation';
import { InstalledPluginQuery } from './Website/Query/InstalledPluginQuery';
import { WebsiteListQuery } from './Website/Query/WebsiteListQuery';
import { WebsiteQuery } from './Website/Query/WebsiteQuery';

const AppResolver = [
  {
    Query: {
      testing: () => {
        return 'Hello World';
      },
      userList: UserListQuery,
      user: UserQuery,
      websiteList: WebsiteListQuery,
      website: WebsiteQuery,
      pluginList: PluginListQuery,
      plugin: PluginQuery,
      roleList: RoleListQuery,
      installedPluginList: InstalledPluginQuery,
    },

    Mutation: {
      testing: () => {
        return true;
      },
      createUser: CreateUserMutation,
      updateUser: UpdateUserMutation,
      createWebsite: CreateWebsiteMutation,
      updateWebsite: UpdateWebsiteMutation,
      createPlugin: CreatePluginMutation,
      updatePlugin: UpdatePluginMutation,
      createRole: CreateRoleMutation,
      updateRole: UpdateRoleMutation,
      addPeopleToWebsite: AddPeopleToWebsiteMutation,
      addPluginToWebsite: AddPluginToWebsiteMutation,
      uninstallPlugin: UninstallPluginToWebsiteMutation,
    },
  },
];

export default AppResolver;
