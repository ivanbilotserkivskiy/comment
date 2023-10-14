import { useSharedState } from "../../../../store/store"

export const Pagination = () => {
  const [state, setState] = useSharedState();

  const nextPage = () => {
    setState(prev => ({ ...prev, page: state.page + 1 }))
  }
  const prevPage = () => {
    setState(prev => ({ ...prev, page: state.page - 1 }))
  }
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
  <ul className="pagination-list">
    <li>
      <button 
        className="pagination-link"
        aria-label="Goto page 1"
        disabled={state.page === 1}
        onClick={prevPage}
      >
        {'<'}
      </button>
    </li>
    <li>
      <a className="pagination-link is-current" aria-label="Page 46" aria-current="page">{state.page}</a>
    </li>
    <li>
      <button
        className="pagination-link"
        aria-label="Goto page 86"
        disabled={state.page === Math.round(state.total / 25)}
        onClick={nextPage}
      >
        {'>'}
      </button>
    </li>
  </ul>
</nav>
  )
}