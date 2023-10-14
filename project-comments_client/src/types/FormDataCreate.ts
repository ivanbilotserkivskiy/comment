export type FormDataCreate = {
  username: string;
  email: string,
  comment_text: string,
  tred_id: string,
  parent_id: string;
  file: File | null; 
}