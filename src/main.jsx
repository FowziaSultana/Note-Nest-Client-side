import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main/Main";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Providers/AuthProvider";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Dashboard from "./Layout/Dashboard/Dashboard";
import CreateNote from "./Pages/DashboardPages/CreateNote/CreateNote";
import AllNotes from "./Pages/DashboardPages/AllNotes/AllNotes";
import UpdateNote from "./Pages/DashboardPages/UpdateNote/UpdateNote";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ManageUsers from "./Pages/DashboardPages/ManageUsers/ManageUsers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/manageUser",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/createNote",
        element: <CreateNote></CreateNote>,
      },
      {
        path: "/dashboard/allNote",
        element: <AllNotes></AllNotes>,
      },
      {
        path: "/dashboard/updateNotes/:id",
        element: <UpdateNote></UpdateNote>,
        loader: ({ params }) =>
          fetch(
            `https://notes-library-server-side.vercel.app/notes/${params.id}`
          ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
