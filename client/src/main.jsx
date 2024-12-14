import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import React routing components
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages that will conditionally render
import Home from './pages/Home.jsx';
import ErrorPage from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MyMovies from './pages/MyMovies.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mymovies",
        element: <MyMovies />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
