// src/pages/Harvester.js
import React from "react";

const Harvester = () => {
    return (
        <div className="p-10 bg-green-50 min-h-screen">
            <h1 className="text-4xl font-bold text-green-600">🌾 Harvester Service</h1>
            <p className="mt-4 text-gray-700 text-lg">
                Book harvester machines for your crops. Save time and reduce labor cost.
            </p>
            <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Book Harvester
            </button>
        </div>
    );
};

export default Harvester;
