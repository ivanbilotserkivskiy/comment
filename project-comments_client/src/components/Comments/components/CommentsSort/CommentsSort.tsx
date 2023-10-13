import { useSharedState } from "../../../../store/store";
import cn from 'classnames';

export const CommentsSort = () => {
  const [state, setState] = useSharedState();

  const changeSort = (field: 'created' | 'username' | 'email') => {
    if (state.sortBy === field && state.order === 'ASC') {
      setState(prev => ({...prev, order: 'DESC'}))
    } else if (state.sortBy !== field && state.order === 'ASC') {
       setState(prev => ({...prev, order: 'ASC', sortBy: field}))
    } else {
       setState(prev => ({...prev, sortBy: field, order: 'ASC'}))
    }

    
  }

  return (
    <div className="column">
            <div className="box table-container">
              <table
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Username
                        <a className="icon" onClick={() => changeSort('username')}>
                          <i className={cn({
                            'fas fa-sort': state.sortBy !== 'username',
                            'fas fa-sort-up': state.sortBy === 'username' && state.order === 'ASC',
                            'fas fa-sort-down': state.sortBy === 'username' && state.order === 'DESC',
                          })}/>
                        </a>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Email
                        <a className="icon" onClick={() => changeSort('email')}>
                          <i className={cn({
                            'fas fa-sort': state.sortBy !== 'email',
                            'fas fa-sort-up': state.sortBy === 'email' && state.order === 'ASC',
                            'fas fa-sort-down': state.sortBy === 'email' && state.order === 'DESC',
                          })}/>
                        </a>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Published
                        <a className="icon" onClick={() => changeSort('created')}>
                          <i className={cn({
                            'fas fa-sort': state.sortBy !== 'created',
                            'fas fa-sort-up': state.sortBy === 'created' && state.order === 'ASC',
                            'fas fa-sort-down': state.sortBy === 'created' && state.order === 'DESC',
                          })}/>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  )
}