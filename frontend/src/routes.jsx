import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
  import App from "./App.jsx";
  import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./components/NotFound.jsx";
import Dashboard from "./pages/Dashoard.jsx"
  
  function Router() {
  
    const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <LoginPage/> },
          {
            path: "/dashboard",
            element: <Dashboard /> ,
          },
          { path: "/*", element: <NotFoundPage/> },
        ],
      },
    ]);
  
    return <RouterProvider router={router} />;
  }
  
  export default Router;