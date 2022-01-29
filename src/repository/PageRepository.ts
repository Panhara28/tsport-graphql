import BaseRepository from "./BaseRepository";
import { table_pages } from "../generated/tables/table_pages";

export default class PageRepository extends BaseRepository<table_pages>{
  tableName = 'pages';
  idColumnName = 'id';

  static map(row: table_pages) {
    return{
      id: row.id,
      title: row.title,
      description: row.description,
      thumbnail: row.thumbnail,
    }
  }
}