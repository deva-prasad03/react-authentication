import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import Sample from "./components/Googlesignin";
import image  from "./assests/logo192.png";
import  Home  from "./components/Home";
import piechart from "./components/Graph";
import { PieChart } from "recharts";
import Graph from "./components/Graph";


function App() {
  const [loading, setLoading] = useState(true);
  const [name , setname] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user); 
    });
    return () => unsubscribe();
  }, []);


  
  return (
<div>

    <BrowserRouter>


      <Routes>
        <Route path="/" element={user? <Navigate to="/dashboard" /> :<Login />} />
        <Route path="/login" element={user? <Navigate to="/home" /> : <Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Dashboard user={user} url={image} />
            </ProtectedRoute>
          }
        />
        {/* Add the /sample route here */}
          <Route path="/Home" element={user? <Home></Home>:<Login></Login>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}



function ProtectedRoute({ user, children ,loading}) {
  if(loading){
    return <div>Loading...</div>
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
}
export default App;
