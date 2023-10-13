import { CommentsList } from ".."
import { CommentType } from "../../../../../types/CommentType"
import { baseURL } from "../../../../../utils/baseURL";
import { getDateFromTime } from "../../../../../utils/getDateFromTime";
import CommentStyles from './Comment.module.css';
import cn from 'classnames';

type Props ={
  comment: CommentType
}

const exts = ['.jpeg', '.jpg', '.png'];

export const Comment: React.FC<Props> = ({ comment }) => {
  let isImage = false;
  let isTextFile = false;
  const published = getDateFromTime(comment.created);
  if (comment.file_path) {
    const imageExt = comment.file_path.slice(comment.file_path.length - 5);
    isImage = exts.some(ext => imageExt.includes(ext));
    isTextFile = imageExt.includes('.txt');
  }
  return (
    <>
    <article className={cn(`media is-flex-direction-column ${CommentStyles.content}`)}>
    
    <div className="media-content">
      <div className="content">
        <p className="has-text-left">
          <strong>{comment.username}</strong> <small>{comment.email}</small> <small>{published}</small>
          <br />
          {comment.comment_text}
        </p>
      </div>
      {(comment.file_path && isImage) &&(<figure className="media-left">
      <p className="image is-64x64">
        <img src={`${baseURL}${comment.file_path}`} />
      </p>
      </figure>)}
      {(comment.file_path && isTextFile) && (
        <a href={`${baseURL}${comment.file_path}`}>TextFile</a>
      )}
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