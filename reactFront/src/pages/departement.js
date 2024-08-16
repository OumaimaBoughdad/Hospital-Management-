import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import http from '../http';

export const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.title = "Department List";
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        http.get('/departement')
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        http.delete('/department-delete/' + id)
            .then(response => {
                fetchDepartments();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDepartments = departments.filter(department =>
        department.intitule.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const styles={

        jana:{
            backgroundColor:'#f0f2f5'     
        }

    };

    return (
        <div>
            <Link to={"/adddepar"} className="btn btn-primary btn-large" style={{ float: "right" }}>Add Department</Link>
            <br /><br />
            <h2 className='jana'>Department List</h2>
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

            <div className="container">
                <div className="row">
                    {filteredDepartments.map(department => (
                        <div className="col-md-4" key={department.id}>
                            <div className="card" style={{ width: '18rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{department.intitule}</h5>
                                    <Link to={"/edit-department/" + department.id} className="btn btn-primary" style={{ marginRight: "10px" }}>Edit</Link>
                                    <button onClick={() => { handleDelete(department.id) }} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Departments;
