import React from "react";
import ConversationQuotesNew from "./components/main/conversation/QuotesNew";
import ConversationQuotesEdit from "./components/main/conversation/QuotesEdit";
import ConversationalSplashIntro from "./components/main/conversation/ConversationSplashIntro";
const routes = [
  {
    path: "/conversation",
    exact: true,
    main: (props) => <ConversationalSplashIntro />,
  },
  {
    path: "/conversation/quotes/new",
    main: (props) => <ConversationQuotesNew {...props} />,
  },
  {
    path: "/conversation/quotes/edit",
    main: (props) => <ConversationQuotesEdit {...props} />,
  },
];

export default routes;
