import React from 'react'

const ThemeSelector = ({ children }) => {
  const DefaultTheme = React.lazy(() => import("./themes/DefaultTheme"))
  const FcicTheme = React.lazy(() => import("./themes/FcicTheme"))
  const FCIC = "FCIC"
  const company_origin = localStorage.getItem("companyOrigin")
  const INSUREONLINE = "INSUREONLINE"
  const origin = new URLSearchParams(window.location.search);

  let setTheme = () => {
    if (origin.has("origin") && origin.get("origin") === FCIC) {
      window.localStorage.setItem("companyOrigin", FCIC)
      return <FcicTheme />
    }
    else {
      return <DefaultTheme />
    }
  }

  return (
    <>
      <React.Suspense fallback={<></>}>
        {
          setTheme()
        }
        {((company_origin === INSUREONLINE) || !company_origin) && <DefaultTheme/>}
        {company_origin === FCIC && <FcicTheme/>}
      </React.Suspense>
      {children}
    </>
  )
}

export default ThemeSelector
