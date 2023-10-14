export type CommentType = {
  id: number,
  parent_id: number,
  tred_id: number,
  username: string,
  email: string,
  file_path: string,
  comment_text: string,
  created: string;
  children: CommentType[];
}