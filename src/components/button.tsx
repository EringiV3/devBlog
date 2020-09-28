import React from "react"
import { THEME_UI_COLOR_SECONDARY } from "../constants"

type Props = { label: string }
const Button: React.FC<Props> = ({ label }) => {
  return (
    <>
      <button className="button">{label}</button>
      <style jsx>{`
        .button {
          margin-top: 5px;
          cursor: pointer;
          color: #fff;
          background-color: ${THEME_UI_COLOR_SECONDARY};
          border-color: ${THEME_UI_COLOR_SECONDARY};
          display: inline-block;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          user-select: none;
          border: 1px solid transparent;
          padding: 0.375rem 0.75rem;
          line-height: 1.5;
          border-radius: 0.25rem;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }
      `}</style>
    </>
  )
}
export default Button
