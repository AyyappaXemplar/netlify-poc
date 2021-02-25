import React                from "react";
import { withTranslation }  from 'react-i18next';
import IconListItem         from "../../shared/bind-online/IconListItem";
import StackedIcon          from '../../shared/stacked_icon_lg';

import { getPolicyCoveragesFromQuote, getCoverageValues } from '../../../services/coverages'

function PolicyCoverages({ quote, children, strength, showBottomText = true, t }) {
  
  const coverages = getPolicyCoveragesFromQuote(quote);
  
  const content = t(`coverages.${strength}`)


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
            <div className='mr-3 svg-container col-2'>
              <StackedIcon strength={strength}/>
            </div>
            <div>
             <small> {content.message}</small>
            </div>
          </div>
        </div>
      }
    </div>
  );
}


export default withTranslation(['vehicles'])(PolicyCoverages)
