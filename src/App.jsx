import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useContext, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBarFooter from "./components/layouts/NavBarFooter";
import NotFound from "./routes/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AppointmentForm from "./components/appointments/createAppointment/CreateAppointment";

import Profilepage from "./components/profile/profilepage";
import GaleryPhotosPage from "./components/galery-photos/galery-photos";
import PageReviews from "./components/reviews/page-reviews/page-reviews";
import UsersComponent from "./components/management/users/UsersManager";
import {
  AuthProvider,
  AuthContext,
} from "./components/AuthProvider/AuthProvider";
import { ThemeContext } from "./components/Theme/ThemeContext";

import BarberComponent from "./components/barber/BarberComponent";

const ProtectedElement = ({ element, allowedRoles }) => {
  const { isLoggedIn, roles } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  } else if (!allowedRoles.includes(roles)) {
    return <Navigate to="/error" replace />;
  }

  return element;
};

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const router = createBrowserRouter([
    { path: "/home", element: <Navigate to="/" replace /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/",
      element: <NavBarFooter />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/appointment",
          element: (
            <ProtectedElement
              element={<AppointmentForm />}
              allowedRoles={["Client"]}
            />
          ),
        },
        {
          path: "/users",
          element: (
            <ProtectedElement
              element={<UsersComponent />}
              allowedRoles={["Admin"]}
            />
          ),
        },
        {
          path: "/editprofile",
          element: <Profilepage />,
        },
        {
          path: "/galerypage",
          element: <GaleryPhotosPage />,
        },
        {
          path: "/reviews",
          element: <PageReviews />,
        },
        {
          path: "/schedule",
          element: (
            <ProtectedElement
              element={<BarberComponent />}
              allowedRoles={["Barber"]}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
