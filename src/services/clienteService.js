const API_URL = "http://localhost:8090/cliente";

export const obtenerClientes = async (page = 0, size = 5, nombre = '') => {
    try {
        const url = `${API_URL}/listar?page=${page}&size=${size}&nombre=${nombre}`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("Error en la petición");
        }
        return await respuesta.json(); // Aquí deberías recibir un objeto con información de la paginación
    } catch (error) {
        console.log(error);
        return { content: [], totalPages: 0 }; // Asegúrate de que siempre retorne un objeto con la propiedad content y totalPages
    }
};

export const eliminarCliente = async (id) => {
    try {
        const respuesta = await fetch(API_URL + "/eliminar/" + id, {
            method: "DELETE"
        });
        if (!respuesta.ok) {
            throw new Error("Error en la petición");
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const registrarCliente = async (cliente) => {
    try {
        const respuesta = await fetch(API_URL + "/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        });

        if (!respuesta.ok) {
            throw new Error("Error al registrar cliente");
        }

        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const actualizarCliente = async (id, cliente) => {
    try {
        const respuesta = await fetch(`${API_URL}/actualizar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        });

        if (!respuesta.ok) {
            throw new Error("Error en la actualización del cliente");
        }

        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


