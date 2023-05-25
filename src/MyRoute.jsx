import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import ForumsPage from "./pages/ForumsPage";
import LoadingContextProvider from "./contexts/LoadingContext";
import SingleForumPage from "./pages/SingleForumPage";
import CreateForum from "./pages/CreateForum";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import axios from "axios";
import UserContextProvider, { UserContext } from "./contexts/UserContext";
import App from "./App";
import UserRoute from "../routes/UserRoute";
import HaveUser from "../routes/HaveUser";
import Profile from "./pages/Profile";
import MyForum from "./pages/MyForum";
import EditForum from "./pages/EditForum";
import AdminEditForums from "./pages/AdminEditForums";
import AdminRoute from "../routes/AdminRoute";
import SearchResultPage from "./pages/SearchResultPage";

axios.defaults.baseURL =
  "http://localhost:5500" || "https://naruto-forum-service.onrender.com";
axios.defaults.withCredentials = true;

export default function MyRoute() {
  return (
    <LoadingContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" index element={<App />} />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/forum/:uuid" element={<SingleForumPage />} />
              <Route
                path="/create"
                element={
                  <UserRoute>
                    <CreateForum />
                  </UserRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <UserRoute>
                    <Profile />
                  </UserRoute>
                }
              />
              <Route
                path="/my-forum"
                element={
                  <UserRoute>
                    <MyForum />
                  </UserRoute>
                }
              />
              <Route
                path="/edit/:uuid"
                element={
                  <UserRoute>
                    <EditForum />
                  </UserRoute>
                }
              />
              <Route
                path="/admin/forums"
                element={
                  <AdminRoute>
                    <AdminEditForums />
                  </AdminRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <HaveUser>
                    <LoginPage />
                  </HaveUser>
                }
              />
              <Route
                path="/create-account"
                element={
                  <HaveUser>
                    <CreateAccount />
                  </HaveUser>
                }
              />
              <Route path="/forums/:keyword" element={<SearchResultPage/>}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </LoadingContextProvider>
  );
}
