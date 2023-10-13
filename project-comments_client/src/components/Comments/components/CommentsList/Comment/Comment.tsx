import { CommentsList } from ".."
import { CommentType } from "../../../../../types/CommentType"
import CommentStyles from './Comment.module.css';
import cn from 'classnames';

type Props ={
  comment: CommentType
}

export const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <>
    <article className={cn(`media is-flex-direction-column ${CommentStyles.content}`)}>
    <figure className="media-left">
      <p className="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p className="has-text-left">
          <strong>{comment.username}</strong> <small>{comment.email}</small> <small>31m</small>
          <br />
          {comment.comment_text}
        </p>
      </div>
    </div>
    {
      comment.children
        ? <CommentsList comments={comment.children}/>
        : null
    }
  </article> 
    </>
  )
}