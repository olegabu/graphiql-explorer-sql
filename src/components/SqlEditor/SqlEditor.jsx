import React, { useState, Suspense } from 'react';
import { Resizable } from 're-resizable';
import toast from 'react-hot-toast';

import { SQL_QUERY_URL } from '../../constants/constants';
import Loader from '../UI/Loader';
import '../../assets/output.css';
import TableSection from './Table/TableSection';
import './sqlEditor.css';

const Editor = React.lazy(() => import('./Editor/Editor'));

const SqlEditor = ({ onClose, onUpdateConsole }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isRunQuery, setIsRunQuery] = useState(false);
  const [result, setResult] = useState(null);
  const [isCreateView, setIsCreateView] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRunQuery = (query) => {
    setIsFetching(true);
    setIsRunQuery(true);
    setIsCreateView(false);
    setError('');
    setSuccess('');

    fetch(SQL_QUERY_URL, {
      method: 'POST',
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.text())
      .then((responseBody) => {
        try {
          return JSON.parse(responseBody)
        } catch (e) {
          return responseBody
        }
      })
      .then(response => {
        if (response.error) {
          throw response.error;
        }

        if (response.result && response.result.length > 0) {
          setResult({
            columns: response.result[0]
              .map(column => ({ title: column, field: column })),
            data: response.result
              .slice(1)
              .map(row => row.reduce((acc, item, index) => ({ ...acc, [response.result[0][index]]: item }), {})),
          });
        }
        setIsFetching(false);
      })
      .catch((error) => {
        if (typeof error === 'string') {
          setError(error);
        } else {
          setError(error.message);
        }
        setIsFetching(false);
      });
  }

  const handleCreateView = (query, viewName) => {
    setIsFetching(true);
    setIsCreateView(true);
    setError('');
    setSuccess('');

    fetch(SQL_QUERY_URL, {
      method: 'POST',
      body: JSON.stringify({
        query,
        viewName,
      }),
    })
      .then((response) => response.text())
      .then((responseBody) => {
        try {
          return JSON.parse(responseBody)
        } catch (e) {
          return responseBody
        }
      })
      .then(() => {
        setSuccess('View was successfully created');
        setIsFetching(false);
        onUpdateConsole();
      })
      .catch((error) => {
        if (typeof error === 'string') {
          setError(error);
        } else {
          setError(error.message);
        }
        setIsFetching(false);
      });
  }

  return (
    <Resizable
      defaultSize={{ width: '30vw' }}
      minWidth="15vw"
      maxWidth="50vw"
      axis="x"
      enable={{ right: true }}
      handleWrapperClass="sql-editor-handle-wrapper"
    >
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
                onRunQuery={handleRunQuery}
                onCreateView={handleCreateView}
                isFetching={isFetching}
              />
              {
                isRunQuery && (
                  <TableSection
                    isFetching={!isCreateView && isFetching}
                    result={result}
                    error={error}
                    success={success}
                  />
                )
              }
            </Suspense>
          </div>
        </div>
      </div>
    </Resizable>
  )
}

export default SqlEditor
