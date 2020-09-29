import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import CustomAlert from './shared/CustomAlert';
import Header from './Header';
import routes from '../routes'


class App extends React.Component {
  render() {
    const myProps = this.props
    const { alert } = this.props.state

    return(
      <>
        { alert && <CustomAlert alert={alert} {...myProps} /> }
        <Header {...myProps}/>
        {
          ready &&

          <main className='h-100 d-flex align-items-center flex-wrap'>
            <Container>
              <React.Suspense fallback={<div></div>}>
                <Switch>
                  {routes.map((route, index) => (
                    <Route
                      key={index} path={route.path} exact={route.exact}
                      children={(props) => <route.main {...props} {...myProps}/>}
                    />
                  ))}
                </Switch>
              </React.Suspense>
            </Container>
          </main>
        }
      </>
    );
  }
}

export default App;
