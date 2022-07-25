import React, { useState } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-min-noconflict/ext-language_tools"
import "ace-builds/src-min-noconflict/mode-mysql"
import "ace-builds/src-noconflict/theme-github"

import { DEFAULT_SQL_QUERY } from '../../../constants/constants';
import Button from "../../UI/Button/Button";
import "./editor.css";

const Editor = ({ onCreateView, onRunQuery }) => {
  const [value, setValue] = useState(DEFAULT_SQL_QUERY);
  const [isCreateView, setIsCreateView] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [viewName, setViewName] = useState('');

  const handleChangeEditor = (newValue) => {
    setValue(newValue)
  }

  const onSubmit = () => {
    const query = value.toLowerCase();
    onRunQuery(query)
  }

  const handleChange = (event) => {
    setIsInvalid(false);
    setViewName(event.target.value);
  }
  const handleClickCreateView = () => {
    const query = value.toLowerCase();
    const viewNameTrim = viewName.trim();
    if (viewNameTrim) {
      onCreateView(query, viewNameTrim);
    } else {
      setIsInvalid(true);
    }
  }

  return (
      <main className="col-start-1 col-end-3 row-start-2 row-end-3">
        <div className="space" />
        <label htmlFor="editor">
            <AceEditor
                id="editor"
                aria-label="editor"
                mode="mysql"
                theme="github"
                name="editor"
                fontSize={13}
                minLines={10}
                maxLines={10}
                width="100%"
                showPrintMargin={false}
                highlightActiveLine={false}
                showGutter
                placeholder="Write your Query here..."
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    fixedWidthGutter: true,
                }}
                value={value}
                onChange={handleChangeEditor}
                showLineNumbers
            />
        </label>
        <div className="buttons-wrapper">
          {
            isCreateView ? (
              <>
                <Button handleClick={handleClickCreateView} className="button button-create-view">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                  >
                    <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/>
                  </svg>
                  Create view
                </Button>
                <div className="input-container" data-invalid={isInvalid}>
                  <input
                    value={viewName}
                    onChange={handleChange}
                    placeholder="View name"
                  />
                </div>
                <Button
                  handleClick={() => setIsCreateView(false)}
                  className="switch-create-view"
                >
                  or run query
                </Button>
              </>
            ) : (
              <>
                <Button handleClick={onSubmit} className="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  Run Query
                </Button>
                <Button handleClick={() => setIsCreateView(true)} className="switch-create-view">
                  or create view
                </Button>
              </>
            )
          }
        </div>
      </main>
  )
}

export default Editor
