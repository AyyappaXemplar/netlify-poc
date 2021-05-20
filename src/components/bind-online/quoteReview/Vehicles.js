import React        from "react";
import Vehicle   from '../../rate/Vehicle'
import { withTranslation } from 'react-i18next';

const Vehicles = ({ vehicles, displayCoverageSelector, forceShowEditUi, t }) => {
  return (
    <>
      <label>{t("vehiclesAndCoverages")}</label>

      <div className='mb-5'>
        {vehicles.map(vehicle =>
          <Vehicle key={`vehicle-${vehicle.id}`} vehicle={vehicle}
            displayCoverageSelector={false}
            forceShowEditUi={false}
            displayPremiums={false}
            excludePolicyCoverages={true}
          />
        )}
      </div>
    </>
  );
};

export default withTranslation(["rates"])(Vehicles);
