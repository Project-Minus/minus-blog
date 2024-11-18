export interface Article {
  id: string;
  title: string;
  description: string;
  created_at: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  sub_category: Array<string>;
}

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  created_at: Date;
}

export type Database = Article | Category | User;

export type DatabaseName = "article" | "category" | "user";
