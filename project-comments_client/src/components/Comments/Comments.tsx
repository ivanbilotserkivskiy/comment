import { useEffect } from "react";
import { CommentsList } from "./components/CommentsList"
import { CommentsSort } from "./components/CommentsSort"
import { getComments } from "../../api/comments";
import { Pagination } from "./components/Pagination";
import { useSharedState } from "../../store/store";

export const Comments = () => {

  const [state, setState] = useSharedState()

  const fetchComments = async (query: string) => {
    console.log(await getComments())
      const commentsFromServer = await getComments(query);
      if (typeof commentsFromServer === 'string') {
        return console.log(commentsFromServer);
      }

      if (commentsFromServer) {
        setState(prev => ({...prev, comments: commentsFromServer}))
      }
  }

  useEffect(() => {
    fetchComments(`?sortBy=${state.sortBy}&order=${state.order}`);
  }, [state.order, state.sortBy])

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-column">
          <CommentsSort />
          <div className="is-dekstop">
            {
              (state.comments && typeof state.comments !== 'string') 
                ? <CommentsList comments={state.comments} />  
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