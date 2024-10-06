import React, { useEffect, useState } from 'react';

const MeetingInfo = () => {
    const [meetingInfo, setMeetingInfo] = useState(null);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        // Fetch meeting info from the API
        fetch('http://localhost:5049/api/meeting/info') // Ensure this matches the working Swagger URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMeetingInfo(data);
                setGreeting(getGreetingMessage());
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const getGreetingMessage = () => {
        const time = new Date().getHours();
        return time > 12 ? "Have a good day!" : "Good Morning!";
    };

    return (
        <main className="text-center">
            <h1 className="h4">{greeting}</h1>
            <p>Do you want to attend the meeting?</p>

            {meetingInfo && (
                <div className="card my-2">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{meetingInfo.location}</li>
                        <li className="list-group-item">
                            The Meeting date is {new Date(meetingInfo.date).toLocaleString('en-GB')}
                        </li>
                        <li className="list-group-item">
                            {meetingInfo.numberOfPeople} Participants
                        </li>
                    </ul>
                </div>
            )}

            <a className="btn btn-sm btn-outline-primary" href="/register">
                Register Now!
            </a>
        </main>
    );
};

export default MeetingInfo;
