import React from "react";
import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";
import { withTranslation } from 'react-i18next';

const IconListItem = ({ copy, header, t }) => {

  const camelCasedKeys = (header) => header.split(" ").join("")
  console.log("header", header);
  console.log("camelCasedKeys", camelCasedKeys);

  return (
    <div className="rate-item-card__attribute d-flex justify-content-between">
      <div className='title d-flex align-items-center font-weight-bolder'>
        <CheckIcon className='text-success flex-none' width="18px" height="18px" />
        {t(`coveragesList.${camelCasedKeys(header)}`)}
      </div>
      <div className='value text-capitalize'>{copy}</div>
    </div>
  )
};

export default withTranslation(["vehicles"])(IconListItem);