import React, { useMemo, useState } from "react";

function MandiPricesSection() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");

  // Example options
  const options = useMemo(
    () => ({
      Rajasthan: {
        Jaipur: ["Jaipur (F&V)", "Sanganer Mandi"],
        Jodhpur: ["Jodhpur Mandi"],
      },
      Punjab: {
        Ludhiana: ["Ludhiana Mandi"],
        Amritsar: ["Amritsar Mandi"],
      },
    }),
    []
  );

  // Data from screenshot
  const mandiData = useMemo(
    () => [
      { commodity: "Potato", date: "19/09/2025", variety: "Other", market: "Jaipur (F&V)", min: "Rs 700 / Quintal", max: "Rs 1200 / Quintal", avg: "Rs 950 / Quintal" },
      { commodity: "Onion", date: "19/09/2025", variety: "Other", market: "Jaipur (F&V)", min: "Rs 600 / Quintal", max: "Rs 1300 / Quintal", avg: "Rs 950 / Quintal" },
      { commodity: "Tomato", date: "19/09/2025", variety: "Other", market: "Jaipur (F&V)", min: "Rs 1500 / Quintal", max: "Rs 3500 / Quintal", avg: "Rs 2500 / Quintal" },
      { commodity: "Green Chilli", date: "19/09/2025", variety: "Green Chilly", market: "Jaipur (F&V)", min: "Rs 1500 / Quintal", max: "Rs 2200 / Quintal", avg: "Rs 1850 / Quintal" },
      { commodity: "Garlic", date: "19/09/2025", variety: "Average", market: "Jaipur (F&V)", min: "Rs 2000 / Quintal", max: "Rs 6000 / Quintal", avg: "Rs 4000 / Quintal" },
      { commodity: "Cucumber (Kheera)", date: "19/09/2025", variety: "Cucumber", market: "Jaipur (F&V)", min: "Rs 3000 / Quintal", max: "Rs 4000 / Quintal", avg: "Rs 3500 / Quintal" },
      { commodity: "Lemon", date: "19/09/2025", variety: "Lemon", market: "Jaipur (F&V)", min: "Rs 2500 / Quintal", max: "Rs 3200 / Quintal", avg: "Rs 2850 / Quintal" },
      { commodity: "Cauliflower", date: "19/09/2025", variety: "African Sarson", market: "Jaipur (F&V)", min: "Rs 1500 / Quintal", max: "Rs 3000 / Quintal", avg: "Rs 2250 / Quintal" },
      { commodity: "Banana", date: "19/09/2025", variety: "Other", market: "Jaipur (F&V)", min: "Rs 1000 / Quintal", max: "Rs 2000 / Quintal", avg: "Rs 1500 / Quintal" },
      { commodity: "Coriander (Leaves)", date: "19/09/2025", variety: "Coriander", market: "Jaipur (F&V)", min: "Rs 3000 / Quintal", max: "Rs 5000 / Quintal", avg: "Rs 4000 / Quintal" },
    ],
    []
  );

  const stateList = Object.keys(options);
  const districtList = state ? Object.keys(options[state]) : [];
  const marketList = state && district ? options[state][district] : [];

  const filteredRows = mandiData.filter((r) => (market ? r.market === market : true));

  return (
    <section className="w-full flex justify-center mt-10">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-2xl shadow-xl px-8 py-8 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-orange-700 text-center mb-6 tracking-wide">
          🌾 Mandi Prices Today
        </h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
            <select
              value={state}
              onChange={(e) => { setState(e.target.value); setDistrict(""); setMarket(""); }}
              className="w-full p-3 border rounded-lg bg-white"
            >
              <option value="">Select State</option>
              {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">District</label>
            <select
              value={district}
              onChange={(e) => { setDistrict(e.target.value); setMarket(""); }}
              disabled={!state}
              className="w-full p-3 border rounded-lg bg-white disabled:opacity-60"
            >
              <option value="">Select District</option>
              {districtList.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Mandi / Market</label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              disabled={!district}
              className="w-full p-3 border rounded-lg bg-white disabled:opacity-60"
            >
              <option value="">Select Mandi</option>
              {marketList.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full table-auto">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3 text-left">Commodity</th>
                <th className="p-3 text-left">Arrival Date</th>
                <th className="p-3 text-left">Variety</th>
                <th className="p-3 text-left">Market</th>
                <th className="p-3 text-right">Min Price</th>
                <th className="p-3 text-right">Max Price</th>
                <th className="p-3 text-right">Avg Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-600">
                    No prices available for selected mandi.
                  </td>
                </tr>
              )}

              {filteredRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="p-3">{row.commodity}</td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{row.variety}</td>
                  <td className="p-3 text-blue-600 font-medium">{row.market}</td>
                  <td className="p-3 text-right">{row.min}</td>
                  <td className="p-3 text-right">{row.max}</td>
                  <td className="p-3 text-right">{row.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default MandiPricesSection;
