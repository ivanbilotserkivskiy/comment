import { CommentType } from '../types/CommentType';
import { client } from '../utils/fetchClient';

export const getComments = (query:string = '') => {
  return client.get<CommentType[] | string>(`/comments${query}`);
}
export const addComment = (formData: FormData) => {
  return client.postFormData<CommentType>('/comments', formData);
};

export const getTotal = () => {
  return client.get<number>('/comments/total')
}
