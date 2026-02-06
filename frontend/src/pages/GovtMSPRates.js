import React, { useEffect, useMemo, useState } from "react";

export default function GovtMSPRates() {
    const [season, setSeason] = useState("Kharif 2025-26");
    const [commodity, setCommodity] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const mockMSP = useMemo(
        () => ({
            "Kharif 2025-26": [
                { commodity: "Paddy", variety: "Common", msp: 2300, unit: "₹/Quintal" },
                { commodity: "Maize", variety: "-", msp: 2250, unit: "₹/Quintal" },
                { commodity: "Arhar (Tur)", variety: "-", msp: 7500, unit: "₹/Quintal" },
            ],
            "Rabi 2025-26": [
                { commodity: "Wheat", variety: "-", msp: 2275, unit: "₹/Quintal" },
                { commodity: "Mustard", variety: "-", msp: 5650, unit: "₹/Quintal" },
                { commodity: "Gram", variety: "-", msp: 5400, unit: "₹/Quintal" },
            ],
        }),
        []
    );

    // Load and filter data based on season and commodity filter
    const load = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 300)); // simulate loading
        const list = mockMSP[season] || [];
        const filteredRows = list.filter((x) =>
            commodity.trim() === ""
                ? true
                : x.commodity.toLowerCase().includes(commodity.trim().toLowerCase())
        );
        setRows(filteredRows);
        setLoading(false);
    };

    // Reload data when season or commodity changes (optional, or can use button)
    useEffect(() => {
        load();
    }, [season]); // dependency on season to reload automatically on season change

    return (
        <div className="p-6  max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Govt. MSP Rates</h1>

            <div className="grid md:grid-cols-3  gap-3 bg-white rounded-2xl p-4 shadow">
                <div className="flex flex-col">
                    <label className="text-sm mb-1">Season</label>
                    <select
                        className="border rounded-xl px-3 py-2"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                    >
                        {Object.keys(mockMSP).map((seasonKey) => (
                            <option key={seasonKey} value={seasonKey}>
                                {seasonKey}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm mb-1">Search Commodity</label>
                    <input
                        className="border rounded-xl px-3 py-2"
                        placeholder="e.g., Wheat, Paddy, Mustard"
                        value={commodity}
                        onChange={(e) => setCommodity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") load();
                        }}
                    />
                </div>

                <button
                    onClick={load}
                    className="px-4 py-2 rounded-2xl bg-black text-white"
                    disabled={loading}
                    aria-busy={loading}
                >
                    {loading ? "Loading..." : "Apply"}
                </button>
            </div>

            <div className="mt-5 overflow-x-auto bg-white rounded-2xl shadow">
                <table className="min-w-full">
                    <thead className="text-left text-sm border-b">
                        <tr>
                            <th className="p-3">Commodity</th>
                            <th className="p-3">Variety</th>
                            <th className="p-3">MSP</th>
                            <th className="p-3">Unit</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {rows.length === 0 && !loading && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        )}
                        {rows.map((r, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                                <td className="p-3">{r.commodity}</td>
                                <td className="p-3">{r.variety}</td>
                                <td className="p-3">₹ {r.msp.toLocaleString("en-IN")}</td>
                                <td className="p-3">{r.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-gray-500 mt-2">
                *MSP list is mock for demo. Replace with API or official data in{" "}
                <code>load()</code>.
            </p>
        </div>
    );
}
