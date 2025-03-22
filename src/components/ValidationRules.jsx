export const validateNombre = (nombre) => {
    const nombrePattern = /^[a-zA-Z ]+$/;
    if (!nombre) {
        return "El nombre es requerido.";
    }
    if (!nombrePattern.test(nombre)) {
        return "El nombre solo puede contener letras y espacios.";
    }
    return ""; 
};

export const validateCelular = (celular) => {
    const celularPattern = /^[0-9]{9}$/; 
    if (!celular) {
        return "El celular es requerido.";
    }
    if (!celularPattern.test(celular)) {
        return "El celular debe contener exactamente 9 dígitos numéricos.";
    }
    return ""; 
};


export const validateEmail = (email) => {
    if (!email) return "El email es requerido.";
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) return "El email no tiene un formato válido.";
    return "";
};


export const validateDireccion = (direccion) => {
    if (!direccion) return "La dirección es requerida.";
    if (direccion.length < 5) return "La dirección debe tener al menos 5 caracteres.";
    return "";
};