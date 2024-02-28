import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  AddPost,
  AllPost,
  EditPost,
  Home,
  LoginPage,
  PostPage,
  SignUpPage,
  Test,
} from "./pages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/all_post",
        element: <AllPost />,
      },
      {
        path: "/add_post",
        element: <AddPost />,
      },
      {
        path: "/post/:slug",
        element: 
        <PostPage />
        // <Test/>
        ,
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
