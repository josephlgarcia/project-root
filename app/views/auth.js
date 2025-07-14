
// importamos el módulo api para interactuar con la API del backend
import { api } from "./api";

export const auth = { // objeto auth que contendrá las funciones de autenticación
    login: async (email, password) => { // función para iniciar sesión
        const users = await api.getData(`/users?email=${email}`);
        if (users.length === 0 || users[0].password !== password) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
    },

    register: async (name, email, password) => { // función para registrar un nuevo usuario
        const existingUsers = await api.getData(`/users?email=${email}`);
        if (existingUsers.length > 0) { // en caso de que el email ya esté registrado, interrumpimos el registro y enviamos un error
            throw new Error('El email ya está registrado');
        }
        const newUser = {name, email, password: password, role: "visitante"};
        await api.postData('/users', newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    },

    logout:  () => { // función para cerrar sesión
        localStorage.removeItem('user');
    },

    isAuthenticated: () => { // función para verificar si el usuario está autenticado
        return !!localStorage.getItem('user');
    },

    getUser: () => { // función para obtener los datos del usuario autenticado
        // Obtenemos el usuario del localStorage y lo parseamos a un objeto JSON
        // Si no hay usuario, devolvemos null
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

};