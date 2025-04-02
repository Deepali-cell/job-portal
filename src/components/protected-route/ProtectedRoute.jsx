import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) {
    return null; // Prevents rendering until Clerk is loaded
  }

  // authentication protectetion check first

  if (!isSignedIn) {
    return <Navigate to={`/?sign-in=true`} replace />; // replace => Prevents unnecessary back button issues
  }

  // after authentication check onboarding

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to={"/onboarding"} />;
  }
  // Role-based protection: Check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.unsafeMetadata.role)) {
    return <Navigate to="/unauthorizedrole" replace />; // Redirect unauthorized users
  }
  return children;
};

export default ProtectedRoute;
