// client/src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import "./App.css";


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
          <Route path='/' element={<Login />}/>
          <Route path='/Register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;