import React from "react";
import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";
import { ReactComponent as InfoIcon }  from "../../../images/Info.svg";

const IconListItem = ({copy, header, index}) => {
  return (
    <div className="rate-item-card__attribute d-flex justify-content-between">
      <div className='title d-flex align-items-center font-weight-bolder'>
        <CheckIcon className='text-success flex-none' width="18px" height="18px" />
        {header}
      </div>
      <div className='value text-capitalize'>{copy}</div>
    </div>
  )
};

export default IconListItem;



