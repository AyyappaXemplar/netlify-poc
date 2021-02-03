import React from 'react';
import { Redirect } from 'react-router-dom';
import QuotesNew from './components/main/QuotesNew';
import QuotesEdit from './components/main/QuotesEdit';
import QuotesNotCovered from './components/main/QuotesNotCovered';
import VehiclesNew from './containers/VehiclesNew';
import VehiclesEdit from './components/main/VehiclesEdit';
import VehiclesCoverages from './components/main/VehiclesCoverages';
import Quotes from './components/main/Quotes';
import Rate from './components/main/Rate';
import RatesCompare from './components/main/RatesCompare';
import DriversNew from './containers/DriversNew';
import DriversEdit from './containers/DriversEdit';
import ContactUs from './components/main/ContactUs';
import BOL          from './components/bind-online/bol';
import BOLPolicyDetails from './components/bind-online/PolicyDetails';
import BOLDriversForm   from './components/bind-online/driver/DriverForm';
import BolReview from './components/bind-online/BolReview'
import {QuoteReview} from './components/bind-online/QuoteReview'

const routes = [
  { path: '/', exact: true, main: (props) => <Redirect to="/quotes/new" /> },
  { path: '/quotes/new',    main: (props) => <QuotesNew   {...props} />},
  { path: '/quotes/edit',   main: (props) => <QuotesEdit  {...props} />},
  { path: '/quotes/not-covered', main: (props) => <QuotesNotCovered  {...props} />},
  { path: '/quotes/:quoteId/rates',      main: (props) => <Rate {...props} /> },
  { path: '/quotes/:resource(vehicles|drivers|review)', main: (props) => <Quotes {...props} />},
  { path: '/vehicles/new',  main: (props) => <VehiclesNew {...props} />},
  { path: '/vehicles/:vehicleId/edit-coverages', main: (props) => <VehiclesCoverages {...props} />},
  { path: ['/vehicles/:vehicleId/edit',
           '/rates/vehicles/:vehicleId/edit'], main: (props) => <VehiclesEdit {...props} />},
  { path: '/drivers/new',   main: (props) => <DriversNew   {...props} />},
  { path: ['/drivers/:driverId/edit',
           '/rates/drivers/:driverId/edit'] , main: (props) => <DriversEdit {...props} />},
  { path: '/rates/:quoteId/compare',  main: (props) => <RatesCompare {...props} /> },
  { path: '/contact-us', main: (props) => <ContactUs {...props} /> },
  { path: '/bol', exact: true, main: (props) => <BOL {...props} /> },
  { path: '/bol/policy-details', main: (props) => <BOLPolicyDetails {...props} /> },
  { path: '/bol/rate', exact: true, main: (props) => <BolReview {...props} /> },
  { path: '/bol/quote-review/', main: (props) => <QuoteReview {...props} /> },
  { path: '/bol/quotes/drivers', main: (props) => <h1>drivers</h1> },
  { path: '/bol/drivers/:driverId/edit', main: (props) => <BOLDriversForm {...props}/> },
  { path: '/bol/rate', exact: true, main: (props) => <BolReview {...props}/> },
  { path: '/:page',      main: (props) => <Redirect to="/quotes/new" /> }
];

export default routes
