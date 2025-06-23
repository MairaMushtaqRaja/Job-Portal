import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./Layout/AppLayout";
import Landing from "./pages/Landing";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listing";
import Job from "./pages/job";
import PostJob from "./pages/postJobs";
import SavedJobs from "./pages/savedJobs";
import MyJobs from "./pages/my-jobs";
import { ThemeProvider } from "./components/theme-provider";
import PotectedRoute from "./components/protected-route";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing></Landing>,
      },
      {
        path: "/onboarding",
        element: (
          <PotectedRoute>
            <Onboarding />
          </PotectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <PotectedRoute>
            <JobListing />
          </PotectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <PotectedRoute>
            <Job />
          </PotectedRoute>
        ),
      },
      {
        path: "/postJobs",
        element: (
          <PotectedRoute>
            <PostJob />
          </PotectedRoute>
        ),
      },
      {
        path: "/savedJobs",
        element: (
          <PotectedRoute>
            <SavedJobs />
          </PotectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <PotectedRoute>
            <MyJobs />
          </PotectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
