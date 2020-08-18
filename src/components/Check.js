import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import StartPage from './main/StartPage';


class App extends React.Component {
  render() {
    const myProps = this.props

    return (
      <div className="App">
        <Switch>
          {/*<Route path='/' exact render={ props => <HomePage {...props} {...myProps}/>} />*/}
          <Route path='/start' render={ props =>
            <StartPage {...props} {...myProps} />
          }/>

          {/* <Route path='/:page' render={ props =>
            <Page {...props} {...myProps} />
          }/> */}
        </Switch>
      </div>
    );
  }
}

export default withTranslation()(App);
