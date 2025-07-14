

// creamos el objeto api que contendrá las funciones para interactuar con la API del backend
export const api = {
    baseUrl: 'http://localhost:3000', // URL base de la API
    
    getData: async (param) => { // función para realizar peticiones GET a la API
        try {
            const response = await fetch(`${api.baseUrl}${param}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }catch (error) {
            console.error('Error en la petición get:', error);
            throw error;
        }
    },

    postData: async (param, data) => { // función para realizar peticiones POST a la API
        try {
            const response = await fetch(`${api.baseUrl}${param}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
            return await response.json();
        } catch (error) {
            console.error('Error en la petición post:', error);
            throw error;
        }
    },
    
    putData: async (param, data) => { // función para realizar peticiones PUT a la API
        try {
            const response = await fetch(`${api.baseUrl}${param}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Error al actualizar los datos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en la petición put:', error);
            throw error;
        }
    },



    patchData: async (param, data) => { // función para realizar peticiones PUT a la API
        try {
            const response = await fetch(`${api.baseUrl}${param}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Error al actualizar los datos: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en la petición patch:', error);
            throw error;
        }
    },



    deleteData: async (param) => { // función para realizar peticiones DELETE a la API
        try {
            const response = await fetch(`${api.baseUrl}${param}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error al eliminar los datos:', error);
            throw error;
        }
    }
    
};