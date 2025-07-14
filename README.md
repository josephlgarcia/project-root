

# 🧪 Registro de eventos

## 🧾 Descripción

Este proyecto es una single page aplicación (SPA) dedicada a la gestión de eventos.
Este proyecto incluye la implementación de funcionalidades clave como la **autenticación de usuarios**, **gestión de rutas protegidas**, y **persistencia de sesión**, utilizando tecnologías modernas de JavaScript, HTML5, y CSS.

## 📁 Estructura del proyecto

```
/ (project-root)
│
├── index.html
├── README.md
├── index.js
├── db.json
├── package-lock.json
├── package.json
└── /app
    │
    ├── /styles
    │   └── style.css
    │
    └── /views
        ├── api.js
        ├── auth.js
        ├── router.js
        └── views.js

```

## 🚀 ¿Cómo usarlo?

1. Clona o descarga este repositorio en tu máquina local.
2. Abre el proyecto en un editor como Visual Studio Code.
3. Asegúrate de tener instalado **Vite** o algún servidor local.
4. Ejecuta el proyecto abriendo `index.html` desde un servidor local.
5. Interactúa con el formulario para añadir productos y visualizar los cambios en tiempo real.

> ⚠️ Para simular una API REST funcional, puedes usar `json-server`:
> ```bash
> npm install -g json-server
> json-server --watch db.json
> ```

> ⚠️ Para correr Vite, puedes usar:
> ```bash
> npm run dev
> ```

## 🎨 Características del diseño

- Interfaz clara y estructurada con formulario.
- Validaciones HTML en los campos (requerido, tipo y valores mínimos).
- Estilo visual simple con separación lógica entre secciones.
- Diseño modular y separación de lógica por archivos.


## 🛠️ Tecnologías utilizadas

- **HTML5** – Para la estructura de la página.
- **CSS3** – Estilos personalizados.
- **JavaScript (ES6)** – Lógica para manejo de datos y eventos.
- **JSON** – Almacenamiento simulado de los datos.
- **json-server** – Para simular un backend RESTful.
- **Vite** - Servidor local para correr la SPA.

## 📌 Notas adicionales

- El sistema puede ser extendido fácilmente con nuevas validaciones o integraciones con backend real.
- Útil para organizadores de eventos que desean gestionar de mejor manera su trabajo.





