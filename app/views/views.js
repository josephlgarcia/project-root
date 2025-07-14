
// importamos los módulos necesarios para renderizar las vistas
import { api } from './api.js';
import { auth } from './auth.js';
import { router } from './router.js';


// Función para renderizar una vista de error 404
export function renderNotFound(prevRoute) {
    document.getElementById('app').innerHTML = `
        <h2>Error 404. Página no encontrada</h2>
        <a href="${prevRoute || '#/login'}" data-link>Volver</a>`;
}
    

// Función para mostrar la vista de inicio de sesión
export async function showLogin() {
    document.getElementById('app').innerHTML = `
        <div class="login-container">
            <form id="form-login" class="login-form card">
                <h2 style="text-align:center; margin-bottom:1em;">Login</h2>
                <input type="email" id="email" placeholder="email" required>
                <input type="password" id="password" placeholder="password" required>
                <button type:"submit" >Entrar</button>
                <br>
                <a href="#/register" data-link>¿No tienes cuenta? Regístrate</a>
            </form>
        </div>`;
    document.getElementById('form-login').addEventListener('submit', async (e) => { // manejamos el evento de envío del formulario
        e.preventDefault();
        try {
            await auth.login(e.target.email.value, e.target.password.value);
            location.hash = '#/dashboard';
            router();
        } catch (error) {
            alert(error.message);
        }  
    });
};


// Función para mostrar la vista de registro
export async function showRegister() {
    document.getElementById('app').innerHTML = `
        <div class="login-container">
            <form id="form-register" class="register-form card">
                <h2 style="text-align:center; margin-bottom:1em;">Registro</h2>
                <input placeholder="nombre" id="name" required>
                <input placeholder="email" id="email" required>
                <input placeholder="contraseña" id="password" required>
                <button type="submit" >Registrar</button>
                <br>
                <a href="#/login" data-link>¿Ya tienes cuenta?</a>
            </form>
        </div>`;
    document.getElementById('form-register').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await auth.register(e.target.name.value, e.target.email.value, e.target.password.value);
            location.hash = '#/dashboard';
            router();
        } catch (error) {
            alert(error.message);
        }
    });
};


// Función para mostrar la vista del dashboard
export function showDashboard() {
    const user = auth.getUser();
    document.getElementById('app').innerHTML = `
        <h2>${user.role === 'admin' ? 'Panel de control: Bienvenido/a, admin' : `Bienvenido/a, ${user.name} (${user.role})`}</h2>
        <button id="out">Logout</button>
        <br>
        <a href="#/dashboard/events" data-link >Ver Eventos</a>
        ${user.role === 'admin' ? `<a href="#/dashboard/events/create" data-link>Crear evento</a>` : ''}`; // Añadimos un enlace para ver los eventos y, si el usuario es admin, para crear un evento
    document.getElementById('out').addEventListener('click', () => {
        auth.logout();
        location.hash = '#/login';
    });
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = e.target.getAttribute('href');
        });
    });
};


