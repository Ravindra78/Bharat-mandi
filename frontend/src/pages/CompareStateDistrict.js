import React, { useState } from "react";

const stateDistrictData = {
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    UttarPradesh: ["Lucknow", "Kanpur", "Agra"],
};

function CompareStateDistrict() {
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedDistrict("");
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto" }}>
            <h2>Compare State & District</h2>
            <div style={{ marginBottom: 20 }}>
                <label>
                    State:
                    <select
                        value={selectedState}
                        onChange={handleStateChange}
                        style={{ marginLeft: 10 }}
                    >
                        <option value="">Select State</option>
                        {Object.keys(stateDistrictData).map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label>
                    District:
                    <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!selectedState}
                        style={{ marginLeft: 10 }}
                    >
                        <option value="">Select District</option>
                        {selectedState &&
                            stateDistrictData[selectedState].map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                    </select>
                </label>
            </div>
            {selectedState && selectedDistrict && (
                <div>
                    <strong>
                        Selected: {selectedState} / {selectedDistrict}
                    </strong>
                </div>
            )}
        </div>
    );
}

export default CompareStateDistrict;
