import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import OnboardingPage from "./pages/OnboardingPage";
import JobListPage from "./pages/JobListPage";
import SingleJobPage from "./pages/SingleJobPage";
import LandingPage from "./pages/LandingPage";
import PostJobPage from "./pages/PostJobPage";
import SaveJobPage from "./pages/SaveJobPage";
import MyJobsPage from "./pages/MyJobsPage";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import UnauthorizedRole from "./pages/UnAuthorizedRole";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtectedRoute>
              <JobListPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/job/:id",
          element: (
            <ProtectedRoute>
              <SingleJobPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/postjob",
          element: (
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <PostJobPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/savejob",
          element: (
            <ProtectedRoute>
              <SaveJobPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/myjobs",
          element: (
            <ProtectedRoute>
              <MyJobsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/unauthorizedrole",
          element: <UnauthorizedRole />,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
