import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import StartZipContainer from '../containers/StartZip';
import StartInfo from './main/StartInfo';
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
        { alert &&
          <CustomAlert alert={alert} {...myProps} />
        }
        <Header/>
        <main style={{'height': `calc(100vh - ${this.headerHeight})`}}>
          <Switch>
            <Route path='/' exact render={ props => <Redirect to="/start/zip" /> } />
            <Route path='/start/zip' render={ props => <StartZipContainer {...props} {...myProps} /> }/>
            <Route path='/start/info' render={ props => <StartInfo {...props} {...myProps} /> }/>
            <Route path='/:page' render={ props => <Redirect to="/start/zip" /> }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
