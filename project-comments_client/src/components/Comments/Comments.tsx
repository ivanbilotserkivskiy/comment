import { CommentsList } from "./components/CommentsList"
import { CommentsSort } from "./components/CommentsSort"

export const Comments = () => {
  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-column">
          <CommentsSort />
          <div className="is-dekstop">
            <CommentsList />  
          </div>          
        </div>
      </div>
    </>
  )
}