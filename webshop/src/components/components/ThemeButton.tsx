import React from "react"
import { ThemeButtonProps } from "../../interfaces/Interfaces"


const ThemeButton: React.FC<ThemeButtonProps> = ({ input, modclassName }) => {
    return (
        <button className={`btn-themed ${modclassName}`} >
            {input}
        </button >
    )
}

export default ThemeButton