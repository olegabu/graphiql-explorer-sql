import React from "react"
import {classNames} from "../../modules/misc"

export const Button = ({children, className, handleClick}) => {
    return (
        <button
            className={classNames(
                "px-4 py-2 my-4",
                className
            )}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}
