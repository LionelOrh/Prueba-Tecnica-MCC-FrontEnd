import React, { useState, useEffect } from "react";
import { obtenerClientes, eliminarCliente } from "../services/clienteService";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function ClientesList() {
    const [clientes, setClientes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0); // Página actual
    const [nombre, setNombre] = useState(''); 
    const navigate = useNavigate();


    useEffect(() => {
        const cargarClientes = async () => {
            const data = await obtenerClientes(page, 5, nombre); // Pasa el filtro de nombre al backend
            setClientes(data.content); // Los clientes
            setTotalPages(data.totalPages); // Total de páginas
        };
        cargarClientes();
    }, [page, nombre]);

    const handleEliminar = async (id) => {
        const resultado = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (resultado.isConfirmed) {
            const eliminado = await eliminarCliente(id);
            if (eliminado) {
                Swal.fire("Cliente eliminado", "El cliente ha sido eliminado correctamente", "success");
                const data = await obtenerClientes();
                setClientes(data);
            }
            else {
                Swal.fire("Error", "El cliente no ha sido eliminado", "error");
            }
        }
    };
    const handleEditar = (cliente) => {
        navigate(`/registrar/${cliente.id}`, { state: { cliente } });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage); // Cambia la página al siguiente número
    };


    return (
        <div className="flex justify-center items-start h-screen pt-5">
            <div className="w-3/5 mx-auto p-4 bg-white shadow-lg rounded-lg"> {/* Fondo blanco para la tabla */}
                <h2 className="text-2xl font-bold text-center mb-4">Lista de Clientes</h2>
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} // Actualiza el estado de nombre
                        className="p-2 border border-gray-300 rounded w-1/2" // Ajusta el tamaño del input
                    />
                    <Button text="Agregar Cliente" onClick={() => navigate("/registrar")} className="ml-4" />
                </div>
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Celular</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Dirección</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map((cliente) => (
                                <tr key={cliente.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{cliente.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.celular}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cliente.direccion}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditar(cliente)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md">
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                                                onClick={() => handleEliminar(cliente.id)} >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-2">No hay clientes disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 0}
                        className="px-4 py-2 bg-sky-950 text-white rounded"
                    >
                        Anterior
                    </button>
                    <span>Página {page + 1} de {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page + 1 >= totalPages}
                        className="px-4 py-2 bg-sky-950 text-white rounded"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ClientesList;