import { useEffect, useState } from "react";
import { CommentsList } from "./components/CommentsList"
import { CommentsSort } from "./components/CommentsSort"
import { getComments } from "../../api/comments";
import { CommentType } from "../../types/CommentType";
import { Pagination } from "./components/Pagination";

export const Comments = () => {

  const [comments, setComments] = useState<CommentType[] | string>()

  const fetchComments = async () => {
    console.log(await getComments())
      const commentsFromServer = await getComments();
      if (typeof commentsFromServer === 'string') {
        return console.log(commentsFromServer);
      }

      if (commentsFromServer) {
        setComments(() => (commentsFromServer))
      }
  }

  useEffect(() => {
    fetchComments();
  },[])

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-column">
          <CommentsSort />
          <div className="is-dekstop">
            {
              (comments && typeof comments !== 'string') 
                ? <CommentsList comments={comments} />  
                : null
            }
          </div>
          <div className="is-justify-content-center is-flex">
            <Pagination />
          </div>          
        </div>
      </div>
    </>
  )
}