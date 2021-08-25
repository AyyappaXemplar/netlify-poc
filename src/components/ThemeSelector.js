import React from 'react'

const ThemeSelector = ({ children }) => {
  const DefaultTheme = React.lazy(() => import("./themes/DefaultTheme"))
  const FcicTheme = React.lazy(() => import("./themes/FcicTheme"))

  const company_origin = localStorage.getItem("companyOrigin")

  const INSUREONLINE = "INSUREONLINE"
  const FCIC = "FCIC"

  return (
    <>
      <React.Suspense fallback={<></>}>
        {((company_origin === INSUREONLINE) || !company_origin) && <DefaultTheme/>}
        {company_origin === FCIC && <FcicTheme/>}
      </React.Suspense>
      {children}
    </>
  )
}

export default ThemeSelector