import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from '../http';

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        document.title = "Doctor List";
        fetchDoctors();
        fetchDepartments();
    }, []);

    const fetchDoctors = () => {
        http.get('/doctor-list')
            .then(response => {
                console.log("Doctors data:", response.data); // Debugging line
                setDoctors(response.data);

            })
            .catch(e => {
                console.log("Error fetching doctors:", e); // Debugging line
            });
    };

    const fetchDepartments = () => {
        http.get('/departments')
            .then(response => {
                console.log("Departments data:", response.data); // Debugging line
                setDepartments(response.data);
            })
            .catch(e => {
                console.log("Error fetching departments:", e); // Debugging line
            });
    };

    const handleDelete = (id) => {
        http.delete('/doctor-delete/' + id)
            .then(response => {
                fetchDoctors();
            })
            .catch(e => {
                console.log("Error deleting doctor:", e); // Debugging line
            });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    // Filter doctors based on search term and selected department
    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDepartment ? doctor.departement_id === parseInt(selectedDepartment) : true)
    );

    return (
        <div>
            <Link to={"/add-doctor"} className="btn btn-large" style={{ float: "right", marginRight: "10px", backgroundColor: '#303c6c', color: '#fff' }}>Add Doctor</Link>
            <br /><br />
            <h2>Doctor List</h2>
            <br />

            <div className="row">
                <div className="form-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="form-group col-lg-4">
                    <select
                        className="form-control"
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                    >
                        <option value="">All Departments</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.intitule}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <br />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Appointment</th>
                        <th>Doctor's Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDoctors.map((doctor, index) => (
                        <tr key={index}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.phone}</td>
                            <td>{doctor.department.intitule || 'Unknown'}</td>
                            <td>
                                <Link to={"/appointment-add/" + doctor.id} className="btn" style={{ marginRight: "10px", backgroundColor: '#303c6c', color: '#fff' }}>Make an Appointment</Link>
                            </td>
                            <td>
                                <Link to={"/edit-doctor/" + doctor.id} className="btn" style={{ marginRight: "10px", backgroundColor: '#2E9cca', color: '#fff' }}>Edit</Link>
                                <button onClick={() => { handleDelete(doctor.id) }} style={{ marginRight: "10px", backgroundColor: '#F76C6C', color: '#fff' }} className="btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
