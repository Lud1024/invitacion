import React, { useState } from 'react';

// (mueve tus archivos a: src/assets/images/)
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';

const Carrusel = () => {
  const [imagenActual, setImagenActual] = useState(0);

  // ahora son URLs procesadas por webpack
  const imagenes = [img1, img2, img3, img4];

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const irAImagen = (indice) => setImagenActual(indice);

  return (
    <div className="carrusel-container">
      <div className="carrusel">
        <button className="btn-navegacion btn-anterior" onClick={imagenAnterior}>
          &#8249;
        </button>

        <div className="imagen-container">
          <img
            src={imagenes[imagenActual]}
            alt={`Imagen ${imagenActual + 1}`}
            className="imagen-carrusel"
          />
          <div className="overlay-imagen">
            <span className="numero-imagen">
              {imagenActual + 1} / {imagenes.length}
            </span>
          </div>
        </div>

        <button className="btn-navegacion btn-siguiente" onClick={siguienteImagen}>
          &#8250;
        </button>
      </div>

      <div className="indicadores">
        {imagenes.map((_, indice) => (
          <button
            key={indice}
            className={`indicador ${indice === imagenActual ? 'activo' : ''}`}
            onClick={() => irAImagen(indice)}
          />
        ))}
      </div>

      <div className="navegacion-tactil">
        <div className="area-tactil izquierda" onClick={imagenAnterior}></div>
        <div className="area-tactil derecha" onClick={siguienteImagen}></div>
      </div>
    </div>
  );
};

export default Carrusel;
