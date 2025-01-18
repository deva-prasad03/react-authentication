import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth"
import { auth } from '../firebase'

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignOut = () => {
    localStorage.clear();

    signOut(auth).then(() => {
        alert("Logout")
      return <Navigate to="/login" />;
    })}

  return (
    <>
      <Button variant="primary" className=" " onClick={handleShow} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Launch
      </Button>

      
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="mb-0 d-flex justify-content-center align-items-center flex-column">
            <Link to="/dashboard" className='p-2' >Dashboard</Link> 
            <Link to ="/home" className='p-2'>Home</Link>
            <Button variant="primary"onClick={handleSignOut} >Logout</Button>

          </p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;