import React from 'react'
import { useState,useEffect } from 'react'
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from './Dashboard';



const Home = () => {
  
  const [data, setdata] = useState({ key:'', value:'' })
  const [array, setarray] = useState([]);

useEffect(() => {
  const savedArray = JSON.parse(localStorage.getItem('arrayData')) || [];
  setarray(savedArray);
}, []);

// Save array to localStorage whenever it changes
useEffect(() => {
  if (array.length > 0) {
    localStorage.setItem('arrayData', JSON.stringify(array));
  }
}, [array]);

  const handlechange = (e) => {

    const{name,value}=e.target;
    setdata((data)=>({
   ...data,
    [name]:value,
    }))

  }


  // const handlearray = () => {
  //   if (data.key.trim() && data.value.trim()) { // Ensure inputs are not empty
  //     setarray((prev) => [
  //       ...prev,
  //       { ...data },
  //     ]);
  //     setdata({ key: '', value: '' }); // Reset input fields
  //   }
  // };




  const handlearray =()=>{
    setarray((prev)=>[
      ...prev,
     {...data},
    ]);
   setdata({key:"",value:""})


  //  console.log(array[0].key);
  }
  const handledeleteLast = () => {
    setarray((prevArray) => {
      const newArray = [...prevArray]; // Make a copy of the array
      newArray.pop(); // Remove the last element
      localStorage.setItem('arrayData', JSON.stringify(newArray)); // Update localStorage
      setarray(newArray); // Update state
    });
  };


  return (
    <div>
      <Sidebar></Sidebar>
      <label htmlFor="key">Key:</label>
      <input type='text' id='key' name='key' onChange={handlechange} ></input>
      <label htmlFor="value">Value:</label>
      <input type='text' id='value' name='value' onChange={handlechange} ></input>

      <button onClick={handlearray}>Add</button>
      <button onClick={handledeleteLast}>Delete</button>
      <h5> Key value pairs</h5>
      <ul>
  {array?.map((item, index) => (
    <li key={index}>
      <strong>Key:</strong> {item.key}, <strong>Value:</strong> {item.value}
    </li>
  ))}
</ul>

<Link state={{array}}  to="/dashboard">Dashboard</Link>


    </div>
  )
}

export default Home