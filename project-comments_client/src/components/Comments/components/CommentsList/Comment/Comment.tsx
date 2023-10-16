import { CommentsList } from ".."
import { useSharedState } from "../../../../../store/store";
import { CommentType } from "../../../../../types/CommentType"
import { getDateFromTime } from "../../../../../utils/getDateFromTime";
import CommentStyles from './Comment.module.css';
import cn from 'classnames';

type Props ={
  comment: CommentType
}

const exts = ['.jpeg', '.jpg', '.png'];

export const Comment: React.FC<Props> = ({ comment }) => {
  const [, setState] = useSharedState();
  let isImage = false;
  let isTextFile = false;
  const published = getDateFromTime(comment.created);
  if (comment.file_path) {
    const imageExt = comment.file_path.slice(comment.file_path.length - 5);
    isImage = exts.some(ext => imageExt.includes(ext));
    isTextFile = imageExt.includes('.txt');
  }

  const setParentAndTred = () => {
    setState(prev => ({ ...prev, parent: `${comment.id}`, tred: `${comment.tred_id}` }))
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
      <a target="_blank" href={`${comment.file_path}`} className={`image ${CommentStyles.image}`}>
        <img src={`${comment.file_path}`} />
      </a>
      </figure>)}
      {(comment.file_path && isTextFile) && (
        <a href={`${comment.file_path}`}  target="_blank">TextFile</a>
      )}
      <div className={CommentStyles.answer_container}>
        <a href="#form" className={CommentStyles.answer_link} onClick={() => setParentAndTred()}>
          <i className="fa-solid fa-arrow-turn-down"></i>
        </a>
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