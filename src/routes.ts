import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import VesselSearch from "./pages/VesselSearch";
import MapView from "./pages/MapView";
import SubscriptionAlerts from "./pages/SubscriptionAlerts";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "vessels", Component: VesselSearch },
      { path: "map", Component: MapView },
      { path: "alerts", Component: SubscriptionAlerts },
    ],
  },
]);
