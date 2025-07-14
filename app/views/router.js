
/* Importamos el objeto auth que contiene las funciones auxiliares para validar las credenciales */
/* Importamos las funciones de vista que se encargan de renderizar las diferentes secciones de la aplicación */
import { auth } from './auth.js';
import {
    showLogin,
    showRegister,
    showDashboard,
    showEvents,
    showCreateEvents,
    showEditEvents,
    renderNotFound
} from './views.js';


/* Definimos las rutas de la aplicación y las asociamos a las funciones de vista correspondientes */
const routes = {
    '#/login': showLogin,
    '#/register': showRegister,
    '#/dashboard': showDashboard,
    '#/dashboard/events': showEvents,
    '#/dashboard/events/create': showCreateEvents,
}


// Variable para almacenar la ruta anterior, útil para redirecciones o navegación
let previousRoute = null;

/* Función principal del router que maneja la navegación entre las diferentes vistas */
export function router() {
    const path = location.hash || '#/login';

    
    if ((path === '#/login' || path === '#/register') && auth.isAuthenticated()) {
        location.hash = '#/dashboard';
        return;
    }


    if (path.startsWith('#/dashboard') && !auth.isAuthenticated()) {
        location.hash = '#/login';
        return;
    }

    // Si la ruta es una de las definidas, actualizamos la ruta anterior
    if (routes[path] || path.startsWith('#/dashboard/events/edit')) {
        previousRoute = path;
    }

    
    if (path.startsWith('#/dashboard/events/edit')) {
        showEditEvents();
        return;
    }

    // Si la ruta es válida, renderizamos la vista correspondiente y en caso contrario, mostramos una vista de error 404
    const view = routes[path];
    if (view) {
        view();
    } else {
        renderNotFound(previousRoute);
    }
}

