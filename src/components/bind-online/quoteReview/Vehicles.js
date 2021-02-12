import React        from "react";
import Vehicle   from '../../rate/Vehicle'

const Vehicles = ({ vehicles, displayCoverageSelector, forceShowEditUi }) => {
  return (
    <>
      <label>Vehicles and Coverages</label>

      <div className='mb-5'>
        {vehicles.map(vehicle =>
          <Vehicle key={`vehicle-${vehicle.id}`} vehicle={vehicle}
            displayCoverageSelector={false}
            forceShowEditUi={false}/>
        )}
      </div>
    </>
  );
};

export default Vehicles;
