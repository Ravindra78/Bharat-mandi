import React from "react";

export function Card({ children, className = "" }) {
    return (
        <div className={`bg-white shadow-md rounded-xl p-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }) {
    return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
    return <h3 className={`text-lg font-bold ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }) {
    return <p className={`text-gray-600 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }) {
    return <div className={`${className}`}>{children}</div>;
}
