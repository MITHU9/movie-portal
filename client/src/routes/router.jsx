import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../layouts/AuthLayouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import Favorites from "../pages/Favorites";
import AddMovie from "../pages/AddMovie";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import MovieDetails from "../pages/MovieDetails";
import UpdateMovie from "../pages/UpdateMovie";
import Community from "../pages/Community";
import AuthRedirect from "./AuthRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: () => fetch("http://localhost:3000/movies"),
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movie/${params.id}`),
      },
      {
        path: "/all-movies",
        element: <AllMovies />,
        loader: () => fetch("http://localhost:3000/all-movies"),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: "add-movie",
        element: (
          <PrivateRoute>
            <AddMovie />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-movie/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movie/${params.id}`),
      },
      {
        path: "/community",
        element: <Community />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: (
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <AuthRedirect>
            <Register />
          </AuthRedirect>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
