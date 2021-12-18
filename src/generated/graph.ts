/* eslint-disable */
export declare namespace Graph {
  export interface Query {
    testing?: null | string;
    pluginList?: null | PluginList;
    plugin?: null | Plugin;
    roleList?: RoleList[] | null;
    role?: null | Role;
    userList?: null | UserList;
    user?: null | User;
    websiteList?: null | WebsiteList;
    website?: null | Website;
  }

  export interface Mutation {
    testing?: null | boolean;
    createPlugin?: null | number;
    updatePlugin?: null | boolean;
    createRole?: null | number;
    updateRole?: null | boolean;
    upload: UploadedFile;
    createUser?: null | number;
    updateUser?: null | boolean;
    createWebsite?: null | number;
    updateWebsite?: null | boolean;
    addPeopleToWebsite?: null | boolean;
    addPluginToWebsite?: null | boolean;
  }

  export interface PluginList {
    data?: Plugin[] | null;
  }

  export interface Plugin {
    name?: null | string;
    website_id?: null | number;
  }

  export interface PluginInput {
    name?: null | string;
    website_id?: null | number;
  }

  export interface RoleList {
    data?: null | Role;
    permission?: null | RolePermission;
  }

  export interface Role {
    name?: null | string;
    website_id?: null | number;
  }

  export interface RoleInput {
    name?: null | string;
    website_id?: null | number;
  }

  export interface RolePermission {
    isCreated?: null | boolean;
    isModified?: null | boolean;
    isRemove?: null | boolean;
    isList?: null | boolean;
    isDetail?: null | boolean;
  }

  export interface RolePermissionInput {
    isCreated?: null | boolean;
    isModified?: null | boolean;
    isRemove?: null | boolean;
    isList?: null | boolean;
    isDetail?: null | boolean;
  }

  export interface UploadedFile {
    filename: string;
    url: string;
  }

  export interface UserList {
    data?: User[] | null;
  }

  export interface User {
    id?: null | number;
    username?: null | string;
    fullname?: null | string;
    website_id?: null | number;
  }

  export interface UserInput {
    username?: null | string;
    password?: null | string;
    fullname?: null | string;
    website_id?: null | number;
  }

  export interface WebsiteList {
    data?: Website[] | null;
  }

  export interface Website {
    name?: null | string;
    description?: null | string;
  }

  export interface WebsiteInput {
    name?: null | string;
    description?: null | string;
  }

  export interface UserInputId {
    userId?: null | number;
  }

  export interface PluginInputId {
    pluginId?: null | number;
  }
}
