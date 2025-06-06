// Details.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Details = () => {
    const { id } = useParams(); // Extracts the participant ID from the URL
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch participant details from the API
        fetch(`http://16.170.214.89:5049/api/meeting/details/${id}`)
            .then(response => response.json())
            .then(data => {
                setParticipant(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching participant details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!participant) return <p>No participant found.</p>;

    const className = participant.DoYouAttend ? 'primary' : 'danger';

    return (
        <main className="text-center">
            <h1 className="h4">Participant Detail</h1>
            <p>
                <span className={`badge text-bg-${className}`}>
                    {participant.DoYouAttend ? 'Joining' : 'Not Joining'}
                </span>
            </p>
            <p><strong>Name and Surname:</strong> {participant.name}</p>
            <p><strong>Email:</strong> {participant.email}</p>
            <p><strong>Phone Number:</strong> {participant.phone}</p>
            <button
                className={`btn btn-outline-${className}`}
                onClick={() => navigate('/')}
            >
                Home
            </button>
        </main>
    );
};

export default Details;
