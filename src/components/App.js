import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import StartZip from './main/StartZip';
import StartInfo from './main/StartInfo';
import VehiclesAdd from './main/VehiclesAdd';
import VehiclesIndex from '../containers/VehiclesIndex';
import { withTranslation } from 'react-i18next';
import CustomAlert from './shared/Alert';
import Header from './Header';

class App extends React.Component {
  componentDidMount() {
    this.headerHeight = `${document.getElementById('header').offsetHeight}px` ;
  }

  render() {
    const myProps = this.props
    const { alert } = this.props.state

    return (
      <div className="app">
        { alert && <CustomAlert alert={alert} {...myProps} /> }
        <Header {...myProps}/>
        <main style={{'height': `calc(100vh - ${this.headerHeight})`}}>
          <Switch>
            <Route path='/' exact    render={ props => <Redirect to="/start/zip" /> } />
            <Route path='/start/zip' render={ props => <StartZip {...props} {...myProps} /> }/>
            <Route path='/start/info'   render={ props => <StartInfo {...props} {...myProps} /> }/>
            <Route path='/vehicles/add' render={ props => <VehiclesAdd {...props} {...myProps} /> }/>
            <Route path='/vehicles'     render={ props => <VehiclesIndex {...props} {...myProps} /> }/>
            <Route path='/:page' render={ props => <Redirect to="/start/zip" /> }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withTranslation()(App);
