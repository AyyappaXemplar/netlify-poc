import React from 'react';
import { Redirect } from 'react-router-dom';
import QuotesNew from './components/main/QuotesNew';
import QuotesEdit from './containers/QuotesEdit';
import QuotesNotCovered from './components/main/QuotesNotCovered';
import VehiclesNew from './containers/VehiclesNew';
import VehiclesEdit from './components/main/VehiclesEdit';
import VehiclesCoverages from './components/main/VehiclesCoverages';
import Quotes from './components/main/Quotes';
import Rate from './components/main/Rate';
import RatesCompare from './components/main/RatesCompare';
import DriversNew from './containers/DriversNew';
import DriversEdit from './containers/DriversEdit';

const routes = [
  // TODO: handle query params in home route such as ?zip=60647
  { path: '/', exact: true, main: (props) => <Redirect to="/quotes/new" /> },
  { path: '/quotes/new',    main: (props) => <QuotesNew   {...props} />},
  { path: '/quotes/edit',   main: (props) => <QuotesEdit  {...props} />},
  { path: '/quotes/not-covered', main: (props) => <QuotesNotCovered  {...props} />},
  { path: '/quotes/:resource(vehicles|drivers|discounts|review)', main: (props) => <Quotes {...props} />},
  { path: '/vehicles/new',  main: (props) => <VehiclesNew {...props} />},
  { path: '/vehicles/:vehicleId/edit-coverages', main: (props) => <VehiclesCoverages {...props} />},
  { path: ['/vehicles/:vehicleId/edit',
           '/rates/vehicles/:vehicleId/edit'], main: (props) => <VehiclesEdit {...props} />},
  { path: '/drivers/new',   main: (props) => <DriversNew   {...props} />},
  { path: '/drivers/:driverId/edit' , main: (props) => <DriversEdit {...props} />},
  { path: '/rates/compare',  main: (props) => <RatesCompare {...props} /> },
  { path: '/rates',  main: (props) => <Rate {...props} /> },
  { path: '/:page',         main: (props) => <Redirect to="/quotes/new" /> }
];

export default routes
