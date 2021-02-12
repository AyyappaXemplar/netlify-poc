import React        from "react";
import Vehicle   from '../../rate/Vehicle'

const Vehicles = ({ vehicles, displayCoverageSelector, forceShowEditUi, hideEyebrowText }) => {
  return (
    <>
      {hideEyebrowText === true ? null : <label>Vehicles and Coverages</label>}

      <div className='mb-5'>
        {vehicles.map(vehicle =>
          <Vehicle key={`vehicle-${vehicle.id}`} vehicle={vehicle}
            displayCoverageSelector={displayCoverageSelector}
            displayPremiums={false}
            forceShowEditUi={forceShowEditUi}/>
        )}
      </div>
    </>
  );
};

export default Vehicles;
