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
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
        loader: ({ params }) =>
          fetch(
            `https://server-side-movie-portal.vercel.app/movie/${params.id}`
          ),
      },
      {
        path: "/all-movies",
        element: (
          <PrivateRoute>
            <AllMovies />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://server-side-movie-portal.vercel.app/all-movies"),
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
          fetch(
            `https://server-side-movie-portal.vercel.app/movie/${params.id}`
          ),
      },
      {
        path: "/community",
        element: <Community />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
