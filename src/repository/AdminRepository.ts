import { table_users } from "../generated/tables/table_users";
import BaseRepository from "./BaseRepository";

export default class AdminRepository extends BaseRepository<table_users> {
  tableName = "users";
  idColumnName = "id";

  static map(row: table_users) {
    return {
      id: row.id,
      fullname: row.fullname,
      username: row.username,
      password: row.password,
      profile: row.profile,
      status: row.status,
      phoneNumber: row.phoneNumber,
      email: row.email
    };
  }
}
