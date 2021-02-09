import React        from "react";
import Driver    from '../driver/DriverReview'

const Drivers = ({ drivers }) => {
  return (
    <>
      <label>Drivers</label>
      <div className="mb-5">
        { drivers.map(driver => <Driver driver={driver} key={`driver=${driver.id}`}/> )}
      </div>
    </>
  );
};

export default Drivers;
