import React from 'react';
import MaterialTable from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

import { ReactComponent as LoaderSVG } from '../../../assets/imgs/loader.svg';
import './Table.css';

const TableSection = React.memo(({
  isFetching,
  error,
  result,
}) => {
  if (!(result && result.columns)) {
    return null;
  }

  if (error) {
    return (
      <section className="col-start-1 col-end-3 row-start-3 row-end-4 text-white m-6 error-container">
        <span className="error-message">
          {error}
          {' '}
          <span role="img" aria-label="sad face">
            😔
          </span>
        </span>
      </section>
    )
  }

  return (
    <section className="table-wrapper col-start-1 col-end-3 row-start-3 row-end-4 text-white overflow-hidden">
      {isFetching ? (
        <LoaderSVG className="w-20 mx-auto" />
      ) : (
        <MaterialTable
          title=""
          icons={{
            FirstPage,
            LastPage,
            Search,
            ResetSearch: Clear,
            PreviousPage: ChevronLeft,
            NextPage: ChevronRight,
            SortArrow: ArrowDownward,
          }}
          columns={result ? result.columns : []}
          data={result ? result.data : []}
          options={{
            maxBodyHeight: 'calc(100vh - 47px - 257px - 53px)',
            doubleHorizontalScroll: true,
            toolbar: false,
            pageSize: 10,
            cellStyle: {
              wordBreak: 'break-word'
            },
          }}
        />
      )}
    </section>
  )
});

export default TableSection
