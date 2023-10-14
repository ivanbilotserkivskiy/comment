import { CommentType } from "./CommentType";

export type SharedStateType = {
  comments: CommentType[] | string;
  sortBy: 'username' | 'created' | 'email';
  order: 'DESC' | "ASC";
  tred: string,
  parent: string,
  page: number,
  total: number,
}