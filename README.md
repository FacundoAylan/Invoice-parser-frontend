# 🧩 Sculpture Invoice Parser

**Sculpture Invoice Parser** es una aplicación moderna con una interfaz intuitiva y alineada con la identidad visual de Sculpture. Permite cargar imágenes de facturas, visualizarlas con herramientas interactivas de **zoom**, **rotación** y **eliminación**, extraer automáticamente su información mediante **OCR e Inteligencia Artificial**, editar los datos obtenidos y exportarlos a un archivo **Excel (.xlsx)**. Todo el proyecto fue desarrollado utilizando **React**, **TypeScript**, **Tailwind CSS** y **Zustand**, priorizando una experiencia de usuario fluida y una arquitectura escalable.

---

## 🚀 Características

- **Subida de imágenes** mediante *drag & drop* o selección manual.
- **Vista previa dinámica** con una galería vertical de las facturas cargadas.
- **Controles interactivos para las imágenes**:
  - Zoom in / Zoom out.
  - Rotación hacia la izquierda y derecha.
  - Restaurar la vista original.
  - Eliminación de imágenes.
- **Extracción automática de datos** de las facturas mediante OCR e Inteligencia Artificial.
- **Edición de la información extraída** antes de su exportación.
- **Exportación de los datos** en formato **Excel (.xlsx)**.

- **Diseño responsive** y coherente con la paleta Bevinco:
  - Azul oscuro `#0A2540`
  - Verde lima `#7ED957`
  - Hover verde suave `#6CC84A`

---

## 🧠 Tecnologías

| Tecnología | Descripción |
|------------|-------------|
| **React** | Construcción de la interfaz de usuario mediante componentes reutilizables. |
| **TypeScript** | Tipado estático para un código más seguro, escalable y mantenible. |
| **Tailwind CSS** | Framework CSS basado en utilidades para crear interfaces modernas y responsivas. |
| **Zustand** | Biblioteca ligera para la gestión del estado global de la aplicación. |
| **react-zoom-pan-pinch** | Biblioteca para visualizar imágenes con funciones de zoom, desplazamiento y gestos interactivos. |
| **ExcelJS** | Biblioteca para generar y exportar la información procesada en archivos de Excel (.xlsx). |
| **Sonner** | Biblioteca para mostrar notificaciones (*toast*) modernas y personalizables. |

## 📂 Estructura del proyecto

```text
src/
├── components/                 # Componentes reutilizables de la aplicación
│   ├── Modal.tsx
│   ├── ImageUploader.tsx
│   └── ModalControls.tsx
├── hooks/                      # Hooks personalizados
│   └── useFetch.ts
├── store/                      # Estado global con Zustand
│   └── storeZustand.ts
├── types/                      # Definiciones de tipos e interfaces
│   └── type.ts
├── pages/                      # Páginas principales
│   ├── ImageUploader/
│   └── Invoice/
├── public/
│   └── images/
│       └── logo2.webp
└── App.tsx                     # Punto de entrada de la aplicación
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
