import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from '../http';

export default function Patient() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.title = "Patients List";
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        http.get('/patients')
            .then(response => {
                setPatients(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleDelete = (id) => {
        http.delete('/delete_patient/' + id)
            .then(response => {
                fetchPatients();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter patients based on search term
    const filteredPatients = patients.filter(patient =>
        patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Link to={"/add-patient"}  className="btn btn-large" style={{ marginRight: "10px", backgroundColor: '#303c6c', color: '#fff',float: "right" }}>Add Patient</Link>
            <br /><br />
            <h2>Patients List</h2>
            <br />
            <div className="form-group col-lg-6">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearch}
                    
                />
            </div>
            <br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Patient's Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients && filteredPatients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.id}</td>
                            <td>{patient.full_name}</td>
                            <td>{patient.phone}</td>
                            <td>
                                <Link to={"/edit-patient/" + patient.id} className="btn" style={{ marginRight: "10px", backgroundColor: '#2E9cca', color: '#fff' }} >Edit</Link>
                                <button onClick={() => { handleDelete(patient.id) }} style={{ marginRight: "10px", backgroundColor: '#F76C6C', color: '#fff' }} className="btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
