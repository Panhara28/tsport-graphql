import BaseRepository from "./BaseRepository";
import { table_roles } from "../generated/tables/table_roles";
export default class PermissionRepository extends BaseRepository<table_roles> {
  tableName = "roles";
  idColumnName = "id";

  static map(row: table_roles) {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
    };
  }
}
