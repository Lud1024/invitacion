import React from 'react';
import ReactDOM from 'react-dom/client';
import Invitacion from './components/Invitacion';
import AdminConfirmaciones from './components/AdminConfirmaciones';
import './styles/main.css';

// Simple routing basado en URL
const getCurrentPage = () => {
    const path = window.location.pathname;
    return path === '/admin' ? 'admin' : 'invitacion';
};

const renderPage = () => {
    const page = getCurrentPage();

    if (page === 'admin') {
        return <AdminConfirmaciones />;
    }

    return <Invitacion />;
};

// Manejar navegación programática
window.navigateTo = (path) => {
    window.history.pushState({}, '', path);
    renderPage();
};

// Escuchar cambios de navegación del navegador
window.addEventListener('popstate', renderPage);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {renderPage()}
    </React.StrictMode>
);