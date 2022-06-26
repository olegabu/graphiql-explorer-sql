import React, { useState } from "react"
import Console from "./components/Console/Console"
import SqlEditor from "./components/SqlEditor/SqlEditor"

const App = () => {
    const [sqlEditorVisible, setSqlEditorVisible] = useState(false)

    const handleSqlEditorVisible = () => {
        setSqlEditorVisible(!sqlEditorVisible)
    }

    return (
        <>
            {sqlEditorVisible && <SqlEditor />}
            <Console handleSqlEditorVisible={handleSqlEditorVisible} />
        </>
    )
}

export default App
