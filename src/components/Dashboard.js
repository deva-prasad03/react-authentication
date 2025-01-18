import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import Button from 'react-bootstrap/Button';
import Sidebar from "./Sidebar";
import Card from 'react-bootstrap/Card';
import Graph from './Graph';
import { useLocation } from 'react-router-dom';
import axios from './axios';
import Test1 from './Test1';

export default function Dashboard(props) {
  const location = useLocation();
  const { array } = location.state || { array: [] }; // Fallback to empty array
  const [savedArray, setSavedArray] = useState(array);
  const [joke, setJoke] = useState(null);

  // Handle Sign-Out
  const handleSignOut = () => {
    localStorage.clear();

    signOut(auth).then(() => {
      alert("Logout");
    });
  };

  useEffect(() => {
    const localStorageArray = JSON.parse(localStorage.getItem('arrayData')) || [];
    setSavedArray(localStorageArray); // Set array from localStorage if available
  }, []);


   const handlejoke = async ()=>{
 
    const response = await axios.get("/random_joke");
    setJoke(response.data.setup + " " + response.data.punchline);
    

  }

  return (
    <div>
      <Sidebar />

      <Graph data={savedArray} /> {/* Pass array data to Graph */}

<Test1></Test1>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.url} />
        <Card.Body>
          <Card.Title>Dashboard</Card.Title>
          <Card.Text>
            Welcome {props.user.email}
          </Card.Text>
          <Button variant="primary" onClick={handleSignOut}>
            Logout
          </Button>
          <p>{joke}</p>
        </Card.Body>
      </Card>


      <Button onClick={handlejoke}>joke</Button>
    </div>
  );
}
