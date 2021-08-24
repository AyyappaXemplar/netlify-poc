import React               from 'react';
import { withTranslation } from 'react-i18next';

import { formatMoney }    from '../../services/payment-options'

import CoverageStrength        from '../shared/CoverageStrength';
import VehicleInfo             from '../shared/VehicleInfo';
import CoveragePricing         from '../shared/CoveragePricing';
import VehicleCoverages        from './VehicleCoverages';
import VehicleCoverageSelector from './VehicleCoverageSelector';

function RatedQuoteVehicle({ vehicle, t, displayCoverageSelector = true, displayPremiums = true,
                             isBolQuotesRates, forceShowEditUi, excludePolicyCoverages,
                             fullInfo, rate }) {
  const { vehicle_premium } = vehicle

  const premium = formatMoney(vehicle_premium / 100)

  return (
    <div className='w-100 h-100 rate-item-card vehicle-rate-item bg-white rounded'>
      <VehicleInfo vehicle={vehicle} fullInfo={fullInfo} forceShowEditUi={forceShowEditUi}
        isBolQuotesRates={isBolQuotesRates}/>
        
      { displayCoverageSelector && <VehicleCoverageSelector vehicle={vehicle} rate={rate}/> }

      { displayPremiums &&
        <div className="d-flex flex-sm-row flex-column mb-4">
          <div className="w-sm-60 d-flex price-container mb-4 mb-sm-0">
            <p className="price-container__price mb-0">
              <sup className="price-container__dollar">$</sup>
              {premium}
            </p>
            <span className="price-container__text align-self-end text-med-dark ml-1">{t("per")}<br/>{t("term")}</span>
          </div>
          <div className="w-sm-40">
            <div className="mb-3">
              <CoverageStrength strength={vehicle.coverage_package_name}/>
            </div>
            <CoveragePricing strength={vehicle.coverage_package_name}/>
          </div>
        </div>
      }

      <VehicleCoverages isBolQuotesRates={isBolQuotesRates} vehicle={vehicle} excludePolicyCoverages={excludePolicyCoverages} rate={rate}/>

    </div>
  )
}

export default withTranslation(['vehicles'])(RatedQuoteVehicle)
