/* eslint-disable */
export declare namespace Graph {
  export interface Query {
    activityLogsList?: null | ActivityLogsList;
    activityLogsNews?: null | ActivityLogsNewsList;
    activityLogsOptions?: ActivityLogsOptions[] | null;
    me?: null | Me;
    adminMe?: null | Me;
    genderDashboardCount?: null | GenderDashboardCount;
    testing?: null | string;
    playgroundList?: null | PlaygroundList;
    employeeReport?: null | EmployeeReportList;
    roleList?: null | RoleList;
    role?: null | Role;
    adminRoleList?: null | RoleList;
    hasRole?: null | Role;
    adminHasRole?: null | Role;
    roleDetail?: null | Role;
    superAdminList?: null | SuperAdminList;
    superAdmin?: null | SuperAdminList;
    adminUserList?: null | UserList;
    adminUserDetail?: null | User;
    userList?: null | UserList;
    userDetail?: null | User;
  }

  export interface FilterActivityLogs {
    type?: null | string;
  }

  export interface ActivityLogsOptions {
    type?: null | string;
  }

  export interface ActivityLogsNewsList {
    data?: ActivityLogsNews[] | null;
    pagination?: null | Pagination;
  }

  export interface ActivityLogsNews {
    id?: null | number;
    type?: null | string;
    user_id?: null | number;
    activity?: null | any;
    user?: null | User;
  }

  export interface ActivityLogsList {
    data?: ActivityLogs[] | null;
    pagination?: null | Pagination;
  }

  export interface ActivityLogs {
    id?: null | number;
    type?: null | string;
    user_id?: null | number;
    activity?: null | any;
    user?: null | User;
  }

  export interface Mutation {
    signIn?: null | Token;
    signOut?: null | boolean;
    signInSuperAdmin?: null | Token;
    signOutSuperAdmin?: null | boolean;
    changePassword?: null | boolean;
    testing?: null | boolean;
    createPlayground: number;
    createRole?: null | number;
    updateRole?: null | boolean;
    roleManageAccess?: null | boolean;
    adminAssignRoleToUser?: null | boolean;
    createSuperAdmin?: null | number;
    updateSuperAdmin?: null | boolean;
    singleUpload: UploadedFile;
    adminCreateUser: number;
    adminUpdateUser?: null | boolean;
    createUser: number;
    updateUser?: null | boolean;
  }

  export interface SignInInput {
    username: string;
    password: string;
  }

  export interface Token {
    token?: null | string;
  }

  export interface Me {
    id?: null | number;
    username?: null | string;
    fullname?: null | string;
    profilePicture?: null | string;
    roleName?: null | string;
    contact_district?: null | string;
    contact_commune?: null | string;
    contact_city_or_province?: null | string;
    contact_village?: null | string;
    phoneNumber?: null | string;
    email?: null | string;
    roleId?: null | number;
    access?: null | RoleAccess;
  }

  export interface GenderDashboardCount {
    total_male?: null | number;
    total_female?: null | number;
  }

  export interface Subscription {
    testing?: null | string;
  }

  export interface PaginationInput {
    page?: null | number;
    size?: null | number;
  }

  export interface Pagination {
    total?: null | number;
    size?: null | number;
    current?: null | number;
  }

  export interface Playground {
    id?: null | number;
    title?: null | string;
  }

  export interface PlaygroundList {
    data?: Playground[] | null;
  }

  export interface PlaygroundInput {
    title?: null | string;
  }

  export interface EmployeeReportList {
    pagination?: null | Pagination;
  }

  export interface EmployeeReportFilter {
    all?: null | string;
    officerName?: null | string;
    generalDepartmentId?: null | number;
    departmentId?: null | number;
    officeId?: null | number;
  }

  export interface RoleList {
    data?: Role[] | null;
    permission?: null | RolePermission;
  }

  export interface Role {
    id?: null | number;
    name?: null | string;
    access?: null | RoleAccess;
  }

  export interface RoleAccessInput {
    read?: null | boolean;
    write?: null | boolean;
    modify?: null | boolean;
    remove?: null | boolean;
    generalDepartmentRead?: null | boolean;
    generalDepartmentWrite?: null | boolean;
    generalDepartmentModify?: null | boolean;
    generalDepartmentRemove?: null | boolean;
    departmentRead?: null | boolean;
    departmentWrite?: null | boolean;
    departmentModify?: null | boolean;
    departmentRemove?: null | boolean;
    officeRead?: null | boolean;
    officeWrite?: null | boolean;
    officeModify?: null | boolean;
    officeRemove?: null | boolean;
    officerRead?: null | boolean;
    officerWrite?: null | boolean;
    officerModify?: null | boolean;
    officerRemove?: null | boolean;
  }

  export interface RoleAccess {
    read?: null | boolean;
    write?: null | boolean;
    modify?: null | boolean;
    delete?: null | boolean;
    generalDepartmentRead?: null | boolean;
    generalDepartmentWrite?: null | boolean;
    generalDepartmentModify?: null | boolean;
    generalDepartmentRemove?: null | boolean;
    departmentRead?: null | boolean;
    departmentWrite?: null | boolean;
    departmentModify?: null | boolean;
    departmentRemove?: null | boolean;
    officeRead?: null | boolean;
    officeWrite?: null | boolean;
    officeModify?: null | boolean;
    officeRemove?: null | boolean;
    officerRead?: null | boolean;
    officerWrite?: null | boolean;
    officerModify?: null | boolean;
    officerRemove?: null | boolean;
  }

  export interface RoleInput {
    name?: null | string;
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

  export interface SuperAdminList {
    data?: SuperAdmin[] | null;
  }

  export interface SuperAdmin {
    id?: null | number;
    username?: null | string;
    fullname?: null | string;
  }

  export interface SuperAdminInput {
    username?: null | string;
    password?: null | string;
    fullname?: null | string;
  }

  export interface UploadedFile {
    filename: string;
    url: string;
    fileSize: string;
    mimetype: string;
    width: string;
    height: string;
  }

  export interface User {
    id?: null | number;
    fullname?: null | string;
    username?: null | string;
    email?: null | string;
    phoneNumber?: null | string;
    profile_picture?: null | string;
  }

  export interface UserFilter {
    fullname?: null | string;
  }

  export interface UserList {
    data?: User[] | null;
    pagination?: null | Pagination;
  }

  export interface UserInput {
    fullname?: null | string;
    username?: null | string;
    password?: null | string;
    email?: null | string;
    phoneNumber?: null | string;
    profile_picture?: null | string;
  }

  export type UserGender = 'MALE' | 'FEMALE';
}
