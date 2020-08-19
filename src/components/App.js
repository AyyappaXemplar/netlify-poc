import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import StartZip from './main/StartZip';
import StartInfo from './main/StartInfo';


class App extends React.Component {
  render() {
    const myProps = this.props

    return (
      <div className="App">
        <Switch>
          {/*<Route path='/' exact render={ props => <HomePage {...props} {...myProps}/>} />*/}
          <Route path='/start/zip' render={ props =>
            <StartZip {...props} {...myProps} />
          }/>
          <Route path='/start/info' render={ props =>
            <StartInfo {...props} {...myProps} />
          }/>

          {/* <Route path='/:page' render={ props =>
            <Page {...props} {...myProps} />
          }/> */}
        </Switch>
      </div>
    );
  }
}

export default App;
