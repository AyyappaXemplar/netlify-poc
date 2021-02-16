

import React from 'react'
import {Image} from "react-bootstrap"
const CircleIcon = ({ iconSrc }) => {
    const styles = {
        width: "57px",
        height: "57px",
        backgorundColor:"#FEEFE9"
    }
    return (
        <div {...styles}>
            <Image roundedCircle src={iconSrc} />
        </div>
    )
}

export default CircleIcon
