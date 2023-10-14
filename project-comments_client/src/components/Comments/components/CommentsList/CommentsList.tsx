import { CommentType } from "../../../../types/CommentType"
import { Comment } from "./Comment"

type Props = {
  comments: CommentType[];
}

export const CommentsList:React.FC<Props> = ({ comments }) => {

  return (
    <>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}

    </>
  )
}