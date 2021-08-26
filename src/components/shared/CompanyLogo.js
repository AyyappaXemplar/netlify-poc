import React from 'react'
import { ReactComponent as InsureonlineLogo } from "../../images/insureOnlineLogo.svg"
import FcicLogo from "../shared/FcicLogo"

const CompanyLogo = () => {
  const IO = "INSUREONLIEN";
  const FCIC = "FCIC";
  const urlParamOrigin = new URLSearchParams(window.location.search);

  const company_origin = () => {
    if ( urlParamOrigin.get('origin') === FCIC || localStorage.getItem("companyOrigin") === FCIC) {
      return FCIC
    }
    else {
      return IO
    }
  }

    const logo = () => {
        switch (company_origin()) {
            case IO:
                return <InsureonlineLogo className="logo"/>
            case FCIC:
                return <FcicLogo className="logo mt-3"/>
            default:
                return <InsureonlineLogo className="logo"/>
        }
    }
    return logo()
}

export default CompanyLogo
