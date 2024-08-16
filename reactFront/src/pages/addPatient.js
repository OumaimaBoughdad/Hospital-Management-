import React, { useState, useEffect } from 'react';
import http from '../http';
import { useNavigate } from 'react-router-dom';

export default function AddPatient() {

   const navigate = useNavigate();

   const [input, setInput] = useState({});
   const [messages, setMessages] = useState('');

   useEffect(() => {
       document.title = "Add Patient";
   }, []);

   const handleChange = (e) => {
       const { name, value } = e.target;
       setInput(values => ({ ...values, [name]: value }));
   };

   const handleSubmit = (e) => {
       e.preventDefault();
       console.log(input);
       http.post('/addpatient', input)
           .then(response => {
               setMessages("Patient added successfully");
               console.log(messages);
           })
           .catch(e => {
               console.log("Not added", e);
           });
   };

   return (
       <div>
           <br />
           {messages && 
               <div className="alert alert-primary" role="alert">
                   {messages}
               </div>
           }
           <div style={{ border: "2px solid black", padding: "50px" }}>
               <h2>Add Patient</h2>
               <br />
               <form onSubmit={handleSubmit}>
                   <div className="form-group col-lg-6">
                       <label htmlFor="full_name">Name</label>
                       <input
                           type="text"
                           className="form-control"
                           id="full_name"
                           name="full_name"
                           value={input.full_name || ''}
                           onChange={handleChange}
                           placeholder="Enter full name"
                       />
                   </div>
                   <div className="form-group col-lg-6">
                       <label htmlFor="email">Email</label>
                       <input
                           type="text"
                           className="form-control"
                           id="email"
                           name="email"
                           value={input.email || ''}
                           onChange={handleChange}
                           placeholder="Enter email"
                       />
                   </div>
                   <div className="form-group col-lg-6">
                       <label htmlFor="phone">Phone</label>
                       <input
                           type="number"
                           className="form-control"
                           id="phone"
                           name="phone"
                           value={input.phone || ''}
                           onChange={handleChange}
                           placeholder="Enter phone"
                       />
                   </div>
                   <br />
                   <button type="submit" className="btn" style={{ marginRight: "10px", backgroundColor: '#2E9cca', color: '#fff' }} >Submit</button>
               </form>
           </div>
       </div>
   );
}
