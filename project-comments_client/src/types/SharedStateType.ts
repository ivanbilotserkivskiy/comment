import { CommentType } from "./CommentType";

export type SharedStateType = {
  comments: CommentType[] | string;
  sortBy: 'username' | 'created' | 'email';
  order: 'DESC' | "ASC";
}