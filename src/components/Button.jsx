import React from "react";

function Button({ text, onClick, className = "", type = "default" }) {
    // Determina el color de fondo basado en el tipo
    const buttonClass = type === "confirm"
        ? "bg-green-500 hover:bg-green-700"
        : type === "cancel"
        ? "bg-red-500 hover:bg-red-700"
        : "bg-blue-500 hover:bg-blue-700";

    return (
        <button
            className={`text-white px-4 py-2 rounded-md transition ${buttonClass} ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;