import React, { useState, useEffect } from "react";
import { registrarCliente, actualizarCliente } from "../services/clienteService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { validateNombre, validateCelular, validateEmail, validateDireccion } from "../components/ValidationRules";
import Button from "../components/Button";

function RegistrarCliente() {
    const [cliente, setCliente] = useState({
        nombre: "",
        email: "",
        celular: "",
        direccion: "",
    });

    const [errors, setErrors] = useState({
        nombre: "",
        celular: "",
        email: "",
        direccion: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.cliente) {
            setCliente(location.state.cliente);
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCliente({
            ...cliente,
            [name]: value,
        });

        let error = "";
        switch (name) {
            case "nombre":
                error = validateNombre(value);
                break;
            case "celular":
                error = validateCelular(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "direccion":
                error = validateDireccion(value);
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación global antes de enviar
        const nombreError = validateNombre(cliente.nombre);
        const celularError = validateCelular(cliente.celular);
        const emailError = validateEmail(cliente.email);
        const direccionError = validateDireccion(cliente.direccion);

        setErrors({
            nombre: nombreError,
            celular: celularError,
            email: emailError,
            direccion: direccionError,
        });

        // Si hay algún error, no enviamos el formulario
        if (nombreError || celularError || emailError || direccionError) {
            return;
        }

        if (id) {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Vas a actualizar la información del cliente",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, actualizar",
                cancelButtonText: "Cancelar",
            });

            if (!confirmacion.isConfirmed) {
                return;
            }

            const resultado = await actualizarCliente(id, cliente);
            if (resultado) {
                Swal.fire({
                    title: "¡Actualización exitosa!",
                    text: "El cliente se actualizó correctamente",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/");
                });
            } else {
                Swal.fire("Error", "Hubo un problema al actualizar el cliente", "error");
            }
        } else {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Vas a registrar un nuevo cliente",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, registrar",
                cancelButtonText: "Cancelar",
            });

            if (!confirmacion.isConfirmed) {
                return;
            }

            const resultado = await registrarCliente(cliente);
            if (resultado) {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: "El cliente se registró correctamente",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/");
                });
            } else {
                Swal.fire("Error", "Hubo un problema al registrar el cliente", "error");
            }
        }
    };

    // Función para navegar al inicio sin confirmar la actualización
    const handleGoHome = () => {
        // Si estás en modo de actualización, evita que se confirme la actualización
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Si regresas, se perderán los cambios no guardados.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, regresar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/");
            }
        });
    };

    return (
        <div className="flex justify-center p-8">
            <div className="w-96 bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {id ? "Actualizar Cliente" : "Registrar Cliente"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={cliente.nombre}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="celular"
                            placeholder="Celular"
                            value={cliente.celular}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.celular ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.celular && <p className="text-red-500 text-sm">{errors.celular}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={cliente.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección"
                            value={cliente.direccion}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.direccion ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion}</p>}
                    </div>

                    <div className="flex justify-between gap-4">
                        <Button
                            text="Regresar al Inicio"
                            onClick={handleGoHome}
                            className="w-1/2" // Asignamos 30% del ancho
                            type="cancel" // Tipo cancel para el botón de regresar
                        />
                        <Button
                            text="Confirmar"
                            onClick={handleSubmit}
                            className="w-1/2" // Asignamos 70% del ancho
                            type="confirm" // Tipo confirm para el botón de confirmar
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrarCliente;
