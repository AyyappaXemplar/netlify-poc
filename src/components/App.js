import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import QuotesNew from './main/QuotesNew';
import QuotesEdit from './main/QuotesEdit';
import QuotesNotCovered from './main/QuotesNotCovered';
import VehiclesNew from './main/VehiclesNew';
import VehiclesIndex from '../containers/VehiclesIndex';
import DriversNew from '../containers/DriversNew';
import { withTranslation } from 'react-i18next';
import CustomAlert from './shared/Alert';
import Header from './Header';

class App extends React.Component {
  render() {
    const myProps = this.props
    const { alert } = this.props.state

    return (
      <React.Fragment>
        { alert && <CustomAlert alert={alert} {...myProps} /> }
        <Header {...myProps}/>
        <main>
          <Switch>
            <Route path='/' exact    render={ props => <Redirect to="/quotes/new" /> } />
            <Route path='/quotes/new'   render={ props => <QuotesNew {...props} {...myProps} /> }/>
            <Route path='/quotes/edit'  render={ props => <QuotesEdit  {...props} {...myProps} /> }/>
            <Route path='/quotes/not-covered'  render={ props => <QuotesNotCovered  {...props} {...myProps} /> }/>
            <Route path='/vehicles/new' render={ props => <VehiclesNew {...props} {...myProps} /> }/>
            <Route path='/vehicles'     render={ props => <VehiclesIndex {...props} {...myProps} /> }/>
            <Route path='/drivers/new'  render={ props => <DriversNew {...props} {...myProps} /> }/>
            <Route path='/:page' render={ props => <Redirect to="/quotes/new" /> }/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default withTranslation()(App);
