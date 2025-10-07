import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitacion from './components/Invitacion';
import AdminConfirmaciones from './components/AdminConfirmaciones';
import './styles/main.css';

// Componente simple para manejar errores 404
const NotFound = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
    }}>
        <div>
            <h1>404 - Página no encontrada</h1>
            <p>La página que buscas no existe.</p>
            <button
                onClick={() => window.location.href = '/'}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Ir al inicio
            </button>
        </div>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminConfirmaciones />} />
                <Route path="/" element={<Invitacion />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    </React.StrictMode>
);