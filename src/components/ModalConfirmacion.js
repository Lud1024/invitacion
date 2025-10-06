import React, { useState, useEffect } from 'react';

const ModalConfirmacion = ({ isOpen, onClose, onSubmit, isLoading, mensaje }) => {
  const [nombre, setNombre] = useState('');
  const [nombreExistente, setNombreExistente] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Usar la misma clave que el componente AdminConfirmaciones

  // Función para leer confirmaciones del localStorage
  const leerConfirmaciones = () => {
    try {
      const datos = localStorage.getItem('confirmaciones.txt');
      return datos ? datos.split('\n').filter(linea => linea.trim()) : [];
    } catch (error) {
      console.error('Error leyendo confirmaciones:', error);
      return [];
    }
  };

  // Función para guardar confirmaciones en localStorage
  const guardarConfirmaciones = (confirmaciones) => {
    try {
      localStorage.setItem('confirmaciones.txt', confirmaciones.join('\n'));
    } catch (error) {
      console.error('Error guardando confirmaciones:', error);
    }
  };

  // Función para verificar si el nombre ya existe
  const verificarNombreExistente = async (nombreIngresado) => {
    try {
      setIsChecking(true);

      // Simular una pequeña demora para mejor UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const confirmaciones = leerConfirmaciones();
      const nombreEncontrado = confirmaciones.some(
        linea => linea.toLowerCase().trim() === nombreIngresado.toLowerCase().trim()
      );

      setNombreExistente(nombreEncontrado);
      return nombreEncontrado;
    } catch (error) {
      console.error('Error verificando nombre:', error);
      setNombreExistente(false);
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  // Función para agregar nombre al localStorage
  const agregarNombreAStorage = async (nombreIngresado) => {
    try {
      const timestamp = new Date().toLocaleString('es-GT');
      const nuevaConfirmacion = `${nombreIngresado} - ${timestamp}`;

      const confirmaciones = leerConfirmaciones();
      confirmaciones.push(nuevaConfirmacion);

      guardarConfirmaciones(confirmaciones);

      return { success: true };
    } catch (error) {
      console.error('Error agregando nombre:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    setIsChecking(true);
    const existe = await verificarNombreExistente(nombre.trim());

    if (existe) {
      alert(`¡Hola ${nombre}! Ya tienes tu asistencia confirmada. ¡Te esperamos!`);
      setIsChecking(false);
      return;
    }

    try {
      await agregarNombreAStorage(nombre.trim());
      onSubmit(nombre.trim());
    } catch (error) {
      console.error(error);
      alert('Error al confirmar asistencia. Por favor intenta de nuevo.');
    }
    setIsChecking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🎓 Confirmar Asistencia</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {!mensaje ? (
            <>
              <p className="modal-descripcion">
                Ingresa tu nombre para confirmar tu asistencia a la graduación:
              </p>

              <form onSubmit={handleSubmit} className="form-confirmacion">
                <div className="input-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe tu nombre"
                    className={`input-nombre ${nombreExistente ? 'nombre-existente' : ''}`}
                    disabled={isChecking || isLoading}
                    autoFocus
                  />
                  {isChecking && (
                    <div className="checking-indicator">
                      Verificando nombre...
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="submit"
                    className="btn-confirmar"
                    disabled={isLoading || isChecking}
                  >
                    {isLoading ? 'Confirmando...' : 'Confirmar Asistencia'}
                  </button>
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="modal-mensaje">
              <div className="mensaje-icono">✓</div>
              <p>{mensaje}</p>
              <button className="btn-cerrar-mensaje" onClick={onClose}>
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
