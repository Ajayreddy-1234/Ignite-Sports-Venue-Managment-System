// client/src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
//import "./index.css";
import NavBar from "./components/navBar";


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <BrowserRouter>

      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/nav' element={<NavBar />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />} />
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