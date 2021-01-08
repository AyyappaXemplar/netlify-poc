import React, { useState, useEffect} from 'react';
import { Route, Switch, Redirect }   from 'react-router-dom';
import { Container }                 from 'react-bootstrap'
import { useSelector, useDispatch }  from 'react-redux'

import { getQuote } from '../actions/quotes'
import { setAlert } from '../actions/state'

import CustomAlert   from './shared/CustomAlert';
import SpinnerScreen from './shared/SpinnerScreen';
import Header        from './Header';

import routes  from '../routes'
import history from '../history'

function App(props) {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const quote = useSelector(state => state.data.quote)
  const alert = useSelector(state => state.state.alert)
  const gettingQuote = useSelector(state => state.state.gettingQuote)
  const apiUnavailable = useSelector(state => state.state.apiUnavailable)

  useEffect(() => {
    const quoteId = localStorage.getItem('siriusQuoteId')
    const { id } = quote

    if (apiUnavailable) {
      setReady(true)
    } else if (!quoteId) {
      setReady(true)

      const allowedUrls = new RegExp(/(quotes\/new)|(quotes\/[-\w]*\/rates)/)
      if (allowedUrls.test(window.location.pathname)) {
        return
      } else {
        history.push('/quotes/new')
      }
    } else if (!gettingQuote && quoteId && !id) {
      dispatch(getQuote(quoteId))
    } else if (!gettingQuote) {
      setReady(true)
    }
  }, [quote, dispatch, gettingQuote, apiUnavailable])

  const setAlertFn = (alert) => dispatch(setAlert(alert))

  return(
    <>
      { alert && <CustomAlert alert={alert} setAlert={setAlertFn} /> }
      <Header/>
      { apiUnavailable && <Redirect to='/contact-us'/> }

      {
        ready &&

        <main className='d-flex flex-wrap'>
          <Container fluid className="p-0">
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
