import React, { Fragment } from "react";
import Header from "./components/shared/conversation/Header";
import Conversation from "./components/shared/conversation/Conversation";

const convoHeaderRoutes = [
  {
    exact: true,
    path: "/conversation",
    render: (props) => false,
  },
  {
    path: "/conversation/:page",
    render: (props) => (
      <Fragment>
        <Header />
        <Conversation />
      </Fragment>
    ),
  },
];

export default convoHeaderRoutes;
