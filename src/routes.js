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
import BOLPolicyDetails from './components/bind-online/PolicyDetails';
import BOLDriverForm   from './components/bind-online/DriverForm';
import BOLVehicleForm   from './components/bind-online/VehicleForm';
import BolCoveragesReview   from './components/bind-online/CoveragesReview';
import BolReview from './components/bind-online/BolReview'
import {QuoteReview} from './components/bind-online/QuoteReview'
import QuoteVehicles from './components/bind-online/QuoteVehicles'
import QuoteDrivers  from './components/bind-online/QuoteDrivers'
import BOLRate from './components/bind-online/Rates'
import Questions from "./components/bind-online/Questions"
import Payments from "./components/bind-online/Payments"
import Confirmation from "./components/bind-online/Confirmation"
import Signatures from "./components/bind-online/Signatures"

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
  { path: '/bol/coverages', main: (props) => <BolCoveragesReview {...props}/> },
  { path: '/bol/questions/edit', main: (props) => <Questions {...props} /> },
  { path: '/rates/:quoteId/compare',  main: (props) => <RatesCompare {...props} /> },
  { path: '/contact-us', main: (props) => <ContactUs {...props} /> },
  { path: '/bol/policy-details', main: (props) => <BOLPolicyDetails {...props} /> },
  { path: '/bol/rate', exact: true, main: (props) => <BolReview {...props} /> },
  { path: '/bol/quotes/review/', main: (props) => <QuoteReview {...props} /> },
  { path: '/bol/quotes/drivers', main: (props) => <QuoteDrivers {...props}/> },
  { path: '/bol/quotes/vehicles', main: (props) => <QuoteVehicles {...props} /> },
  { path: '/bol/quotes/:quoteId/rates', main: (props) => <BOLRate {...props}/> },
  { path: '/bol/drivers/:driverId/edit',  main: (props) => <BOLDriverForm {...props}/> },
  { path: '/bol/vehicles/:vehicleId/edit', main: (props) => <BOLVehicleForm {...props}/> },
  { path: '/bol/coverages/', main: (props) => <BolCoveragesReview {...props} /> },
  { path: '/bol/payments/', main: (props) => <Payments {...props} /> },
  { path: '/bol/quotes/:quoteId/confirmation/', main: (props) => <Confirmation {...props}/> },
  { path: '/bol/signatures', main: (props) => <Signatures {...props} /> },
  { path: '/:page',      main: (props) => <Redirect to="/quotes/new" /> }
];

export default routes
