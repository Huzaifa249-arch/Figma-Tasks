import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import OperatorDashboard from "./pages/OperatorDashboard";
import AnalystDashboard from "./pages/AnalystDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { 
        index: true, 
        element: <ProtectedRoute allowedRole="operator"><OperatorDashboard /></ProtectedRoute> 
      },
      { 
        path: "operator", 
        element: <ProtectedRoute allowedRole="operator"><OperatorDashboard /></ProtectedRoute> 
      },
      { 
        path: "analyst", 
        element: <ProtectedRoute allowedRole="analyst"><AnalystDashboard /></ProtectedRoute> 
      },
      { 
        path: "admin", 
        element: <ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute> 
      },
    ],
  },
]);
