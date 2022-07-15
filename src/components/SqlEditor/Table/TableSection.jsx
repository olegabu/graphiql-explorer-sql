import React from 'react';

import { ReactComponent as LoaderSVG } from '../../../assets/imgs/loader.svg';
import Table from './Table';

const TableSection = React.memo(({
  isFetching,
  isError,
  result,
}) => {
    if (isError) {
      return (
        <section className="col-start-1 col-end-3 row-start-3 row-end-4 text-white m-6">
          <h1 className="text-center font-bold text-xl text-primary-dark">
            Something Went Wrong{" "}
            <span role="img" aria-label="sad face">
              😔
            </span>
          </h1>
        </section>
      )
    }

    return (
      <section className="table-wrapper col-start-1 col-end-3 row-start-3 row-end-4 text-white my-12 overflow-hidden">
        {isFetching ? (
          <LoaderSVG className="w-20 mx-auto" />
        ) : (
          <Table
            columns={result ? result.columns : []}
            data={result ? result.data : []}
          />
        )}
      </section>
    )
});

export default TableSection
