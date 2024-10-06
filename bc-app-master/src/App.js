import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MeetingInfo from './components/MeetingInfo';
import Register from './components/Register';
import Details from './components/Details';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<MeetingInfo />} />
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
