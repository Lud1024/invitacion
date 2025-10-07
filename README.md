# 🎓 Invitación de Graduación Parvularia Interactiva

Una elegante y moderna invitación digital especialmente diseñada para graduaciones de parvularia, creada con React. Con características interactivas como carrusel de imágenes, mapa integrado, fondo blanco con detalles dorados y un diseño responsivo optimizado para móviles.

## Características

- 🎨 Diseño elegante con fondo blanco y detalles dorados
- 🖼️ Carrusel interactivo de imágenes con navegación táctil mejorada
- 🗺️ Mapa integrado con marcador animado elegante y coordenadas específicas
- 📱 Diseño altamente responsivo optimizado para móviles (experiencia principal)
- ✨ Animaciones de destellos de luz sutiles y efectos visuales elegantes
- 🎓 Información personalizable de la graduación
- 🌈 Logo ubicado estratégicamente en el footer derecho como solicitaste
- 📜 Una sola página con scroll fluido (más intuitivo para móviles)
- 📍 Mayor interactividad con efectos hover y animaciones de transición
- 🎪 Colores neutros/varoniles en lugar de colores vibrantes

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Crea la carpeta `images` en el directorio `public`:
```bash
mkdir public/images
```

3. Agrega tus imágenes:
- `logo.png` - Logo de la institución/evento
- `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` - Imágenes para el carrusel

## Uso

Para desarrollo:
```bash
npm run dev
```

Para producción:
```bash
npm run build
```

## Personalización

### Información de la graduación
Edita el archivo `src/components/Invitacion.js` para modificar:
- Fecha y hora
- Lugar
- Coordenadas del mapa
- Mensajes personalizados para los pequeños graduados

### Estilos
Modifica `src/styles/main.css` para personalizar:
- Colores y gradientes
- Tipografías
- Animaciones

### Imágenes
Reemplaza los archivos en `public/images/` con tus propias imágenes:
- Logo: `logo.png`
- Carrusel: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`

## Tecnologías utilizadas

- React 18
- Leaflet (para mapas)
- CSS3 con efectos modernos
- Webpack para bundling
- Babel para transpilación

## Estructura del proyecto

```
/
├── public/
│   ├── index.html
│   └── images/
│       ├── logo.png
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       └── 4.jpg
├── src/
│   ├── components/
│   │   ├── Invitacion.js
│   │   ├── Carrusel.js
│   │   ├── Mapa.js
│   │   ├── ModalConfirmacion.js
│   │   ├── ListaConfirmaciones.js
│   │   └── AdminConfirmaciones.js
│   ├── styles/
│   │   └── main.css
│   ├── google-sheets-config.js (opcional)
│   └── index.js
├── confirmaciones.txt (se crea automáticamente en localStorage)
├── package.json
├── webpack.config.js
└── .babelrc
```

## Características técnicas

- Una sola página con scroll fluido (más intuitivo para móviles)
- Carrusel táctil optimizado para dispositivos móviles con navegación intuitiva
- Mapa con marcador animado elegante y colores dorados
- Efectos de vidrio (glassmorphism) con colores elegantes y fondo blanco
- Animaciones de destellos de luz sutiles y efectos visuales sofisticados
- Diseño altamente responsivo optimizado para móviles (experiencia principal)
- Integración con Google Maps para direcciones con botón dedicado
- **Modal de confirmación de asistencia** con verificación de nombres
- **Sistema de archivos TXT** para registro de asistentes
- Logo estratégicamente ubicado en sección independiente
- Colores neutros/varoniles (azul grisáceo) en lugar de colores vibrantes
- Animaciones de aparición secuencial al hacer scroll hacia abajo
- Mayor interactividad con efectos hover y animaciones de transición
- Interfaz elegante pero amigable para niños y padres de familia

## 🚀 Sistema de Confirmación con Archivo TXT

La aplicación incluye un sistema de confirmación de asistencia que utiliza **archivos TXT locales** en lugar de servicios externos:

### Funcionalidades:

- ✅ **Verificación de nombres duplicados** antes de confirmar
- ✅ **Registro automático** con timestamp en localStorage
- ✅ **Archivo TXT descargable** con todas las confirmaciones
- ✅ **Modal elegante** con validación de formularios
- ✅ **Panel administrativo separado** - Accesible en ruta `/admin`
- ✅ **Gestión local** - No requiere servicios externos

### Cómo funciona:

1. **Almacenamiento local:** Los nombres se guardan en `localStorage` del navegador
2. **Verificación instantánea:** Comprueba duplicados antes de confirmar
3. **Exportación:** Descarga un archivo TXT con todas las confirmaciones
4. **Sin configuración:** Funciona inmediatamente sin APIs externas

### Rutas de la aplicación:

- **`/`** - Página principal de la invitación
- **`/admin`** - Panel administrativo para gestionar confirmaciones

### Archivos relacionados:

- `src/components/ModalConfirmacion.js` - Modal de confirmación
- `src/components/AdminConfirmaciones.js` - Panel administrativo completo
- `confirmaciones.txt` - Se crea automáticamente en localStorage

### Características del sistema:

- **📝 Registro inmediato** - Sin demoras de red
- **🔍 Verificación instantánea** - Comprueba nombres duplicados
- **📥 Exportación fácil** - Descarga lista en formato TXT
- **🗑️ Gestión completa** - Limpiar todas las confirmaciones
- **📱 Funciona offline** - No depende de internet
- **🔒 Almacenamiento local** - Datos permanecen en el dispositivo
- **👨‍💼 Panel administrativo** - Interfaz completa para gestionar datos

### Panel Administrativo:

El panel administrativo (`/admin`) incluye:

- **📊 Estadísticas** - Total de confirmaciones y última actualización
- **📋 Tabla completa** - Lista detallada con nombres y timestamps
- **🗑️ Gestión individual** - Eliminar confirmaciones específicas
- **📥 Exportación** - Descargar archivo TXT completo
- **🔄 Actualización** - Refrescar datos en tiempo real

## 🌐 Despliegue en Vercel

Para que las rutas funcionen correctamente en Vercel, se han incluido archivos de configuración:

### Configuración automática:

- ✅ **`vercel.json`** - Configuración de rewrites para SPA
- ✅ **`public/_redirects`** - Archivo de redirección alternativo
- ✅ **History API Fallback** - Configurado en webpack

### Si tienes problemas con la ruta `/admin`:

1. **Verifica que los archivos estén en la raíz:**
   ```
   tu-proyecto/
   ├── vercel.json
   └── public/
       └── _redirects
   ```

2. **Redeploy en Vercel:**
   - Ve al dashboard de Vercel
   - Haz clic en "Redeploy" en tu proyecto
   - Los archivos de configuración se aplicarán automáticamente

3. **URLs que funcionarán:**
   - `https://tu-app.vercel.app/` - Página principal
   - `https://tu-app.vercel.app/admin` - Panel administrativo

**Nota:** Este sistema utiliza localStorage del navegador. Para persistencia permanente, considera implementar un backend o servicio de almacenamiento en la nube.

## Personalización de coordenadas

Para cambiar la ubicación en el mapa, modifica las coordenadas en `src/components/Invitacion.js`:

```javascript
const graduacionData = {
    fecha: '25 de octubre',
    hora: '9:00 AM',
    lugar: 'Gardens, Chiquimulilla, Santa Rosa',
    coordenadas: [14.09800, -90.37334] // Nuevas coordenadas aquí
};
```

## Soporte

Para soporte técnico o personalización adicional, contacta al desarrollador.