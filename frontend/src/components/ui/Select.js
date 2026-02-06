import React, { useState } from "react";

export function Select({ options = [], onChange, className = "" }) {
    const [value, setValue] = useState(options[0]?.value || "");

    const handleChange = (e) => {
        setValue(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <select
            value={value}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
        >
            {options.map((opt, idx) => (
                <SelectItem key={idx} value={opt.value}>
                    {opt.label}
                </SelectItem>
            ))}
        </select>
    );
}

export function SelectTrigger({ children, className = "" }) {
    return <div className={`cursor-pointer ${className}`}>{children}</div>;
}

export function SelectContent({ children, className = "" }) {
    return <div className={`${className}`}>{children}</div>;
}

export function SelectItem({ children, value }) {
    return <option value={value}>{children}</option>;
}

export function SelectValue({ children, className = "" }) {
    return <span className={`${className}`}>{children}</span>;
}
