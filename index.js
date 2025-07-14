
// importamos los módulos necesarios para la aplicación
import './app/views/api.js';
import './app/views/auth.js';
import { router } from './app/views/router.js';

// Inicializamos el router al cargar la página y al cambiar el hash en la URL
// Esto permite que la aplicación responda a los cambios en la URL y muestre las vistas correspondientes
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);