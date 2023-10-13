import { Pagination } from "../Pagination"
import { Comment } from "./Comment"

export const CommentsList = () => {
  return (
    <>
      <Comment />
      <div className="is-justify-content-center is-flex">
        <Pagination />
      </div>
    </>
  )
}