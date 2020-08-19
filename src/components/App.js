import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Alert, Container } from 'react-bootstrap';
import StartZip from './main/StartZip';
import StartInfo from './main/StartInfo';
import CustomAlert from './shared/Alert';

class App extends React.Component {
  render() {
    const myProps = this.props
    const { alert } = this.props.state

    return (
      <div className="App">
        { alert &&
          <CustomAlert alert={alert} {...myProps }/>
        }
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
