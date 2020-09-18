import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import QuotesNew from '../containers/QuotesNew';
import QuotesEdit from '../containers/QuotesEdit';
import QuotesNotCovered from './main/QuotesNotCovered';
import VehiclesNew from '../containers/VehiclesNew';
import VehiclesEdit from '../containers/VehiclesEdit';
import Quotes from '../containers/Quotes';
import QuotesSubmit from '../containers/QuotesSubmit';
import QuotesRate from '../containers/QuotesRate';
import DriversNew from '../containers/DriversNew';
import DriversEdit from '../containers/DriversEdit';
import CustomAlert from './shared/CustomAlert';
import Header from './Header';

class App extends React.Component {
  render() {
    const myProps = this.props
    const { alert } = this.props.state

    return (
      <>
        { alert && <CustomAlert alert={alert} {...myProps} /> }
        <Header {...myProps}/>
        <main className='h-100 d-flex align-items-center flex-wrap'>
          <Container>
            <React.Suspense fallback={<div></div>}>
              <Switch>
                <Route path='/' exact    render={ props => <Redirect to="/quotes/new" /> } />
                <Route path='/quotes/new'   render={ props => <QuotesNew  {...props} {...myProps} /> }/>
                <Route path='/quotes/edit'  render={ props => <QuotesEdit {...props} {...myProps} /> }/>
                <Route path='/quotes/not-covered'  render={ props => <QuotesNotCovered  {...props} {...myProps} /> }/>
                <Route path='/vehicles/new'  render={ props => <VehiclesNew {...props} {...myProps} /> }/>
                <Route path='/vehicles/:vehicleId/edit' render={ props => <VehiclesEdit {...props} {...myProps} /> }/>
                {/* TODO allow quotes/:resource to accept just '/quotes' and remove complete  */}
                <Route path='/quotes/:resource(vehicles|drivers|discounts|complete)' render={ props => <Quotes {...props} {...myProps} /> }/>
                <Route path='/quotes/submit' render={ props => <QuotesSubmit {...props} /> }/>
                <Route path='/quotes/rate' render={ props => <QuotesRate {...props} /> }/>
                <Route path='/drivers/new'  render={ props => <DriversNew {...props} {...myProps} /> }/>
                <Route path='/drivers/:driverId/edit'  render={ props => <DriversEdit {...props} {...myProps} /> }/>
                <Route path='/:page' render={ props => <Redirect to="/quotes/new" /> }/>
              </Switch>
            </React.Suspense>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
