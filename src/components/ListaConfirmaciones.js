import React, { useState, useEffect } from 'react';

const ListaConfirmaciones = () => {
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [showLista, setShowLista] = useState(false);

  const ARCHIVO_CONFIRMACIONES = 'confirmaciones.txt';

  // Función para leer confirmaciones del localStorage
  const leerConfirmaciones = () => {
    try {
      const datos = localStorage.getItem(ARCHIVO_CONFIRMACIONES);
      return datos ? datos.split('\n').filter(linea => linea.trim()) : [];
    } catch (error) {
      console.error('Error leyendo confirmaciones:', error);
      return [];
    }
  };

  // Función para eliminar todas las confirmaciones
  const limpiarConfirmaciones = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las confirmaciones?')) {
      try {
        localStorage.removeItem(ARCHIVO_CONFIRMACIONES);
        setConfirmaciones([]);
        alert('Todas las confirmaciones han sido eliminadas.');
      } catch (error) {
        console.error('Error limpiando confirmaciones:', error);
        alert('Error al limpiar confirmaciones.');
      }
    }
  };

  // Función para exportar confirmaciones a archivo TXT
  const exportarConfirmaciones = () => {
    try {
      const confirmaciones = leerConfirmaciones();
      let contenido = `CONFIRMACIONES DE ASISTENCIA - GRADUACIÓN PARVULARIA\n`;
      contenido += `Fecha de generación: ${new Date().toLocaleString('es-GT')}\n`;
      contenido += `Total de confirmaciones: ${confirmaciones.length}\n\n`;
      contenido += `LISTA DE ASISTENTES:\n`;
      contenido += confirmaciones.map((conf, index) => `${index + 1}. ${conf}`).join('\n');

      const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `confirmaciones-graduacion-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exportando confirmaciones:', error);
      alert('Error al exportar confirmaciones.');
    }
  };

  useEffect(() => {
    if (showLista) {
      const confirmar = leerConfirmaciones();
      setConfirmaciones(confirmar);
    }
  }, [showLista]);

  return (
    <div className="lista-confirmaciones-container">
      <button
        className="btn-ver-lista"
        onClick={() => setShowLista(!showLista)}
      >
        {showLista ? '🙈 Ocultar Lista' : '📋 Ver Confirmaciones'}
      </button>

      {showLista && (
        <div className="lista-confirmaciones">
          <div className="lista-header">
            <h3>📋 Lista de Confirmaciones</h3>
            <div className="lista-actions">
              <button
                className="btn-exportar"
                onClick={exportarConfirmaciones}
                title="Exportar a archivo TXT"
              >
                📥 Exportar
              </button>
              <button
                className="btn-limpiar"
                onClick={limpiarConfirmaciones}
                title="Eliminar todas las confirmaciones"
              >
                🗑️ Limpiar
              </button>
            </div>
          </div>

          {confirmaciones.length === 0 ? (
            <p className="no-confirmaciones">
              Aún no hay confirmaciones de asistencia.
            </p>
          ) : (
            <>
              <p className="total-confirmaciones">
                Total: <strong>{confirmaciones.length}</strong> confirmaciones
              </p>
              <div className="confirmaciones-list">
                {confirmaciones.map((confirmacion, index) => (
                  <div key={index} className="confirmacion-item">
                    <span className="numero">{index + 1}.</span>
                    <span className="nombre">{confirmacion}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ListaConfirmaciones;