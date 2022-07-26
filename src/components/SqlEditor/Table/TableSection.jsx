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
  success,
}) => {
  if (success) {
    return (
      <section className="success-block">
        <div className="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/>
          </svg>
          {success}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="error-block">
        <div className="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
          </svg>
          {error}
        </div>
      </section>
    )
  }

  if (!(result && result.columns)) {
    return null;
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
