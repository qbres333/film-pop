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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
