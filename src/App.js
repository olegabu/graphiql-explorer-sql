import React, { useState, useRef } from "react"
import { Toaster } from 'react-hot-toast';
import Console from "./components/Console/Console"
import SqlEditor from "./components/SqlEditor/SqlEditor"

const App = () => {
    const [sqlEditorVisible, setSqlEditorVisible] = useState(false)
    const consoleRef = useRef(null)

    const handleSqlEditorVisible = () => {
        setSqlEditorVisible(!sqlEditorVisible)
    }

    const closeSqlEditor = () => {
        setSqlEditorVisible(false);
    }

    const handleUpdateConsole = () => {
        if (consoleRef.current) {
            consoleRef.current.getSchema();
        }
    };

    return (
        <div className='wrapper'>
            {sqlEditorVisible && (
              <SqlEditor
                onClose={closeSqlEditor}
                onUpdateConsole={handleUpdateConsole}
              />
            )}
            <Console
              handleSqlEditorVisible={handleSqlEditorVisible}
              ref={consoleRef}
            />
            <Toaster
              toastOptions={{
                  position: 'bottom-right',
                  style: {
                      border: '1px solid #e0e0e0',
                  },
              }}
            />
        </div>
    )
}

export default App
