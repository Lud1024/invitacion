import React, { useState, useEffect } from 'react';

// Configuración de Google Sheets - TU URL REAL DEL DESPLIEGUE
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbysGi1hYCIOsSyqHeZ4oB4GMA8IOYvJ6a82j5Rhudz0mezY6HoyQfxEx8SJjM36XNj2Pw/exec';

const AdminConfirmaciones = () => {
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [showLista, setShowLista] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

// Formatea la fecha para mostrarla como DD/MM/YYYY
const formatearFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  return fecha.toLocaleDateString('es-GT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};



  // Función para leer confirmaciones del localStorage
  const leerConfirmaciones = () => {
    try {
      const datos = localStorage.getItem('confirmaciones.txt');
      if (!datos) return [];

      const confirmaciones = datos.split('\n').filter(linea => linea.trim());

      // Formatear las fechas existentes al nuevo formato
      return confirmaciones.map(conf => {
        const partes = conf.split(' - ');
        if (partes.length === 2) {
          const [nombre, fecha] = partes;
          const fechaFormateada = formatearFecha(fecha);
          return `${nombre} - ${fechaFormateada}`;
        }
        return conf;
      });
    } catch (error) {
      console.error('Error leyendo confirmaciones:', error);
      return [];
    }
  };

  // Función para obtener datos de Google Sheets
const obtenerDatosDeGoogleSheets = async () => {
  try {
    const resp = await fetch(GOOGLE_SHEET_URL, { method: 'GET' });
    const data = await resp.json();         // <- directo a JSON

    if (data.ok && Array.isArray(data.confirmaciones)) {
      return data.confirmaciones.map(c => `${c.nombre} - ${c.timestamp}`);
    }

    // Respaldo local
    return leerConfirmaciones();
  } catch (e) {
    console.error('Error obteniendo datos de Google Sheets:', e);
    return leerConfirmaciones();
  }
};


  // Función para sincronizar datos
  const sincronizarDatos = async () => {
    try {
      setIsLoading(true);
      const datosRemotos = await obtenerDatosDeGoogleSheets();
      setConfirmaciones(datosRemotos);

      // Mostrar modal de éxito
      setModalMessage(`✅ Sincronización exitosa\n\nSe han cargado ${datosRemotos.length} confirmaciones desde la nube.`);
      setShowModal(true);
    } catch (error) {
      console.error('Error sincronizando:', error);

      // Mostrar modal de error
      setModalMessage('❌ Error de sincronización\n\nNo se pudieron cargar los datos remotos. Se muestran los datos locales disponibles.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar una confirmación específica
  const eliminarConfirmacion = (index) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta confirmación?')) {
      try {
        const confirmaciones = leerConfirmaciones();
        confirmaciones.splice(index, 1);

        // Reformatear fechas antes de guardar
        const confirmacionesFormateadas = confirmaciones.map(conf => {
          const partes = conf.split(' - ');
          if (partes.length === 2) {
            const [nombre, fecha] = partes;
            const fechaFormateada = formatearFecha(fecha);
            return `${nombre} - ${fechaFormateada}`;
          }
          return conf;
        });

        localStorage.setItem('confirmaciones.txt', confirmacionesFormateadas.join('\n'));
        setConfirmaciones(confirmacionesFormateadas);
        alert('Confirmación eliminada exitosamente.');
      } catch (error) {
        console.error('Error eliminando confirmación:', error);
        alert('Error al eliminar confirmación.');
      }
    }
  };

  // Función para limpiar todas las confirmaciones
  const limpiarTodasConfirmaciones = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar TODAS las confirmaciones? Esta acción no se puede deshacer.')) {
      try {
        localStorage.removeItem('confirmaciones.txt');
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
    const confirmar = leerConfirmaciones();
    setConfirmaciones(confirmar);
  }, []);

  return (
    <div className="admin-container">
      {/* Header del admin */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🎓 Panel de Administración - Confirmaciones</h1>
          <p>Gestión de asistencias para la graduación de parvularia</p>
        </div>
      </header>

      {/* Estadísticas */}
      <section className="admin-stats">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total de Confirmaciones</h3>
            <p className="stat-number">{confirmaciones.length}</p>
          </div>
          <div className="stat-card">
            <h3>Fecha de Última Confirmación</h3>
            <p className="stat-text">
              {confirmaciones.length > 0
                ? (() => {
                    const ultimaConfirmacion = confirmaciones[confirmaciones.length - 1];
                    const fecha = ultimaConfirmacion.split(' - ')[1];
                    return formatearFecha(fecha) || 'N/A';
                  })()
                : 'Sin confirmaciones'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Controles de administración */}
      <section className="admin-controls">
        <div className="controls-container">
          <button
            className="btn-refresh"
            onClick={sincronizarDatos}
            disabled={isLoading}
          >
            {isLoading ? '🔄 Sincronizando...' : '🔄 Sincronizar con Nube'}
          </button>
        </div>
      </section>

      {/* Tabla de confirmaciones */}
      <section className="admin-table-section">
        <div className="table-container">
          {confirmaciones.length === 0 ? (
            <div className="no-data">
              
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="confirmaciones-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre del Invitado</th>
                    <th>Fecha y Hora de Confirmación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmaciones.map((confirmacion, index) => {
                    const [nombre, timestamp] = confirmacion.split(' - ');
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="nombre-columna">{nombre || 'N/A'}</td>
                        <td className="timestamp-columna">{timestamp || 'N/A'}</td>
                        <td>
                          <span className="status-badge confirmado">Confirmado</span>
                        </td>
                        <td>
                          <button
                            className="btn-eliminar"
                            onClick={() => eliminarConfirmacion(index)}
                            title="Eliminar esta confirmación"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Modal de sincronización */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content sync-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📊 Sincronización</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="sync-message">
                <pre>{modalMessage}</pre>
              </div>
              <div className="modal-actions">
                <button
                  className="btn-aceptar"
                  onClick={() => setShowModal(false)}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminConfirmaciones;