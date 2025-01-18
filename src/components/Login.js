
import React, { useState } from 'react'
import { auth } from '../firebase';
import { setPersistence, browserLocalPersistence, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";




export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Googlesignin = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log("Google Sign-In Success:", user);
          alert(`Welcome ${user.displayName || "User"}`);
        } catch (error) {
          console.error("Error during Google Sign-In:", error.message);
          alert("Google Sign-In Failed. Please try again.");
        }
      };
         
      
      


    const handlecreate = async () => {


        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((e) => {
                    alert("acount created")
                })
                .catch((error) => {
                    console.log(error)
                     alert(error.message)}
                );
        }
        catch (error) {
            console.log(error);
            alert(error.message)
        }
    }


    const handlesignin = async (e) => {
        // e.preventDefault();
        alert(`${email} ${ password}`)
        await signInWithEmailAndPassword(auth, email, password).then((e) => {
            console.log(e.user.email);
            setPersistence(auth, browserLocalPersistence)
            navigate('/home');

        }).catch((error) => {
            console.log(error)
            alert(error.message)
        }
        );


       

    }
    return (
        <div className='    form-container d-flex justify-content-center align-items-center  vh-100'>
   <Form className='col-12  col-sm-6 col-md-5 col-lg-4 col-xl-3 border border-4 border-primary  '>
                <h1 className='text-center m-3 text-primary'>Login</h1>
                <Form.Group className="mb-3 ms-3 me-3" controlId="formBasicEmail">
                    
                    <Form.Label className='mt-3'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" size="sm"  onChange={(e) => { setEmail(e.target.value) }} value={email} required/>

                </Form.Group>

                <Form.Group className="mb-5 ms-3 me-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" size="sm"  onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                </Form.Group>
               
              <div className='row g-0 ms-3 me-3'  >
              <Button variant="primary" id='button' onClick={handlesignin}  className='col col-sm-4  '  >
                    Log in
                </Button>

                <span className='col col-sm-4 text-center mt-2'>OR</span>

                <Button variant="primary" id='button' onClick={handlecreate} className='col col-sm-4 '  >
                    Sign up
                </Button>
              </div>

                <div className='d-flex justify-content-center align-items-center'>
                <Button variant="primary" id='button' onClick={Googlesignin} className=' mt-4 mb-4 '  >
                    Google
                </Button>
               </div>

            </Form>

        </div>

    )
}



// import React from 'react'
// import { auth } from '../firebase'
// import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth"
// import { setPersistence, browserLocalPersistence } from 'firebase/auth';

// export default function Login() {
// const login = async () => {
// try {
// signInWithEmailAndPassword(auth, "rasath123@gmail.com", "12345678").then((user)=>{
// console.log(user.user.email)
// setPersistence(auth, browserLocalPersistence);
// alert("Sucesss")
// }).catch((error)=>{
// alert(error.message)
// })
// } catch (error) {
// alert(error.message)
// }
// }
// return (
// <div>
// <button onClick={login}>
// create email
// </button>
// </div>
// )
// }

