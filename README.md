

# 🧪 Event management

## 🧾 Description

Tis project is a single page aplicación (SPA) Dedicated to event management.
This project includes the implementation of key features such as **user authentication**, **protected route management**, and **session persistence**, using modern JavaScript, HTML5, and CSS technologies.
This web application is designed to allow for two roles (admin and visitante). The administrator can perform CRUD operations on events and has full control over existing events. The visitor role can only register for existing events and view the events they are currently registered for.

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

## 🚀 How to use?

1. Clone or download this repository to your local machine.
2. Open the project in an editor like Visual Studio Code.
3. Make sure you have Vite or a local server installed.
4. Run the project by opening index.html from a local server.
5. Interact with the form to add products and view changes in real time.

> ⚠️ To simulate a functional REST API, you can use `json-server`:
> ```bash
> npm install -g json-server
> json-server --watch db.json
> ```

> ⚠️ To run `Vite`, you can use:
> ```bash
> npm run dev
> ```

## 🎨 Design features

- Clear and structured interface with a form.
- HTML field validations (required, type, and minimum values).
- Simple visual style with logical separation between sections.
- Modular design and file-based logic separation.


## 🛠️ Technologies used

- **HTML5** – For the structure of the page.
- **CSS3** – Custom styles.
- **JavaScript (ES6)** – Logic for data and event handling.
- **JSON** – Simulated data storage.
- **json-server** – To simulate a RESTful backend.
- **Vite** - Local server to run the SPA.

## 📌 Adiccional notes

- The system can be easily extended with new validations or integrations with the real backend.
- Useful for event organizers who want to better manage their work.





