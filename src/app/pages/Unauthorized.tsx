import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const handleGoBack = () => {
    switch (userRole) {
      case 'operator':
        navigate('/operator');
        break;
      case 'analyst':
        navigate('/analyst');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-100 p-6 rounded-full">
                <Lock className="w-16 h-16 text-red-600" />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Restricted Dashboard
              </h2>
              <p className="text-slate-600 text-lg">
                You don't have permission to access this dashboard.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                <span className="font-semibold">Current Role: </span>
                <span className="capitalize">{userRole || 'None'}</span>
              </p>
              <p className="text-sm text-red-700 mt-2">
                Each user role has access only to their designated dashboard. Please contact your administrator if you need access to additional features.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                onClick={handleGoBack}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Your Dashboard
              </Button>
              
              <p className="text-xs text-slate-500">
                If you believe this is an error, please contact system administrator
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
