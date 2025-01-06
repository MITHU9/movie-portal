/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const MovieContext = createContext({
  signInWithGoogle: () => {},
  signInWithEmail: () => {},
  signOut: () => {},
  setLoading: () => {},
  loading: false,
});

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [previousRoute, setPreviousRoute] = useState("/");
  const [dataLoad, setDataLoad] = useState(false);

  //Authenticating the user
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createUserWithEmail = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password, name);
  };

  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //get home page data

  useEffect(() => {
    fetch("https://server-side-movie-portal.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMovies(data);
          setDataLoad(true);
        }
      });
  }, []);

  //delete favorite from database
  const deleteFavorite = (id) => {
    fetch(`https://server-side-movie-portal.vercel.app/delete-favorite/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          setFavorites(favorites.filter((fav) => fav._id !== id));
        }
      });
  };

  //get previous route
  useEffect(() => {
    if (
      location.pathname !== "/auth/login" &&
      location.pathname !== "/auth/register"
    ) {
      setPreviousRoute(location.pathname);
    }
  }, [location.pathname]);

  //get Current User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  //theme change
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  //favorite movies
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://server-side-movie-portal.vercel.app/favorites/${user?.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
        });
    }
  }, [dataLoad, user?.email]);

  console.log(user);

  return (
    <MovieContext.Provider
      value={{
        loading,
        setLoading,
        signInWithGoogle,
        createUserWithEmail,
        signInWithEmail,
        signOutUser,
        updateUser,
        user,
        favorites,
        setFavorites,
        deleteFavorite,
        theme,
        toggleTheme,
        previousRoute,
        dataLoad,
        setDataLoad,
        movies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default ContextProvider;
