import React, { useState, useEffect } from 'react';
import http from '../http';
import './styles.css'; // Import the CSS file
 


export default function Home() {
    const [information, setInformation] = useState({});

    useEffect(() => {
        document.title = "Home";
        fetchInformation();
    }, []);

    const fetchInformation = () => {
        http.get('/information')
            .then(response => {
                setInformation(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const styles = {
        container: {
            padding: '40px',
            fontFamily: 'Poppins, Arial, sans-serif',
            color: '#111',
            backgroundImage: 'url("/bc.jpg")', // Path to the image in the public directory
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // Make the background fixed
            minHeight: '100vh',
            width: '100%', // Ensures full width
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardGroup: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
        },
        card: {
            flex: '1 1 calc(33.333% - 20px)',
            borderRadius: '15px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            color: 'white',
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
        },
        primary: {
            backgroundColor: '#303c6c', // Dark Blue
        },
        secondary: {
            backgroundColor: '#77A6F7', // Blue
        },
        success: {
            backgroundColor: '#5da2d5', // Light Blue
        },
        cardTitle: {
            fontSize: '1.6em',
            marginBottom: '15px',
        },
        cardText: {
            fontSize: '1.4em',
            margin: 0,
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.cardGroup}>
                <div style={{ ...styles.card, ...styles.primary }}>
                    <div>
                        <h2 style={styles.cardTitle}>Total Doctors</h2>
                        <p style={styles.cardText}>
                            <h3>Amount: {information.totalDoctors}</h3>
                        </p>
                    </div>
                </div>

                <div style={{ ...styles.card, ...styles.secondary }}>
                    <div>
                        <h2 style={styles.cardTitle}>Today's Appointments</h2>
                        <p style={styles.cardText}>
                            <h3>Amount: {information.todayAppointments}</h3>
                        </p>
                    </div>
                </div>

                <div style={{ ...styles.card, ...styles.success }}>
                    <div>
                        <h2 style={styles.cardTitle}>Total Appointments</h2>
                        <p style={styles.cardText}>
                            <h3>Amount: {information.totalAppointments}</h3>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
