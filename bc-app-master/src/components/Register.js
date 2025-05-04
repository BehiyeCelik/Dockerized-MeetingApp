import React, { useState, useEffect } from 'react';

const Register = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        DoYouAttend: ''
    });

    // State for participants
    const [participants, setParticipants] = useState([]);
    const [attendanceCount, setAttendanceCount] = useState(0);

    // Fetch participants when component mounts
    useEffect(() => {
        fetch('http://localhost:5049/api/meeting/list') // Adjust the URL to your endpoint
            .then(response => response.json())
            .then(data => {
                setParticipants(data);
                // Count the number of participants who will attend
                const count = data.filter(participant => participant.DoYouAttend).length;
                setAttendanceCount(count);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    // Handle change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation if needed
        if (formData.name && formData.phone && formData.email && formData.DoYouAttend) {
            // Convert string to boolean
            const updatedFormData = {
                ...formData,
                DoYouAttend: formData.DoYouAttend === 'true'
            };

            fetch('http://localhost:5049/api/meeting/apply', { // Adjust the URL to your endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Registration successful!');
                    // Fetch the updated list of participants
                    return fetch('http://localhost:5049/api/meeting/list');
                } else {
                    alert('Failed to register. Please try again.');
                }
            })
            .then(response => response.json())
            .then(data => {
                setParticipants(data);
                const count = data.filter(participant => participant.DoYouAttend).length;
                setAttendanceCount(count);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <main className="text-center">
            <h1 className="h4">Attendance List</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name and Surname</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="DoYouAttend" className="form-label">Do You Attend?</label>
                    <select
                        id="DoYouAttend"
                        name="DoYouAttend"
                        value={formData.DoYouAttend}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Choose</option>
                        <option value="true">Yes, I do</option>
                        <option value="false">No, I do not</option>
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Submit!</button>
            </form>

            <div className="mt-4">
                <h2 className="h4">Participants List</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Attendance Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map(participant => {
                            const status = participant.DoYouAttend ? "Yes" : "No";
                            const rowClass = participant.DoYouAttend ? "table-success" : "table-danger";
                            return (
                                <tr key={participant.id} className={rowClass}>
                                    <td>{participant.name}</td>
                                    <td>{status}</td>
                                    <td>
                                        <a className="btn btn-sm btn-primary" href={`/details/${participant.id}`}>Detail</a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="card mt-3">
                    <div className="card-body">
                        <span>Number of Attendances: {attendanceCount}</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;
