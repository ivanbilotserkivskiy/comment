import { getComments } from "../api/comments";


export const fetchComments = async (query: string) => {
    const commentsFromServer = await getComments(query);
    
    return commentsFromServer
}