import React from "react";
import ConversationQuotesNew from "./components/main/conversation/QuotesNew";
import ConversationQuotesEdit from "./components/main/conversation/QuotesEdit";
import ConversationalSplashIntro from "./components/main/conversation/ConversationSplashIntro";
import VehiclesNew from "./components/main/conversation/containers/VehiclesNew";
import VehiclesCoverages from "./components/main/conversation/VehiclesCoverages";
import Quotes from "./components/main/conversation/Quotes";


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
  {
    path: "/conversation/vehicles/new",
    main: (props) => {
      return <VehiclesNew {...props} />;
    },
  },
  {
    path: "/conversation/vehicles/:vehicleId/edit-coverages",
    main: (props) => <VehiclesCoverages {...props} />,
  },
  {
    path: "conversation/quotes/:resource(vehicles|drivers|review)",
    main: (props) => <Quotes {...props} />,
  },
];

export default routes;
///conversational/vehicles/new
