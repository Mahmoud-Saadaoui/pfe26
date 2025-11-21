import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./components/NotFound.jsx";
import AdminLayout from "./pages/admin/index.jsx";
import AgentLayout from "./pages/agent/index.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UsersPage from "./pages/admin/users/UsersPage.jsx";
import ThemesPage from "./pages/admin/themes/ThemesPage.jsx";
import AgentDashboard from "./pages/agent/AgentDashboard.jsx";
import InterventionsAgentPage from "./pages/agent/InterventionsAgentPage.jsx";
import CommunesPage from "./pages/admin/communes/CommunesPage.jsx";
import CreateUserPage from "./pages/admin/users/CreateUserPage.jsx";
import EditUserPage from "./pages/admin/users/EditUserPage.jsx";
import CreateCommunePage from "./pages/admin/communes/CreateCommunePage.jsx";
import EditCommunePage from "./pages/admin/communes/EditCommunePage.jsx";
import CreateThemePage from "./pages/admin/themes/CreateThemePage.jsx";
import EditThemePage from "./pages/admin/themes/EditThemePage.jsx";
import CreateInterventionPage from "./pages/agent/CreateInterventionPage.jsx";
import EditInterventionPage from "./pages/agent/EditInterventionPage.jsx";

function Router() {
  const isAuthenticated = true;
  const role = "admin"; 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <LoginPage /> },

        // ROUTES ADMIN 
        {
          path: "admin",
          element:
            isAuthenticated && role === "admin"
              ? <AdminLayout />
              : <Navigate to="/" />,
          children: [
            { index: true, element: <AdminDashboard /> },
            // USERS
            { path: "users", element: <UsersPage /> },
            { path: "users/create", element: <CreateUserPage /> },
            { path: "users/:id/edit", element: <EditUserPage /> },
            // COMMUNES
            { path: "communes", element: <CommunesPage /> },
            { path: "communes/create", element: <CreateCommunePage /> },
            { path: "communes/:id/edit", element: <EditCommunePage /> },
            // THEMES
            { path: "themes", element: <ThemesPage /> },
            { path: "themes/create", element: <CreateThemePage /> },
            { path: "themes/:id/edit", element: <EditThemePage /> },
          ],
        },

        // ROUTES AGENT 
        {
          path: "agent",
          element:
            isAuthenticated && (role === "agent" || role === "admin")
              ? <AgentLayout />
              : <Navigate to="/" />,
          children: [
            { index: true, element: <AgentDashboard /> },
            { path: "interventions", element: <InterventionsAgentPage /> },
            { path: "interventions/create", element: <CreateInterventionPage /> },
            { path: "interventions/:id/edit", element: <EditInterventionPage /> },
          ],
        },

        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;