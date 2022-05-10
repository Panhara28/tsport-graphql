/* eslint-disable */
export interface table_news {
  id?: number;
  title?: string | null;
  summary?: string | null;
  thumbnail?: string | null;
  description?: any | null;
  status?: 'PENDING' | 'INREVIEW' | 'REVERSION' | 'PUBLISHED';
  new_category_id?: number | null;
  website_id?: number | null;
  created_by?: number | null;
  updated_by?: number | null;
  created_at?: number;
  updated_at?: number;
  created_date?: string;
  published_date?: string;
}
