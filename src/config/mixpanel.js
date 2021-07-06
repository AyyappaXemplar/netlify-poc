// https://medium.com/@andrewoons/setting-up-mixpanel-in-react-3e4c5b8c2a36
import mixpanel from 'mixpanel-browser';

let mixpanelEnabled = true;

if (mixpanelEnabled) mixpanel.init("8e9856f6ba23eb9b69aa95608ec7659d");

const actions = {
  identify: (id) => {
    if (mixpanelEnabled) mixpanel.identify(id);
  },
  alias: (id) => {
    if (mixpanelEnabled) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (mixpanelEnabled) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (mixpanelEnabled) mixpanel.people.set(props);
    },
  },
};


//last touch utm tracking
function getQueryParam(url, param) {
  // Expects a raw URL
// eslint-disable-next-line no-useless-escape, no-empty-character-class
  param = param.replace(/[[]/, "\[").replace(/[]]/, "\]");
  // eslint-disable-next-line no-useless-escape
  var regexS = "[\?&]" + param + "=([^&#]*)",
      regex = new RegExp( regexS ),
      results = regex.exec(url);
  if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
    return '';
    } else {
    return decodeURIComponent(results[1]).replace(/\W/gi, ' ');
    }
  };


  function campaignParams() {
  var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' ')
      , kw = ''
      , params = {}
      , first_params = {};

  var index;
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index]);
    if (kw.length) {
      params[campaign_keywords[index] + ' [last touch]'] = kw;
    }
  }
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index]);
    if (kw.length) {
      first_params[campaign_keywords[index] + ' [first touch]'] = kw;
    }
  }

  mixpanel.people.set(params);
  mixpanel.people.set_once(first_params);
  mixpanel.register(params);
  }
campaignParams();

let Mixpanel = actions;
export default Mixpanel
