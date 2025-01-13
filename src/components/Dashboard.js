import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function Dashboard(props) {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert("Logout")
    })
  }
  return (
    <div>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.url} />
      <Card.Body>
        <Card.Title>Dashboard</Card.Title>
        <Card.Text>
        Welcome {props.user.email}
        </Card.Text>
        <Button variant="primary"onClick={handleSignOut} >Logout</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
