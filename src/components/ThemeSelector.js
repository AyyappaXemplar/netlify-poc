import React from 'react'

const ThemeSelector = ({ children }) => {
  const DefaultTheme = React.lazy(() => import("./themes/DefaultTheme"))
  const TexasRangerTheme = React.lazy(() => import("./themes/TexasRangerTheme"))

  const company_origin = localStorage.getItem("companyOrigin")

  const INSUREONLINE = "INSUREONLINE"
  const FCIC = "FCIC"

  return (
    <>
      <React.Suspense fallback={<></>}>
        {((company_origin === INSUREONLINE) || !company_origin) && <DefaultTheme/>}
        {company_origin === FCIC && <TexasRangerTheme/>}
      </React.Suspense>
      {children}
    </>
  )
}

export default ThemeSelector