// Función para mostrar la vista de cursos
export async function showEvents() {
    const user = auth.getUser();
    const events = await api.getData('/events');

    document.getElementById('app').innerHTML = `
        <h2>Eventos disponibles</h2>
        <ul>${events.map(event => `
        <li>${event.title || 'Sin título'} (${event.capacity || 0} cupos) — organizador: ${event.organizador || 'N/A'}
        ${user.role === 'admin' ? `
        <button class="edit-btn" data-id="${event.id}" >Editar</button>
        <button class="delete-btn" data-id="${event.id}" >Eliminar</button>
        ` : ''}
        ${user.role === 'visitante' && event.enrolled.includes(user.email) ? `
        <button class="enroll-btn" disabled>Inscrito</button> 
        ` : user.role === 'visitante' ? `<button class="enroll-btn" data-id="${event.id}" >Inscribirse</button>`:''}
        </li>`).join('')}</ul>
        <br>
        <a href="#/dashboard">Volver</a>`;


    if (user.role === 'admin') { // Si el usuario es admin, aplicamos la lógica detrás de los botones para editar y eliminar cursos
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const eventId = btn.dataset.id;
                editCourse(eventId);
            });
        });
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const courseId = btn.dataset.id;
                deleteEvent(courseId);
            });
        });
    }

    if (user.role === 'visitante') { // Si el usuario es visitante, aplicamos la lógica al botón de inscribirse en los eventos
        document.querySelectorAll(".enroll-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const eventId = btn.dataset.id;
                const event = await api.getData(`/events/${eventId}`);

                if (!event.enrolled) event.enrolled = [];

                if (event.enrolled.includes(user.email)) {
                    alert('Ya estás inscrito en este evento');
                    return;
                }
                
                let capacity = event.capacity - 1;

                if (event.capacity === 0) {
                    alert('No hay cupo disponible para este evento.');
                    return;
                }

                event.enrolled.push(user.email);
                event.capacity = capacity;

                await api.putData(`/events/${eventId}`, event);
                alert('Inscripción exitosa');
                showEvents();
            });
        });
    }
}


// Función para mostrar la vista de creación de evento
export async function showCreateEvents() {
    const user = auth.getUser();
    if (user.role !== 'admin') {
        renderNotFound('#/dashboard');
        return;
    }
    document.getElementById('app').innerHTML = `
    <h2>Crear Evento</h2>
    <form id="form-create-event">
        <input placeholder="Título" id="title" required>
        <input placeholder="Organizador" id="organizador" required>
        <input type="number" placeholder="Capacidad" id="capacity" min="1" step="1" required>
        <button type="submit" >Guardar</button>
        </form>
        <br>
        <a href="#/dashboard" data-link>Volver</a>`;
    document.getElementById('form-create-event').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newEvent = {
            title: e.target.title.value,
            organizador: e.target.organizador.value,
            capacity: parseInt(e.target.capacity.value)
        }

        await api.postData('/events', newEvent);
        alert('Evento creado exitosamente');
        location.hash = '#/dashboard/events';
        router();
    });
}


// Función para mostrar la vista de edición de evento
export async function showEditEvents() {
    const user = auth.getUser();
    if (user.role !== 'admin') {
        renderNotFound('#/dashboard');
        return;
    }

    const eventId = location.hash.split('/').pop();
    const event = await api.getData(`/events/${eventId}`);
    if (!event) {
        renderNotFound('#/dashboard');
        return;
    }

    if (!event) {
        renderNotFound('#/dashboard');
        return;
    }

    document.getElementById('app').innerHTML = `
        <h2>Editar Evento</h2>
        <form id="form-edit-event">
            <input id="title" placeholder="Título" value="${event.title}" required>
            <input id="organizador" placeholder="organizador" value="${event.organizador}" required>
            <input type="number" step="1" min="1" id="capacity" placeholder="Capacidad" value="${event.capacity}" required>
            <button type="submit" >Guardar</button>
        </form>
        <br>
        <a href="#/dashboard/events" data-link>Volver</a>`;

    document.getElementById('form-edit-event').addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedEvent = {
            title: e.target.title.value,
            organizador: e.target.organizador.value,
            capacity: parseInt(e.target.capacity.value),
        };
        await api.patchData(`/events/${eventId}`, updatedEvent);
        alert('Evento actualizado exitosamente');
        location.hash = '#/dashboard/events';
        router();
    });
};


// Función para redirigir a la vista de edición de eventos
window.editCourse = (id) => { //esta función no es asicrónica debido a que no realiza ninguna petición
    location.hash = `#/dashboard/events/edit/${id}`;
    router();
}


// Función para eliminar un evento
window.deleteEvent = async (id) => {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar este evento?');
    if (!confirmar) return;

    try {
        await api.deleteData(`/events/${id}`);
        alert('Evento eliminado exitosamente');
        showEvents();
    } catch (error) {
        alert('Error al eliminar el evento');
        console.error(error);
    }
}