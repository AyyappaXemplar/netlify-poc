// https://medium.com/@andrewoons/setting-up-mixpanel-in-react-3e4c5b8c2a36
import mixpanel from 'mixpanel-browser';

let mixpanelEnabled = true

if (mixpanelEnabled) mixpanel.init('8e9856f6ba23eb9b69aa95608ec7659d');

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
  register: (data) => {
    if (mixpanelEnabled) mixpanel.register(data);
  },
  people: {
    set: (props) => {
      if (mixpanelEnabled) mixpanel.people.set(props);
    },
  },

};

let Mixpanel = actions;
export default Mixpanel
