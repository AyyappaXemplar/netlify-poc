import React from 'react'
import { ReactComponent as InsureonlineLogo } from "../../images/insureOnlineLogo.svg"
import FcicLogo from "../shared/FcicLogo"

const CompanyLogo = () => {
    const company_origin = localStorage.getItem("companyOrigin")

    const logo = () => {
        switch (company_origin) {
            case "INSUREONLINE":
                return <InsureonlineLogo className="logo"/>
            case "FCIC":
                return <FcicLogo className="logo mt-3"/>
            default:
                return <InsureonlineLogo className="logo"/>
        }
    }
    return logo()
}

export default CompanyLogo
