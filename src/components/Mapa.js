import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const Mapa = ({ coordenadas }) => {
    const mapaRef = useRef(null);
    const mapaInstanceRef = useRef(null);

    useEffect(() => {
        if (mapaRef.current && !mapaInstanceRef.current) {
            // Inicializar mapa
            mapaInstanceRef.current = L.map(mapaRef.current, {
                center: coordenadas,
                zoom: 15,
                zoomControl: true,
                scrollWheelZoom: true
            });

            // Agregar capa de tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(mapaInstanceRef.current);

            // Agregar marcador personalizado elegante
            const markerIcon = L.divIcon({
                html: `
                    <div style="
                        background: linear-gradient(135deg, #D4AF37, #FFD700);
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        border: 4px solid white;
                        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #2d3748;
                        font-weight: bold;
                        font-size: 20px;
                        animation: elegantBounce 3s ease-in-out infinite;
                        position: relative;
                    ">
                        🎓
                    </div>
                    <style>
                        @keyframes elegantBounce {
                            0%, 100% {
                                transform: translateY(0) scale(1);
                            }
                            50% {
                                transform: translateY(-8px) scale(1.05);
                            }
                        }
                    </style>
                `,
                className: 'custom-marker',
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });

            L.marker(coordenadas, { icon: markerIcon })
                .addTo(mapaInstanceRef.current)
                .bindPopup(`
                    <div style="text-align: center; font-family: 'Inter', sans-serif;">
                        <h3 style="color: #D4AF37; margin-bottom: 8px; font-size: 1.3rem;">🏫 Gardens</h3>
                        <p style="margin: 4px 0; color: #2d3748; font-weight: 600;">Chiquimulilla, Santa Rosa</p>
                        <p style="margin: 8px 0; color: #2C3E50; font-size: 0.9rem;">¡Los esperamos!</p>
                    </div>
                `)
                .openPopup();
        }

        // Cleanup function
        return () => {
            if (mapaInstanceRef.current) {
                mapaInstanceRef.current.remove();
                mapaInstanceRef.current = null;
            }
        };
    }, [coordenadas]);

    return (
        <div className="mapa-wrapper">
            <div 
                ref={mapaRef} 
                style={{
                    width: '100%',
                    height: '400px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    zIndex: 1
                }}
            />
            <div className="mapa-info">
                <div className="coordenadas">
                    <span className="coord-label">Lat:</span>
                    <span className="coord-value">{coordenadas[0]}</span>
                    <span className="coord-label">Lng:</span>
                    <span className="coord-value">{coordenadas[1]}</span>
                </div>
                <button 
                    className="btn-como-llegar"
                    onClick={() => {
                        const [lat, lng] = coordenadas;
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                    }}
                >
                    Cómo llegar
                </button>
            </div>
        </div>
    );
};

export default Mapa;