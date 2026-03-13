import { Outlet, Navigate } from "react-router";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Root() {
  const { userRole } = useAuth();

  // If not logged in, redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}