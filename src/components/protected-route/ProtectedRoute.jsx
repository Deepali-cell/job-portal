import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) return null;

  // 1. User not signed in → redirect to login
  if (!isSignedIn) {
    return <Navigate to={`/?sign-in=true`} replace />;
  }

  // 2. User signed in but no role → go to onboarding
  if (user && !user.publicMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  // 3. Role-based protection
  if (allowedRoles && !allowedRoles.includes(user.publicMetadata.role)) {
    return <Navigate to="/unauthorizedrole" replace />;
  }

  return children;
};

export default ProtectedRoute;
