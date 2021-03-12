import React from 'react';
import CustomProgressBar                    from './components/shared/CustomProgressBar'
import BolCustomProgressBar                 from './components/shared/bind-online/BolCustomProgressBar'
import FinalCustomProgressBar               from './components/shared/bind-online/FinalCustomProgressBar'
import { progressBarStatus as status,
         bolProgressBarStatus as bolStatus,
         finalProgressBarStatus as finalStatus  } from './constants/progress-bar'

const progressBarRoutes = [
  { path:'/bol/policy-details',  render: (props) => <BolCustomProgressBar progress={bolStatus.POLICY} />},
  { path:'/bol/:quotes?/drivers',  render: (props) => <BolCustomProgressBar progress={bolStatus.DRIVERS} />},
  { path:'/bol/:quotes?/vehicles', render: (props) => <BolCustomProgressBar progress={bolStatus.VEHICLES} />},
  { path:'/bol/coverages',         render: (props) => <BolCustomProgressBar progress={bolStatus.COVERAGES} />},
  { path:'/bol/questions',         render: (props) => <BolCustomProgressBar progress={bolStatus.QUESTIONS} />},
  { path:'/bol/quotes/review',     render: (props) => <BolCustomProgressBar progress={bolStatus.REVIEW} />},
  { path:'/bol/payments',          render: (props) => <FinalCustomProgressBar progress={finalStatus.PAYMENTS} />},
  { path:'/bol/signatures',        render: (props) => <FinalCustomProgressBar progress={finalStatus.SIGNATURES} />},
  { path:'/bol/quotes/:quoteId/confirmation',     render: (props) => <FinalCustomProgressBar progress={finalStatus.CONFIRMATION} />},
  { path:'/quotes/:action(new|edit|not-covered)', render: (props) => <CustomProgressBar progress={status.START} />},
  { path:'/:quotes?/vehicles',   render: (props) => <CustomProgressBar progress={status.VEHICLES} />},
  { path:'/:quotes?/drivers',    render: (props) => <CustomProgressBar progress={status.DRIVERS} />},
  { path:'/:quotes?/discounts',  render: (props) => <CustomProgressBar progress={status.DISCOUNTS} />},
  { path:'/:quotes?/review',     render: (props) => <CustomProgressBar progress={status.REVIEW} />}
];

export default progressBarRoutes
