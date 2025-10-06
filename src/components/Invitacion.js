import React, { useState, useEffect } from 'react';
import Carrusel from './Carrusel';
import Mapa from './Mapa';
import ModalConfirmacion from './ModalConfirmacion';

// Logo resuelto por Webpack desde src/assets
const logo = new URL('../assets/logo.png', import.meta.url).href;

const Invitacion = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleConfirmarAsistencia = () => setShowModal(true);

  const handleModalClose = () => {
    setShowModal(false);
    setMensaje('');
  };

  const handleNombreSubmit = async (nombre) => {
    setIsLoading(true);
    try {
      // Simulación de escritura/registro
      await new Promise((r) => setTimeout(r, 1000));
      setMensaje(`¡Gracias, ${nombre}! Tu asistencia ha sido confirmada.`);
      setTimeout(() => handleModalClose(), 2000);
    } catch {
      setMensaje('Error al confirmar asistencia. Inténtalo de nuevo.');
    }
    setIsLoading(false);
  };

  const graduacionData = {
    fecha: '25 de octubre',
    hora: '9:00 AM',
    lugar: 'Gardens, Chiquimulilla, Santa Rosa',
    coordenadas: [14.09800, -90.37334],
  };

  return (
    <div
      className={`invitacion-container ${isVisible ? 'visible' : ''} ${
        showModal ? 'modal-open' : ''
      }`}
    >
      {/* Header elegante */}
      <header className="invitacion-header">
        <div className="header-content">
          <h1 className="titulo-principal"> Graduación Párvulos 3 </h1>
          <h2 className="titulo-principal">CTS</h2>
          <p className="subtitulo">¡Celebrando los logros de nuestros pequeños!</p>
          <div className="decoracion"></div>
        </div>
      </header>

      {/* Contenido principal - Una sola página con scroll */}
      <main className="invitacion-main-single">
        {/* Sección de inicio */}
        <section className="seccion-inicio">
          <div className="info-principal">
            <h2 className="titulo-principal">Invitación</h2>
            <div className="detalles">
              <div className="detalle-item fecha">
                <span className="icono">📅</span>
                <span className="texto-detalle">{graduacionData.fecha}</span>
              </div>
              <div className="detalle-item hora">
                <span className="icono">🕐</span>
                <span className="texto-detalle">{graduacionData.hora}</span>
              </div>
              <div className="detalle-item lugar">
                <span className="icono">📍</span>
                <span className="texto-detalle">{graduacionData.lugar}</span>
              </div>
            </div>
            <p className="mensaje-invitacion">
              ¡Ven a celebrar con nosotros! <br />
              Nuestros pequeños están listos para mostrar todo lo que han aprendido con tanto cariño y dedicación. 🌟
            </p>
          </div>
        </section>

        {/* Sección de galería */}
        <section className="seccion-galeria">
          <h2 className="fecha-titulo">Galería de Recuerdos</h2>
          <Carrusel />
        </section>

        {/* Sección de ubicación */}
        <section className="seccion-ubicacion">
          <h2 className="fecha-titulo">Ubicación del Evento</h2>
          <div className="mapa-container">
            <Mapa coordenadas={graduacionData.coordenadas} />
          </div>
          <div className="info-lugar"></div>
        </section>

        {/* Sección de confirmación */}
        <section className="seccion-confirmar">
          <h2 className="fecha-titulo">Confirma tu Asistencia</h2>
          <div className="formulario-confirmacion">
            <div className="opciones-asistencia">
              <button
                className="btn-asistencia confirmar"
                onClick={handleConfirmarAsistencia}
              >
                ✓ Asistiré
              </button>
            </div>
            <div className="mensaje-confirmacion">
              <p>¡Esperamos contar con tu presencia!</p>
            </div>
          </div>
        </section>

        {/* Sección del logo independiente (encima del footer) */}
        <section className="seccion-logo">
          <div className="logo-independiente">
            <img src={logo} alt="Logo CTS" className="logo-independiente-img" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="invitacion-footer">
        <div className="footer-content">
          <p className="footer-text">&copy; 2025 Colegio Técnico de Computación C.T.S.</p>
        </div>
      </footer>

      {/* Modal de confirmación */}
      <ModalConfirmacion
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleNombreSubmit}
        isLoading={isLoading}
        mensaje={mensaje}
      />
    </div>
  );
};

export default Invitacion;
