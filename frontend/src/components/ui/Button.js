import React from "react";

export function Button({ children, className = "", ...props }) {
    return (
        <button
            {...props}
            className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition bg-green-600 text-white hover:bg-green-700 ${className}`}
        >
            {children}
        </button>
    );
}
