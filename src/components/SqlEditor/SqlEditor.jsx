import React, { useState, Suspense } from 'react';
import { Resizable } from 're-resizable';

import { SQL_QUERY_URL } from '../../constants/constants';
import Loader from '../UI/Loader';
import '../../assets/output.css';
import TableSection from './Table/TableSection';
import './sqlEditor.css';

const Editor = React.lazy(() => import('./Editor/Editor'));

const SqlEditor = ({ onClose, onUpdateConsole }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isRunQuery, setIsRunQuery] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const postSqlQuery = async (body, successCallback) => {
    setIsFetching(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(SQL_QUERY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setIsFetching(false);

      if (!response.ok) {
        try {
          const responseJson = await response.json();
          setError(responseJson.message);
        } catch {
          setError(`${response.status}: ${response.statusText}`);
        }
        return;
      }

      const responseJson = await response.json();
      if (successCallback) {
        successCallback(responseJson);
      }
    } catch (error) {
      setIsFetching(false);
      setError(error.message);
    }
  };

  const handleRunQuery = (query) => {
    setIsRunQuery(true);

    postSqlQuery({ query }, (response) => {
      if (response.result && response.result.length > 0) {
        setResult({
          columns: response.result[0]
            .map(column => ({title: column, field: column})),
          data: response.result
            .slice(1)
            .map(row => row.reduce((acc, item, index) => ({...acc, [response.result[0][index]]: item}), {})),
        });
      }
    });
  }

  const handleCreateView = (query, viewName) => {
    setIsRunQuery(false);

    postSqlQuery({ query, viewName }, () => {
      setSuccess('View was successfully created');
      onUpdateConsole();
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
              <TableSection
                isFetching={isFetching}
                result={result}
                error={error}
                success={success}
                isRunQuery={isRunQuery}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Resizable>
  )
}

export default SqlEditor
