import { Routes, Route, useNavigate } from "react-router-dom";
import './index.css'
import Login from './Login/login'
import Dashboard from './Dashboard/sidebar'
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (

    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/Dashboard' element={<Dashboard />}></Route>
    </Routes>

  )
}

export default App;





