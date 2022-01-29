import BaseRepository from "./BaseRepository";
import { table_news } from "../generated/tables/table_news";

export default class NewsRepository extends BaseRepository<table_news>{
  tableName = "news";
  idColumnName = 'id';

  static map(row: table_news){
    return {
      id: row.id,
      title: row.title,
      summary: row.summary,
      description: row.description,
      thumbnail: row.thumbnail,
      new_category_id: row.new_category_id
    }
  }
}