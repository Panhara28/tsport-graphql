/* eslint-disable */export declare namespace Graph {  export interface Query {    activityLogsList?: null | ActivityLogsList;    activityLogsNews?: null | ActivityLogsNewsList;    activityLogsOptions?: ActivityLogsOptions[] | null;    applicationByUserList?: null | ApplicationList;    me?: null | Me;    adminMe?: null | Me;    testing?: null | string;    mediaList?: null | MediaList;    newsList?: null | NewsList;    newsDetail?: null | News;    publicNewsList?: News[] | null;    publicNewsDetail?: null | News;    newsCategoryList?: null | NewsCategoryList;    newsCategoryDetail?: null | NewsCategory;    publicNewsCategoryList?: NewsCategory[] | null;    publicNewsCategoryDetail?: null | NewsCategory;    notifications?: Notification[] | null;    pluginList?: null | PluginList;    plugin?: null | Plugin;    pluginManageAccessForUserDetail?: null | Access;    adminPluginManageAccessForUserDetail?: null | Access;    provinceList?: Province[] | null;    provinceDetail?: null | Province;    publicProvinceList?: PublicProvince[] | null;    roleList?: null | RoleList;    role?: null | Role;    adminRoleList?: null | RoleList;    hasRole?: null | Role;    adminHasRole?: null | Role;    roleDetail?: null | Role;    superAdminList?: null | SuperAdminList;    superAdmin?: null | SuperAdminList;    adminUserList?: null | UserList;    adminUserDetail?: null | User;    userList?: null | UserList;    userDetail?: null | User;    websiteList?: null | WebsiteList;    website?: null | Website;    installedPluginList?: InstalledPluginProps[] | null;    addedPeopleList?: AddedPeople[] | null;  }  export interface FilterActivityLogs {    type?: null | string;  }  export interface ActivityLogsOptions {    type?: null | string;  }  export interface ActivityLogsNewsList {    data?: ActivityLogsNews[] | null;    pagination?: null | Pagination;  }  export interface ActivityLogsNews {    id?: null | number;    type?: null | string;    user_id?: null | number;    activity?: null | any;    user?: null | User;  }  export interface ActivityLogsList {    data?: ActivityLogs[] | null;    pagination?: null | Pagination;  }  export interface ActivityLogs {    id?: null | number;    type?: null | string;    user_id?: null | number;    activity?: null | any;    user?: null | User;  }  export interface Application {    id?: null | number;    name?: null | string;  }  export interface ApplicationList {    data?: Application[] | null;  }  export interface Mutation {    signIn?: null | Token;    signOut?: null | boolean;    signInSuperAdmin?: null | Token;    signOutSuperAdmin?: null | boolean;    changePassword?: null | boolean;    testing?: null | boolean;    createMedia: number;    removeMedia?: null | boolean;    createNews: number;    updateNews?: null | boolean;    updateNewsStatus?: null | boolean;    createNewsCategory: number;    updateNewsCategory?: null | boolean;    pushNotification?: null | Notification;    createPlugin?: null | number;    updatePlugin?: null | boolean;    pluginManageAccessForUser?: null | boolean;    adminPluginManageAccessForUser?: null | boolean;    createProvince: number;    updateProvince?: null | boolean;    createRole?: null | number;    updateRole?: null | boolean;    roleManageAccess?: null | boolean;    createSuperAdmin?: null | number;    updateSuperAdmin?: null | boolean;    singleUpload: UploadedFile;    adminCreateUser: number;    adminUpdateUser?: null | boolean;    createUser: number;    updateUser?: null | boolean;    createWebsite?: null | number;    updateWebsite?: null | boolean;    adminAddPeopleToWebsite?: null | boolean;    addPeopleToWebsite?: null | boolean;    addPluginToWebsite?: null | boolean;    uninstallPlugin?: null | boolean;    removePeopleFromWebsite?: null | boolean;    assignRoleToUser: number;    adminAssignRoleToUser: number;    installPluginToUser?: null | boolean;  }  export interface SignInInput {    username: string;    password: string;  }  export interface Token {    token?: null | string;  }  export interface Me {    id?: null | number;    username?: null | string;    fullname?: null | string;    profilePicture?: null | string;    roleName?: null | string;    roleId?: null | number;    plugins?: Plugin[] | null;  }  export interface Subscription {    testing?: null | string;    newNotification?: null | Notification;  }  export interface Media {    id?: null | number;    image_url?: null | string;    upload_storage?: null | number;    mimetype?: null | string;    width?: null | string;    height?: null | string;    created_at?: null | string;    user?: null | User;  }  export interface MediaList {    data?: Media[] | null;    pagination?: null | Pagination;  }  export interface MediaInput {    image_url?: null | string;    upload_storage?: null | number;    mimetype?: null | string;    width?: null | string;    height?: null | string;  }  export interface NewsList {    data?: News[] | null;    pagination?: null | Pagination;  }  export interface News {    id?: null | number;    title?: null | string;    summary?: null | string;    description?: null | any;    thumbnail?: null | string;    status?: null | NewsEnum;    new_category_id?: null | number;    created_at?: null | string;    category?: null | NewsCategory;    created_date?: null | string;    published_date?: null | string;  }  export interface NewsInput {    title?: null | string;    summary?: null | string;    description?: null | any;    thumbnail?: null | string;    new_category_id?: null | number;    created_date?: null | string;    published_date?: null | string;  }  export type NewsEnum = 'PENDING' | 'INREVIEW' | 'PUBLISHED' | 'REVERSION';  export interface FilterNews {    status?: null | NewsEnum;    id?: null | number;    name?: null | string;  }  export interface PaginationInput {    page?: null | number;    size?: null | number;  }  export interface Pagination {    total?: null | number;    size?: null | number;    current?: null | number;  }  export interface NewsCategoryList {    data?: NewsCategory[] | null;    pagination?: null | Pagination;  }  export interface NewsCategory {    id?: null | number;    name?: null | string;    created_at?: null | string;    news?: News[] | null;  }  export interface NewsCategoryInput {    name?: null | string;  }  export interface Notification {    name?: null | string;  }  export interface PluginList {    data?: Plugin[] | null;  }  export interface Plugin {    id?: null | number;    name?: null | string;    slug?: null | string;    website_id?: null | number;    access?: null | Access;  }  export interface Access {    read?: null | boolean;    create?: null | boolean;    edit?: null | boolean;    remove?: null | boolean;  }  export interface PluginInput {    name?: null | string;    website_id?: null | number;  }  export interface PublicProvince {    id?: null | number;    name?: null | string;  }  export interface Province {    id?: null | number;    name?: null | string;    documents?: Document[] | null;  }  export interface ProvinceInput {    name?: null | string;    created_by?: null | number;    updated_by?: null | number;  }  export interface RoleList {    data?: Role[] | null;    permission?: null | RolePermission;  }  export interface Role {    id?: null | number;    name?: null | string;    website_id?: null | number;    access?: null | Access;  }  export interface RoleInput {    name?: null | string;    website_id?: null | number;  }  export interface RolePermission {    isCreated?: null | boolean;    isModified?: null | boolean;    isRemove?: null | boolean;    isList?: null | boolean;    isDetail?: null | boolean;  }  export interface RolePermissionInput {    isCreated?: null | boolean;    isModified?: null | boolean;    isRemove?: null | boolean;    isList?: null | boolean;    isDetail?: null | boolean;  }  export interface SuperAdminList {    data?: SuperAdmin[] | null;  }  export interface SuperAdmin {    id?: null | number;    username?: null | string;    fullname?: null | string;  }  export interface SuperAdminInput {    username?: null | string;    password?: null | string;    fullname?: null | string;  }  export interface UploadedFile {    filename: string;    url: string;    fileSize: string;    mimetype: string;    width: string;    height: string;  }  export interface User {    id?: null | number;    fullname?: null | string;    username?: null | string;    gender?: null | UserGender;    nationality?: null | string;    fullname_en?: null | string;    dob?: null | string;    homeNo?: null | string;    streetNo?: null | string;    phoneNumber?: null | string;    email?: null | string;    contact_village?: null | string;    contact_district?: null | string;    contact_commune?: null | string;    contact_city_or_province?: null | string;  }  export interface UserList {    data?: User[] | null;  }  export interface UserInput {    fullname?: null | string;    username?: null | string;    password?: null | string;    gender?: null | UserGender;    nationality?: null | string;    fullname_en?: null | string;    dob?: null | string;    homeNo?: null | string;    streetNo?: null | string;    phoneNumber?: null | string;    email?: null | string;    contact_village?: null | string;    contact_district?: null | string;    contact_commune?: null | string;    contact_city_or_province?: null | string;  }  export type UserGender = 'MALE' | 'FEMALE';  export interface WebsiteList {    data?: Website[] | null;  }  export interface Website {    id?: null | number;    name?: null | string;    description?: null | string;  }  export interface WebsiteInput {    name?: null | string;    description?: null | string;  }  export interface UserInputId {    userId?: null | number;  }  export interface PluginInputId {    pluginId?: null | number;  }  export interface InstalledPluginProps {    pluginId?: null | number;    pluginName?: null | string;  }  export interface AddedPeople {    userId?: null | number;    fullName?: null | string;  }}