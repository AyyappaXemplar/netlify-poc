import React     from "react";

import IconListItem from "../../shared/bind-online/IconListItem";
import StackedIcon  from '../../shared/stacked_icon_lg';

import { getPolicyCoveragesFromQuote, getCoverageValues } from '../../../services/coverages'

export default function PolicyCoverages({ quote, children, strength, showBottomText=true, getCoverage }) {

  const coverages = getPolicyCoveragesFromQuote(quote)

  const renderPolicies = () => {
    return coverages.map((coverage, index) => {
      return (
        <IconListItem
          index={index}
          header={coverage.description}
          copy={getCoverageValues(coverage)}
          key={index}
        />
      );
    });
  };
  return (
    <div className="bg-white shadow-sm rounded mb-5 rate-policy">
      { children }
      <div>
        { renderPolicies() }
      </div>
      { showBottomText &&

        <div className="py-4">
          <div className="d-flex flex-row align-items-center coverage-note">
            <div className='mr-3 svg-container'>
              <StackedIcon strength={strength}/>
            </div>
            <div>
              {getCoverage()[0].message }
            </div>
          </div>
        </div>
      }
    </div>
  );
}
