import React               from "react";
import Driver              from '../driver/DriverReview'
import { withTranslation } from 'react-i18next';


const Drivers = ({ drivers, t }) => {
  return (
    <>
      <label>{ t("driversLabel") }</label>
      <div className="mb-5">
        { drivers.map(driver => <Driver driver={driver} key={`driver=${driver.id}`}/> )}
      </div>
    </>
  );
};

export default withTranslation(['drivers'])(Drivers)
