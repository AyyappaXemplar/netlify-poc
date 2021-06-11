// https://medium.com/@andrewoons/setting-up-mixpanel-in-react-3e4c5b8c2a36
import mixpanel from 'mixpanel-browser';

let mixpanelEnabled = process.env.REACT_APP_ENABLE_MIXPANEL;

if (mixpanelEnabled) mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN)

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

let Mixpanel = actions;
export default Mixpanel