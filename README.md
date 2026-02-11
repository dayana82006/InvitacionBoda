# 💒 Invitación de Boda Virtual - Helen & Juan David

Una elegante y romántica invitación de boda virtual desarrollada con HTML, CSS y JavaScript.

## ✨ Características

### 🎨 Diseño
- **Estilo**: Elegante y romántico
- **Colores**: Verde, blanco y dorado
- **Tipografía**: Manuscrita (Dancing Script) con serif elegante (Cormorant Garamond)
- **Elementos visuales**: Flores, fotografías, iniciales/monograma

### 🎯 Funcionalidades

1. **Contador Regresivo**: Muestra los días, horas, minutos y segundos restantes hasta la boda
2. **Lluvia de Sobres**: Animación de sobres cayendo continuamente en la sección hero
3. **Música de Fondo**: Botón flotante para activar/desactivar música
4. **Formulario RSVP**: Formulario completo de confirmación de asistencia con almacenamiento local
5. **Galería de Fotos**: Sección para mostrar fotografías de los novios
6. **Código QR**: Para compartir álbum de fotos del día de la boda
7. **Google Maps**: Enlace directo a la ubicación del evento
8. **Animaciones Suaves**: Efectos de fade-in y parallax al hacer scroll
9. **Diseño Responsivo**: Optimizado para todos los dispositivos

## 🚀 Cómo usar

### Instalación básica

1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador

### Personalización

#### 1. Agregar música de fondo
- Coloca un archivo de audio llamado `music.mp3` en la misma carpeta que `index.html`
- El botón de música aparecerá automáticamente

#### 2. Configurar el código QR
Edita el archivo `script.js` y busca la línea:
```javascript
const albumUrl = ''; // Agrega aquí tu enlace al álbum compartido
```
Reemplaza la cadena vacía con el enlace a tu álbum compartido (Google Photos, Dropbox, etc.)

#### 3. Agregar fotografías a la galería
En `script.js`, encuentra la función `initializeGallery()` y edita el array `imageUrls`:
```javascript
const imageUrls = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    // Agrega más imágenes aquí
];
```

#### 4. Personalizar información
- Edita directamente el archivo `index.html` para cambiar textos, fechas, lugares, etc.

#### 5. Configurar formulario RSVP
El formulario actualmente guarda las respuestas en `localStorage`. Para conectarlo a un backend:

En `script.js`, en la función de submit del formulario RSVP, descomenta y configura:
```javascript
fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

## 📁 Estructura de archivos

```
InvitacionBoda/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño
├── script.js           # Funcionalidades JavaScript
├── music.mp3           # Música de fondo (agregar manualmente)
├── images/             # Carpeta para fotografías (crear manualmente)
│   ├── photo1.jpg
│   └── ...
└── README.md           # Este archivo
```

## 🎨 Paleta de colores

- **Verde principal**: `#2d5016`
- **Verde claro**: `#4a7c2a`
- **Verde suave**: `#7fb069`
- **Blanco**: `#ffffff`
- **Crema**: `#faf8f3`
- **Dorado**: `#d4af37`
- **Dorado oscuro**: `#b8941f`

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles (iOS y Android)

## 🔧 Tecnologías utilizadas

- HTML5
- CSS3 (con animaciones y gradientes)
- JavaScript (ES6+)
- Google Fonts (Dancing Script, Cormorant Garamond)
- QRCode.js (CDN) para generación de códigos QR

## 📝 Información del evento

- **Novios**: Helen Tabares & Juan David Cifuentes
- **Fecha**: 12 de Septiembre de 2026
- **Hora**: 4:00 PM
- **Lugar**: Urapanes del bosque, Cajamarca-Tolima
- **Código de vestimenta**: Formal
- **Tipo de boda**: Simbólica

## 💡 Consejos adicionales

### Hosting
Puedes subir estos archivos a:
- GitHub Pages (gratis)
- Netlify (gratis)
- Vercel (gratis)
- Cualquier servidor web estático

### Optimización de imágenes
- Usa formatos WebP o JPEG optimizados
- Tamaño recomendado: 1200x1200px para la galería
- Comprime las imágenes antes de subirlas

### SEO
Si deseas mejorar el SEO, agrega meta tags en el `<head>` de `index.html`:
```html
<meta name="description" content="Invitación de boda de Helen & Juan David - 12 de Septiembre 2026">
<meta property="og:title" content="Invitación de Boda - Helen & Juan David">
<meta property="og:image" content="url-de-tu-imagen-preview.jpg">
```

## 🎉 ¡Listo!

Tu invitación de boda virtual está lista para compartir. Solo necesitas personalizarla con tus fotografías, música y enlaces, y estará perfecta para tu día especial.

---

*Desarrollado con ❤️ para Helen & Juan David*

