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

const InitChat = () => {
  const [chatScipt, updateChatScript]  = useState(null);
  const chatstate = useLayoutEffect(() => {
   
    window.HFCHAT_CONFIG = {
      EMBED_TOKEN: '999cd250-875a-11eb-9669-6fc7a3f61b09',
      ASSETS_URL: 'https://widget.happyfoxchat.com/v2/visitor'
    }

    const tag = ()=><><script type="" async={false} id="chatTest" src={`${window.HFCHAT_CONFIG.ASSETS_URL}/js/widget-loader.js`}/></>
    return updateChatScript(tag)
    
    //<><script type="" async={false} id="chatTest" src={`${window.HFCHAT_CONFIG.ASSETS_URL}/js/widget-loader.js`}/></>
   },[updateChatScript])

  if(chatstate !== null ) return chatScipt
    
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
      <InitChat />
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
            <InitChat />
          </Container>
        </main>
      }
    </>
  );

}

export default App;
