import React, { useState, useEffect } from 'react';
import http from '../http';

export default function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [input, setInput] = useState({});

    useEffect(() => {
        document.title = "Appointment List";
        fetchAppointments();
    }, []);

    const handleDelete = (id) => {
        http.delete('/appointment-remove/' + id)
            .then(response => {
                fetchAppointments();
            })
            .catch(e => {
                console.log("Error deleting Appointment:", e); // Debugging line
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(values => ({ ...values, [name]: value }));
    };

    const fetchAppointments = () => {
        http.get('/appointment-list')
            .then(response => {
                setAppointments(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post('/appointment-search', input)
            .then(response => {
                setAppointments(response.data);
            })
            .catch(e => {
                console.log("Not Found");
            });
    };

    const handleCancel = (id) => {
        http.patch('/appointment-cancel/' + id)
            .then(response => {
                fetchAppointments();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleComplete = (id) => {
        http.patch('/appointment-complete/' + id)
            .then(response => {
                fetchAppointments();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleUpdateState = () => {
        http.patch('/appointments/update-state')
            .then(response => {
                fetchAppointments(); // Fetch updated appointments after updating the state
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <br></br>
            <h2>Appointment List</h2>
            <br></br>
            <div className="row">
                <div className="col-lg-4">
                    <label htmlFor="name">Patient Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={input.name || ''}
                        onChange={handleChange}
                        placeholder="Patient Name"
                    />
                </div>
                <div className="col-lg-4">
                    <label htmlFor="name">Appointment Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={input.date || ''}
                        onChange={handleChange}
                        placeholder="Appointment Date"
                    />
                </div>
                <div className="col-lg-4">
                    <button
                        className="btn"
                        style={{ marginTop: "25px", marginRight: "10px", backgroundColor: '#303c6c', color: '#fff' }}
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                    <button
                        className="btn"
                        style={{ marginTop: "25px", backgroundColor: '#4caf50', color: '#fff' }}
                        onClick={handleUpdateState}
                    >
                        Update State
                    </button>
                </div>
            </div>
            <br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Patient Name</th>
                        <th>Patient Phone</th>
                        <th>Doctor Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments && appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.id}</td>
                            <td>{appointment.appointment_date}</td>
                            <td>{appointment.appointment_time}</td>
                            <td>{appointment.patient_name}</td>
                            <td>{appointment.patient_phone}</td>
                            <td>{appointment.doctor.name}</td>
                            <td>{appointment.status}</td>
                            <td>
                                {appointment.status === "Appointed" ? (
                                    <>
                                        <button
                                            onClick={() => handleCancel(appointment.id)}
                                            className="btn"
                                            style={{ marginRight: "10px", backgroundColor: '#F76C6C', color: '#fff' }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleComplete(appointment.id)}
                                            className="btn"
                                            style={{ backgroundColor: '#4caf50', color: '#fff' }}
                                        >
                                            Complete
                                        </button>
                                    </>
                                ) : (
                                    appointment.status === "Cancelled" ? "Cancelled" : "Completed"
                                )}
                                <button
                                    onClick={() => handleDelete(appointment.id)}
                                    style={{ marginLeft: "10px", backgroundColor: '#F76C6C', color: '#fff' }}
                                    className="btn"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
