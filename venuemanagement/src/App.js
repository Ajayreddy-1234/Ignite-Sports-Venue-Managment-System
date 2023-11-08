// client/src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import HomeBody from "./components/HomeBody.js";
import VenueCreationForm from "./components/venuecreationform/venuecreationform.js";

//import "./index.css";
import NavBar from "./components/navBar";
import Home from './components/Home.js'
import ForgotPassword from "./components/ForgotPassword.js";
import UserPage from "./components/userPage.js";
import ResetPassword from "./components/ResetPassword.js";

function App() {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path='/homeB' element={<HomeBody />}/>
          <Route path='/' Component={Home}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/user-page' element={<UserPage />} />
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='/VenueCreationForm' element={<VenueCreationForm />} />
      </Routes>
    </BrowserRouter>
/*
    <BrowserRouter>
      <NavBar/>
      <Routes>
         
      </Routes>
    </BrowserRouter>*/

  );
}

export default App;