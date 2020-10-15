import React from 'react';
import { Redirect } from 'react-router-dom';
import QuotesNew from './containers/QuotesNew';
import QuotesEdit from './containers/QuotesEdit';
import QuotesNotCovered from './components/main/QuotesNotCovered';
import VehiclesNew from './containers/VehiclesNew';
import VehiclesEdit from './containers/VehiclesEdit';
import Quotes from './components/main/Quotes';
import QuotesSubmit from './components/main/QuotesSubmit';
import Rate from './containers/Rate';
import RatesCompare from './components/main/RatesCompare';
import DriversNew from './containers/DriversNew';
import DriversEdit from './containers/DriversEdit';

const routes = [
  { path:'/', exact: true, main: (props) => <Redirect to="/quotes/new" /> },
  { path:'/quotes/new',    main: (props) => <QuotesNew   {...props} />},
  { path:'/quotes/edit',   main: (props) => <QuotesEdit  {...props} />},
  { path:'/quotes/submit', main: (props) => <QuotesSubmit {...props} /> },
  { path:'/quotes/rates',  main: (props) => <Rate {...props} /> },
  { path:'/quotes/rates/compare',  main: (props) => <RatesCompare {...props} /> },
  { path:'/quotes/not-covered', main: (props) => <QuotesNotCovered  {...props} />},
  { path:'/quotes/:resource(vehicles|drivers|discounts|review)', main: (props) => <Quotes {...props} />},
  { path:'/vehicles/new',  main: (props) => <VehiclesNew {...props} />},
  { path:'/vehicles/:vehicleId/edit', main: (props) => <VehiclesEdit {...props} />},
  { path:'/drivers/new',   main: (props) => <DriversNew   {...props} />},
  { path:'/drivers/:driverId/edit' , main: (props) => <DriversEdit {...props} />},
  { path:'/:page',         main: (props) => <Redirect to="/quotes/new" /> }
];

export default routes
