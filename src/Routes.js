import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/Signup/SignUp";
import Home from "./pages/Home/Home";
import NewInjuriy from "./pages/AddNewInjuriy/NewInjuriy";
import Data from "./pages/Data/Data.js"
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword.js";
import CreateNewPassword from "./pages/Forgotpassword/CreateNewPassword";
import Contact from "./pages/ContactPage/Contact";
const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route
          path="/create-new-password/:id/:token"
          element={<CreateNewPassword />}
        />
        <Route path="/add-new-injuriy" element={<NewInjuriy />} />
        <Route path="/data" element={<Data/>}/>
        <Route path = "/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
