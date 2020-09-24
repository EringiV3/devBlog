import React from "react"
import { THEME_UI_COLOR_LIGHT_GRAY, THEME_UI_COLOR_PRIMARY } from "../constants"

export default () => {
  return (
    <>
      <footer className="footer">
        <div className="copyright">
          © 2020 by EringiV3. All rights reserved.
        </div>
      </footer>
      <style jsx>{`
        .footer {
          margin-top: 60px;
          padding-top: 15px;
          border-top: 1px solid ${THEME_UI_COLOR_LIGHT_GRAY};
        }
        .copyright {
          color: ${THEME_UI_COLOR_PRIMARY};
        }
      `}</style>
    </>
  )
}
