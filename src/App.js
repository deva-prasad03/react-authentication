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
import Test1 from "./components/Test1";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {

  // Initialize the queryClient
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user); 
    });
    return () => unsubscribe();
  }, []);

  return (
    // Wrap the entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Dashboard user={user} url={image} />
              </ProtectedRoute>
            }
          />
          
          <Route path="/Home" element={user ? <Home /> : <Login />} />
          <Route path="/sample" element={<Test1 />} /> {/* Add route for Test1 */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Protected Route to ensure user is logged in
function ProtectedRoute({ user, children, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default App;
