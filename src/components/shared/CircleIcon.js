

import React from 'react'
import {Image} from "react-bootstrap"
const CircleIcon = ({ iconSrc }) => {
    const styles = {
        width: "57px",
        height: "57px",
        background: "#FEEFE9",
        borderRadius:"50%"
    }
    return (
        <div style={{ ...styles }} className="d-flex align-items-center justify-content-center circle">
            <Image src={iconSrc} />
        </div>
    )
}

export default CircleIcon
