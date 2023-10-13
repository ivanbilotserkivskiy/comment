import { SortLink } from "../SortLink"

export const CommentsSort = () => {
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
                        <SortLink />
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Email
                        <SortLink />
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Published
                        <SortLink />
                      </span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  )
}