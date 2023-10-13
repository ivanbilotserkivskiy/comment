export type CommentType = {
  parent_id: number,
  username: string,
  email: string,
  file_path: string,
  comment_text: string,
  created: string;
  children: CommentType[];
}