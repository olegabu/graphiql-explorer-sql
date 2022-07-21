import React, { useState } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-min-noconflict/ext-language_tools"
import "ace-builds/src-min-noconflict/mode-mysql"
import "ace-builds/src-noconflict/theme-github"

import Button from "../../UI/Button/Button";
import "./editor.css";

const Editor = ({ onCreateView, onRunQuery, isFetching }) => {
  const [value, setValue] = useState('select * from customers \n\n\n\n\n\n\n\n\n');
  const [isCreateView, setIsCreateView] = useState(false);
  const [viewName, setViewName] = useState('');

  const handleChangeEditor = (newValue) => {
    setValue(newValue)
  }

  const onSubmit = () => {
    const query = value.toLowerCase();
    onRunQuery(query)
  }

  const handleChange = (event) => {
    setViewName(event.target.value);
  }
  const handleClickCreateView = () => {
    onCreateView();
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
        <div className="button-wrapper">
          <div className="create-view-container">
            {
              isCreateView ? (
                <>
                  <input
                    value={viewName}
                    onChange={handleChange}
                    placeholder="View name"
                  />
                  <Button handleClick={handleClickCreateView} className="button">
                    Create view
                  </Button>
                  <Button handleClick={() => setIsCreateView(false)} className="switch-create-view">
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
        </div>
      </main>
  )
}

export default Editor
