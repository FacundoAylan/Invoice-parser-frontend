# 🧩 Bevinco Image Uploader

Un proyecto moderno y visualmente coherente con la identidad Bevinco.  
Permite subir, visualizar y gestionar imágenes con controles interactivos de zoom, rotación y eliminación, todo diseñado con **React + Tailwind CSS**.

---

## 🚀 Características

- **Subida de imágenes** mediante drag & drop o selección manual.  
- **Vista previa dinámica** con galería vertical.  
- **Controles interactivos**:
  - Zoom in / Zoom out  
  - Rotar izquierda / derecha  
  - Restaurar vista  
  - Eliminar imagen  
- **Diseño responsive** y coherente con la paleta Bevinco:
  - Azul oscuro `#0A2540`
  - Verde lima `#7ED957`
  - Hover verde suave `#6CC84A`

---

## 🧠 Tecnologías

| Tecnología | Uso principal |
|-------------|----------------|
| **React** | Componentes y lógica interactiva |
| **TypeScript** | Tipado seguro y mantenible |
| **Tailwind CSS** | Estilos rápidos y consistentes |
| **react-zoom-pan-pinch**  | Libreria para el manejo de images |
---

## 📂 Estructura del proyecto

```text
src/
├── components/
│   ├── Modal.tsx
│   ├── ImageUploader.tsx
│   └── ModalControls.tsx
├── public/
│   └── image/
│       └── logo2.webp
└── App.tsx
```

## 🚀 Instalación y Configuración

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   pnpm dev 
   ```
