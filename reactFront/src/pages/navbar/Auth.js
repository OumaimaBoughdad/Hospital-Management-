import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from '../Home';
import Patient from '../patient';
import Error from '../Error';
import DoctorList from '../DoctorList';
import AddDoctor from '../AddDoctor';
import EditDoctor from '../EditDoctor';
import AppointmentList from '../AppointmentList';
import AddAppointment from '../AddAppointment';
import AuthUser from '../AuthUser';
import EditPatient from '../EditPatient';
import AddPatient from '../addPatient';
import Departments from '../departement';

import 'bootstrap/dist/css/bootstrap.min.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Auth() {

    const { token, logout } = AuthUser();
    const logoutUser = () => {
        if (token !== undefined) {
            logout();
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#303c6c' }}>
                <div className="container-fluid">
                    <Link to={"/home"} className='navbar-brand d-flex align-items-center'>
                        <i className="fas fa-hospital-symbol me-2"></i>
                        Boughdad's private hospital
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className='nav-link'>
                                    <i className="fas fa-home me-1"></i>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/doctor-list"} className='nav-link'>
                                    <i className="fas fa-user-md me-1"></i>
                                    Doctor's List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/appointment-list"} className='nav-link'>
                                    <i className="fas fa-calendar-alt me-1"></i>
                                    Appointment List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/patient"} className='nav-link'>
                                    <i className="fas fa-procedures me-1"></i>
                                    Patients List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <span role="button" className="nav-link" onClick={logoutUser}>
                                    <i className="fas fa-sign-out-alt me-1"></i>
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/doctor-list" element={<DoctorList />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/add-patient" element={<AddPatient />} />
                    <Route path="/edit-doctor/:id" element={<EditDoctor />} />
                    <Route path="/edit-patient/:id" element={<EditPatient />} />
                    <Route path="/appointment-list" element={<AppointmentList />} />
                    <Route path="/appointment-add/:id" element={<AddAppointment />} />
                    <Route path="/patient" element={<Patient />} />
                    <Route path="/departement" element={<Departments />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </div>
    );
}
