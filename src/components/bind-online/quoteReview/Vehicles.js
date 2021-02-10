import React        from "react";
import Vehicle   from '../../rate/Vehicle'

const Vehicles = ({ vehicles }) => {
  return (
    <>
      <label>Vehicles and Coverages</label>

      <div className='mb-5'>
        {vehicles.map(vehicle =>
          <Vehicle key={`vehicle-${vehicle.id}`} vehicle={vehicle}
            displayCoverageSelector={false}
            displayPremiums={false} />
        )}
      </div>
    </>
  );
};

export default Vehicles;
