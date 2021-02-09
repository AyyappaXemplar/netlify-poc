import React from "react";
import { Image } from "react-bootstrap";

import IconListItem from "../../shared/bind-online/IconListItem";

import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";
import { ReactComponent as InfoIcon }  from "../../../images/Info.svg";
import stackIcon                       from "../../../images/icon-stacks.svg";

import { getPolicyCoveragesFromQuote, getCoverageValues } from '../../../services/coverages'

export default function PolicyCoverages({ quote }) {
  const check = <CheckIcon className={"checkbox"} />;
  const info = <InfoIcon className={"infoIcon"} />;

  const coverages = getPolicyCoveragesFromQuote(quote)

  const renderPolicies = () => {
    return coverages.map((coverage, index) => {
      return (
        <IconListItem
          index={index}
          header={coverage.description}
          infoIcon={info}
          copy={getCoverageValues(coverage)}
          check={check}
          key={index}
          flexRow={true}
          shadow={false}
        />
      );
    });
  };

  return (
    <>
      <label>Policy Coverages</label>
      <div className='bg-white rounded shadow-sm mb-5 p-4'>
        {renderPolicies()}
        <div className="d-flex flex-row align-items-center coverage-note mt-3">
          <Image width="28px" height="32px" src={stackIcon} className="mr-3"/>
          <div>
            Full coverage offers both coverage for the people and property
            you hurt or damage – along with you or your vehicle.
          </div>
        </div>
      </div>
    </>
  );
}
