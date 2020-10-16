import React, { useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container }     from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getQuote } from '../actions/quotes'
import { setAlert } from '../actions/state'

import CustomAlert   from './shared/CustomAlert';
import SpinnerScreen from './shared/SpinnerScreen';
import Header from './Header';
import routes from '../routes'


function App(props) {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const quote = useSelector(state => state.data.quote)
  const alert = useSelector(state => state.state.alert)

  useEffect(() => {
    const quoteId = localStorage.getItem('siriusQuoteId')
    const id = { quote }
    if (quoteId && !id) {
      dispatch(getQuote(quoteId))
    } else if (id) {
      setReady(true)
    }
  }, [quote, dispatch, getQuote])

  const setAlertFn = (dispatch) => dispatch(setAlert(alert))
  console.log(alert)
  return(
    <>
      { alert && <CustomAlert alert={alert} setAlert={setAlertFn} /> }
      <Header/>
      {
        ready &&

        <main className='h-100 d-flex align-items-center flex-wrap'>
          <Container>
            <React.Suspense fallback={<SpinnerScreen title="Loading Sirius App"/>}>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index} path={route.path} exact={route.exact}
                    children={(props) => <route.main {...props} setAlert={setAlertFn}/>}
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

export default App;
