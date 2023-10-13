import { CommentType } from "./CommentType";
import { ResponseErrOrData } from './ResponseErrOrData.ts';

export type SharedStateType = {
  comments: ResponseErrOrData<CommentType[]>;
}