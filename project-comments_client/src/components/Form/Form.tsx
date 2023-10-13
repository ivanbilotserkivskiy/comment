import FormStyles from './Form.module.css';

export const Form = () => {
  return (
    <section className={FormStyles.content}>
    <div className="field">
  <label className="label">Username</label>
  <div className="control">
    <input className="input" type="text" placeholder="Username" />
  </div>
</div>

{/* <div className="field">
  <label className="label">Username</label>
  <div className="control has-icons-left has-icons-right">
    <input className="input is-success" type="text" placeholder="Text input" value="bulma" />
    <span className="icon is-small is-left">
      <i className="fas fa-user"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-check"></i>
    </span>
  </div>
  <p className="help is-success">This username is available</p>
</div> */}

<div className="field">
  <label className="label">Email</label>
  <div className="control has-icons-left has-icons-right">
    <input className="input is-danger" type="email" placeholder="Email input" value="" />
    <span className="icon is-small is-left"> /
      <i className="fas fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p className="help is-danger">This email is invalid</p>
</div>

<div className="field">
    <label className="label">File</label>
    <input type='file' className='input'></input>
</div>

<div className="field">
  <label className="label">Comment</label>
  <div className="control">
    <textarea className="textarea" placeholder="Comment"></textarea>
  </div>
</div>

<div className="field is-grouped">
  <div className="control">
    <button className="button is-link">Submit</button>
  </div>
  <div className="control">
    <button className="button is-link is-light">Cancel</button>
  </div>
</div>
    </section>
  )
}