import React, { useState, Suspense } from 'react';

import { SQL_QUERY_URL } from '../../constants/constants';
import Loader from '../UI/Loader';
import '../../assets/output.css';
import TableSection from './Table/TableSection';
import './sqlEditor.css';

const Editor = React.lazy(() => import('./Editor/Editor'));

const SqlEditor = ({ onClose }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRunQuery, setIsRunQuery] = useState(false);
  const [result, setResult] = useState(null);
  const [value, setValue] = useState('select * from customers');

  const handleRunQuery = () => {
    setIsFetching(true);
    setIsError(false);
    setIsRunQuery(true);

    fetch(SQL_QUERY_URL)
      .then((response) => response.text())
      .then((responseBody) => {
        try {
          return JSON.parse(responseBody)
        } catch (e) {
          return responseBody
        }
      })
      .then(result => {
        setResult(result);
        setIsFetching(false);
      })
      .catch(() => {
        setIsError(true);
        setIsFetching(false);
      });
  }

  return (
    <div className='sql-editor'>
      <div className="sql-editor-content">
        <div className="header">
          <div className="header-title">
            SQL Editor
          </div>
          <div className="doc-explorer-rhs" onClick={onClose}>
            <div className="close-icon">✕</div>
          </div>
        </div>
        <div className="sql-editor-container">
          <Suspense fallback={<Loader className="sql-editor-loader" />}>
            <Editor
              setQuery={handleRunQuery}
              value={value}
              setValue={setValue}
            />
            {
              isRunQuery && (
                <TableSection
                  isFetching={isFetching}
                  isError={isError}
                  result={result}
                />
              )
            }
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default SqlEditor
