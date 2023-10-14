import { useState } from 'react';
import FormStyles from './Form.module.css';
import { FormDataCreate } from '../../types/FormDataCreate';
import { addComment } from '../../api/comments';
import { useSharedState } from '../../store/store';

type Props = {
  send: (value:string) => void,
}

export const Form: React.FC<Props> = ({ send }) => {
  const [state, setState] = useSharedState();
  const [formData, setFormData] = useState<FormDataCreate>({
    username: '',
    email: '',
    comment_text: '',
    parent_id: state.parent,
    tred_id: state.tred,
    file: null,
  })

  // const [formValidation, setFormValidation] = useState({
  //   username: '',
  //   email: '',
  //   comment_text: '',
  //   file: '',
  // })

  const changeFromData = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files)
      const fileToupload = event.target.files[0] || null;
      setFormData(prev => ({
        ...prev,
        file: fileToupload,
      }))
    }
  }

  const sendComment = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = new FormData();
      const parent = state.parent ? state.parent : '';
      const tred = state.tred ? state.tred : '';
      data.append('file', formData.file as File);
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('comment_text', formData.comment_text);
      data.append('tred_id', tred);
      data.append('parent_id', parent);
      await addComment(data);
      setState(prev => ({ ...prev, parent:'', tred: '' }))

      send('add comment')

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={sendComment} className={FormStyles.content} id='form'>
    <div className="field">
  <label className="label">Username</label>
  <div className="control">
    <input
      className="input"
      type="text"
      placeholder="Username"
      value={formData.username}
      name='username'
      onChange={changeFromData}
    />
  </div>
</div>

<div className="field">
  <label className="label">Email</label>
  <div className="control has-icons-left has-icons-right">
    <input
      className="input"
      type="email"
      placeholder="Email input"
      value={formData.email}
      name='email'
      onChange={changeFromData}
    />
    <span className="icon is-small is-left"> /
      <i className="fas fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-exclamation-triangle"></i>
    </span>
  </div>
</div>

<div className="field">
    <label className="label">File</label>
    <input 
      type='file'
      className='input'
      name="file" 
      onChange={addFile}>
    </input>
</div>

<div className="field">
  <label className="label">Comment</label>
  <div className="control">
    <textarea
      className="textarea"
      placeholder="Comment"
      value={formData.comment_text}
      name='comment_text'
      onChange={changeFromData}
    ></textarea>
  </div>
</div>

<div className="field is-grouped">
  <div className="control">
    <button type='submit' className="button is-link">Submit</button>
  </div>
  <div className="control">
    <button className="button is-link is-light">Cancel</button>
  </div>
</div>
    </form>
  )
}