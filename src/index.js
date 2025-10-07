import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitacion from './components/Invitacion';
import AdminConfirmaciones from './components/AdminConfirmaciones';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminConfirmaciones />} />
                <Route path="/" element={<Invitacion />} />
            </Routes>
        </Router>
    </React.StrictMode>
);