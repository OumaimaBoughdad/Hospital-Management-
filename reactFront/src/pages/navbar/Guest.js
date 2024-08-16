import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Guest() {
    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#303c6c' }}>
                <div className="container-fluid">
                    <Link to={"#"} className='navbar-brand d-flex align-items-center'>
                        <i className="fas fa-hospital-symbol me-2"></i>
                        Square Hospital
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li style={{ marginRight: "10px", backgroundColor: '#303c6c', color: '#fff' }} className="nav-item">
                                <Link className="nav-link" to="/" style={{ marginRight: "10px", backgroundColor: '#303c6c', color: '#fff' }}>
                                    <i className="fas fa-sign-in-alt me-1"></i>
                                    Login
                                </Link>
                            </li>
                            {/* Uncomment the following lines if you want to add the Register link back */}
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/register" style={{ backgroundColor: '#303c6c', color: '#fff', borderRadius: '5px' }}>
                                    <i className="fas fa-user-plus me-1"></i>
                                    Register
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Login />} />
                    {/* Uncomment the following line if you want to add the Register route back */}
                    {/* <Route path="/register" element={<Register />} /> */}
                </Routes>
            </div>
        </div>
    );
}
