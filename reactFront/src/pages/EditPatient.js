import React from 'react'

import { useState,useEffect } from 'react'
import http from '../http'
import { useNavigate,useParams } from 'react-router-dom';

export default function EditPatient(props) {

   const navigate = useNavigate();

   const[input,setInput] = useState({});

   const[patient,setPatient] = useState([]);

   const { id } = useParams();

   const[messages,setMessages] = useState();

   useEffect(() => {

        document.title = "Edit patient";
        fetchPatient ();

    }, [])

    const fetchPatient = () => {
        http.get('/patient-edit/'+id)
            .then(response => {
                setPatient(response.data)
                setInput(
                    {
                        full_name:response.data.full_name,
                        email:response.data.email,
                        phone:response.data.phone,

                    }
                )
            })
            .catch(e => {
                console.log(e);
            });
    }

   const handleChange = (e) => {
        
        const name=e.target.name;
        const value=e.target.value;
        setInput(values=>({...values,[name]:value}));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        http.patch('/patient-update/'+id,input)
           .then(response => {
                

                setMessages("Patient updated successfully");
                console.log(messages);


            })
            .catch(e => {
                console.log("Not added");
            });
    }


  return (
    <div>
 
        <br></br>

        {messages && 
        
            <div className="alert alert-primary" role="alert">
                {messages}
            </div>

        }

        <div style={{ border: "2px solid black",padding:"50px" }}>

        <h2>Edit Doctor</h2>

        <br></br>

            <div className="form-group col-lg-6">
                <label htmlFor="full_name">Name</label>
                <input type="text" className="form-control" id="full_name" name="full_name" value={input.full_name|| ''} onChange={handleChange} placeholder="Enter name" />
            </div>
            <div className="form-group col-lg-6">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" name="email" value={input.email || ''} onChange={handleChange} placeholder="Enter email" />
            </div>
            <div className="form-group col-lg-6">
                <label htmlFor="name">Phone</label>
                <input type="number" className="form-control" id="phone" name="phone" value={input.phone || ''} onChange={handleChange}  placeholder="Enter phone" />
            </div>

            <br></br>

            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Update</button>


        </div>

    </div>
  )
}
