import React from 'react'
import { ReactComponent as InsureonlineLogo } from "../images/insureOnlineLogo.svg"
import FcicLogo from "./shared/FcicLogo"

const CompanyLogo = () => {
    const company_origin = localStorage.getItem("companyOrigin")

    const logo = () => {
        switch (company_origin) {
            case "INSUREONLINE":
                return 
                break;
            case "FCIC":

            default:
                break;
        }
    }
    return (
        <div>
            
        </div>
    )
}

export default CompanyLogo