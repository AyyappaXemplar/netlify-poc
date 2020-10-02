import React from 'react';
import CustomProgressBar from './components/shared/CustomProgressBar'
import { ProgressBarStatus as Status } from './constants/progress-bar'

const progressBarRoutes = [
  { path:'/quotes/:action(new|edit|not-covered)', render: (props) => <CustomProgressBar progress={Status.START} />},
  { path:'/:quotes?/vehicles',   render: (props) => <CustomProgressBar progress={Status.VEHICLES} />},
  { path:'/:quotes?/drivers',    render: (props) => <CustomProgressBar progress={Status.DRIVERS} />},
  { path:'/:quotes?/discounts',  render: (props) => <CustomProgressBar progress={Status.DISCOUNTS} />},
  { path:'/:quotes?/review',     render: (props) => <CustomProgressBar progress={Status.REVIEW} />}
];

export default progressBarRoutes
