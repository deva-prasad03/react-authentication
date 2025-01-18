import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import Button from 'react-bootstrap/Button';
import Sidebar from "./Sidebar";
import Card from 'react-bootstrap/Card';
import Graph from './Graph';
import { useLocation } from 'react-router-dom';

export default function Dashboard(props) {
  const location = useLocation();
  const { array } = location.state || { array: [] }; // Fallback to empty array
  const [savedArray, setSavedArray] = useState(array);

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

  return (
    <div>
      <Sidebar />

      <Graph data={savedArray} /> {/* Pass array data to Graph */}

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
        </Card.Body>
      </Card>
    </div>
  );
}
