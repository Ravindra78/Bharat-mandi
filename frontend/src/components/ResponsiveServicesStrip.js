// ResponsiveServicesStrip.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ResponsiveServicesStrip() {
    const items = [
        {
            label: "Sell/Buy",
            icon: "🤝",
            color: "bg-pink-500",
            sub: [
                { name: "Sell Crops", link: "/sell" },
                { name: "Buy Seeds", link: "/seeds" },
                { name: "Buy Equipment", link: "/equipment" },
                { name: "B2B Connections", link: "/mandi-prices" },
                { name: "Price Prediction", link: "/connect" },
                { name: "Transport Service Link", link: "/connect" },
            ],
        },
        {
            label: "Services",
            icon: "🧭",
            color: "bg-orange-400",
            sub: [
                { name: "Tractor / Equipment Rental", link: "/tractor" },
                { name: "Fertilizer / Pesticide Guidance", link: "/harvester" },
                { name: "Insurance Help", link: "/spraying" },
                { name: "Soil Testing Service", link: "/soil" },
                { name: "Expert Consultation", link: "/irrigation" },
                { name: " Storage", link: "/farmerstorage" },

            ],
        },
        {
            label: "Scheme",
            icon: "📜",
            color: "bg-yellow-400",
            sub: [
                { name: "Central Govt Schemes", link: "/pmkisan" },
                { name: "State Govt Schemes", link: "/insurance" },
                { name: "Application Process Guidance", link: "/subsidy" },
                { name: "Kisan Credit Card", link: "/kcc" },
                { name: "Loan Regarding ", link: "/loans" },
            ],
        },

        {
            label: "Mandi Prices",
            icon: "🌾",
            color: "bg-orange-400",
            sub: [
                { name: "Live Prices", link: "/livemarketprices" },
                { name: "Govt MSP Rates", link: "/govtmsprates" },
                { name: "Compare States / Districts", link: "/comparestatedistrict" },
            ],
        },
        {
            label: "Loan Help",
            icon: "💰",
            color: "bg-blue-400",
            sub: [
                { name: "Loan Eligibility Check (Kisan Credit Card, Agri loan, Tractor loan, Storage loan)", link: "/kcc-loan" },
                { name: "NABARD Schemes", link: "/nabard" },
                { name: "Cooperative Bank Loan", link: "/cooperative" },
                { name: "Loan Calculator", link: "/loan-calc" },
            ],
        },
    ];

    const [openIdx, setOpenIdx] = useState(null);

    const toggle = (i) => {
        setOpenIdx((prev) => (prev === i ? null : i));
    };

    return (
        <div className="absolute top-20  left-2 sm:left-6 right-2 z-30">
            <div className="overflow-x-auto  md:overflow-visible">
                <div className="flex md:grid md:grid-flow-col auto-cols-max gap-4 md:gap-6 items-start">
                    {items.map((item, i) => (
                        <div key={item.label} className="relative group">
                            {/* Button */}
                            <button
                                onClick={() => toggle(i)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") toggle(i);
                                }}
                                aria-expanded={openIdx === i}
                                className={`${item.color} flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-lg font-semibold shadow-md
                  hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600
                  hover:scale-105 hover:shadow-2xl transition-all duration-200
                  border border-white rounded-3xl px-3 sm:px-6 py-2 sm:py-3
                  min-w-[110px] sm:min-w-[160px] md:min-w-[180px] justify-center`}
                            >
                                {/* Icon visible only on md+ (tablet/laptop) */}
                                <span className="hidden md:inline text-lg sm:text-2xl">{item.icon}</span>

                                {/* Label always visible */}
                                <span>{item.label}</span>
                            </button>

                            {/* Dropdown */}
                            <div
                                className={`absolute left-0 mt-2 bg-white text-gray-800 rounded-2xl shadow-lg min-w-[220px] transform origin-top transition-all duration-200
                  ${openIdx === i ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}
                  md:group-hover:scale-100 md:group-hover:opacity-100`}
                            >
                                <ul className="flex flex-col">
                                    {item.sub.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                to={subItem.link}
                                                onClick={() => setOpenIdx(null)}
                                                className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition rounded-lg text-sm"
                                            >
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
