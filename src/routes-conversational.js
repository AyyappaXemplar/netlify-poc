import React from 'react';
// import { Redirect } from 'react-router-dom';
import ConversationQuotesNew  from './components/main/conversation/QuotesNew';
import ConversationQuotesEdit from './components/main/conversation/QuotesEdit';

const routes = [
  { path: '/conversation', exact: true, main: (props) => <h1>Conversational App</h1> },
  { path: '/conversation/quotes/new',    main: (props) => <ConversationQuotesNew {...props} />},
  { path: '/conversation/quotes/edit',   main: (props) => <ConversationQuotesEdit  {...props} />},
];

export default routes
