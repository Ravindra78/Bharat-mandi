// src/pages/Irrigation.js
import React from "react";

const Irrigation = () => {
    return (
        <div className="p-10 bg-teal-50 min-h-screen">
            <h1 className="text-4xl font-bold text-teal-600">💧 Irrigation Support</h1>
            <p className="mt-4 text-gray-700 text-lg">
                Modern irrigation techniques for efficient water usage.
                Get drip irrigation and sprinkler support.
            </p>
            <button className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                Request Irrigation Support
            </button>
        </div>
    );
};

export default Irrigation;
