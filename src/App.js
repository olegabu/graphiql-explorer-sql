import React, { useState } from "react"
import Console from "./components/Console/Console"
import SqlEditor from "./components/SqlEditor/SqlEditor"

const App = () => {
    const [sqlEditorVisible, setSqlEditorVisible] = useState(false)

    const handleSqlEditorVisible = () => {
        setSqlEditorVisible(!sqlEditorVisible)
    }

    const closeSqlEditor = () => {
        setSqlEditorVisible(false);
    }

    return (
        <div className='wrapper'>
            {sqlEditorVisible && <SqlEditor onClose={closeSqlEditor} />}
            <Console handleSqlEditorVisible={handleSqlEditorVisible} />
        </div>
    )
}

export default App
