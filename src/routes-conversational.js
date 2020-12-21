import React from 'react';
// import { Redirect } from 'react-router-dom';
import Conversation from './components/main/conversation/Conversation';

const routes = [
  //Conversational app
  { path: '/conversation', main: (props) => <Conversation/> },
];

export default routes
