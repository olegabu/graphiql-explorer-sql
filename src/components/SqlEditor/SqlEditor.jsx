import React, { useState, Suspense } from "react"
import "../../assets/output.css"
import { Toaster } from "react-hot-toast"
import Loader from "../UI/Loader"
import './sqlEditor.css';

const Editor = React.lazy(() => import("./Editor/Editor"))
const TableSection = React.lazy(() => import("./Table/TableSection"))

const SqlEditor = ({ onClose }) => {
    const [query, setQuery] = useState("")
    const [value, setValue] = useState("select * from customers")

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
            <Toaster
                position="top-center"
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: "",
                    duration: 5000,
                    style: {
                        background: "#ffffff",
                        color: "#3A4374",
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: "#4661E6",
                            secondary: "#ffffff",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#D73737",
                            secondary: "#ffffff",
                        },
                    },
                }}
            />
            <div className="sql-editor-container">
                <Suspense fallback={<Loader />}>
                    <Editor
                        setQuery={setQuery}
                        value={value}
                        setValue={setValue}
                    />
                    {query ? <TableSection /> : null}
                </Suspense>
            </div>
          </div>
        </div>
    )
}

export default SqlEditor
