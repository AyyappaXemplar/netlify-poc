import React, { useState, useEffect,
                useLayoutEffect}     from 'react';
import { Route, Switch, Redirect,
         useLocation }               from 'react-router-dom';
import { Container }                 from 'react-bootstrap'
import { useSelector, useDispatch }  from 'react-redux'

import { getQuote } from '../actions/quotes'
import { setAlert } from '../actions/state'

import CustomAlert   from './shared/CustomAlert';
import SpinnerScreen from './shared/SpinnerScreen';
import Header        from './Header';

import routes  from '../routes'
import history from '../history'

function ScrollToTop() {
  const location = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])

  return null
}

function DebugQuote() {
  const { quote, rates } = useSelector(state => state.data)
  const useQuery  = () => new URLSearchParams(useLocation().search)
  const rateIndex = useQuery().get('index') || 0

  if (!process.env.REACT_APP_DEBUG_QUOTE) {
    return false
  }
  return <p className="text-center"><b>Quote UUID</b>: {quote?.id} <b>Quote Number</b>: {rates[rateIndex]?.id}</p>
}

function App(props) {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const quote = useSelector(state => state.data.quote)
  const alert = useSelector(state => state.state.alert)
  const gettingQuote = useSelector(state => state.state.gettingQuote)
  const apiUnavailable = useSelector(state => state.state.apiUnavailable)
  const location = useLocation()

  useEffect(() => {
    const quoteId = localStorage.getItem('siriusQuoteId')
    const { id } = quote

    if (apiUnavailable) {
      setReady(true)
    } else if (!quoteId) {
      setReady(true)
      const allowedUrls = new RegExp(/quotes\/(new|[-\w]*\/rates|not-covered|[-\w]*\/final)/)
      if (allowedUrls.test(location.pathname)) {
        return
      } else {
        history.push('/quotes/new')
      }
    } else if (!gettingQuote && quoteId && !id) {
      dispatch(getQuote(quoteId))
    } else if (!gettingQuote) {
      setReady(true)
    }
  }, [quote, dispatch, gettingQuote, apiUnavailable, location.pathname])

  const setAlertFn = (alert) => dispatch(setAlert(alert))

  return(
    <>
      <ScrollToTop />

      { alert && <CustomAlert alert={alert} setAlert={setAlertFn} /> }
      <Header/>
      { apiUnavailable && <Redirect to='/contact-us'/> }

      {
        ready &&
        <>
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
          <DebugQuote/>
        </>
      }
    </>
  );

}

export default App;
