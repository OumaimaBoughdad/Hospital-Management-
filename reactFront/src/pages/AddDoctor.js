import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../http';

export default function AddDoctor() {
    const [departments, setDepartments] = useState([]);
    const [input, setInput] = useState({
        name: '',
        phone: '',
        departement_id: '' // Changed to match the backend
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        http.get('/departments')
            .then(response => {
                setDepartments(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post('/add-doctor/process', input)
            .then(response => {
                navigate('/doctor-list');
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departement_id">Department</label>
                    <select
                        className="form-control"
                        name="departement_id"
                        value={input.departement_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.intitule}
                            </option>
                        ))}
                    </select>
                </div>
                <br/>
                <button style={{ marginRight: "10px", backgroundColor: '#303c6c', color: '#fff' }} type="submit" className="btn ">Add Doctor</button>
            </form>
        </div>
    );
}
