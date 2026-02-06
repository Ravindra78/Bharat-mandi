import { useState } from "react";

export default function LiveMarketPrices() {
    const [activeTab, setActiveTab] = useState("wheat");

    const crops = [
        { id: "wheat", label: "गेहूं" },
        { id: "rice", label: "धान" },
        { id: "cotton", label: "कपास" },
        { id: "sugarcane", label: "गन्ना" },
    ];

    const priceCards = [
        {
            id: 1,
            crop: "wheat",
            name: "गेहूं (Punjab)",
            img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=60&h=60&fit=crop&crop=center",
            update: "अपडेट: 2 मिनट पहले",
            price: "₹2,150",
            unit: "/क्विंटल",
            change: "+₹50 (+2.5%)",
            trend: "📈",
            positive: true,
            highlight: true,
        },
        {
            id: 2,
            crop: "rice",
            name: "बासमती चावल",
            img: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=60&h=60&fit=crop&crop=center",
            update: "अपडेट: 5 मिनट पहले",
            price: "₹4,200",
            unit: "/क्विंटल",
            change: "+₹80 (+1.9%)",
            trend: "📈",
            positive: true,
        },
        {
            id: 3,
            crop: "cotton",
            name: "कपास (Gujarat)",
            img: "https://images.unsplash.com/photo-1463426646811-4a76c05f2859?w=60&h=60&fit=crop&crop=center",
            update: "अपडेट: 1 मिनट पहले",
            price: "₹6,450",
            unit: "/क्विंटल",
            change: "-₹25 (-0.4%)",
            trend: "📉",
            positive: false,
        },
    ];

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-gray-100 to-gray-200" id="market">
            <div className="max-w-6xl mt-20 mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-green-700">आज के लाइव मंडी भाव</h2>
                    <p className="text-gray-600">सभी प्रमुख फसलों की रियल-टाइम कीमतें</p>
                </div>

                {/* Widget */}
                <div className="bg-white p-10 rounded-2xl shadow-md">
                    {/* Tabs */}
                    <div className="flex gap-4 border-b-2 border-gray-300 mb-8">
                        {crops.map((crop) => (
                            <button
                                key={crop.id}
                                onClick={() => setActiveTab(crop.id)}
                                className={`pb-3 px-4 font-medium transition border-b-4 ${activeTab === crop.id
                                    ? "text-green-600 border-green-500"
                                    : "text-gray-600 border-transparent hover:text-green-500"
                                    }`}
                            >
                                {crop.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {priceCards
                            .filter((card) => card.crop === activeTab)
                            .map((card) => (
                                <div
                                    key={card.id}
                                    className={`p-6 rounded-xl border transition hover:-translate-y-1 hover:shadow-md ${card.highlight
                                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-400"
                                        : "bg-gray-50 border-gray-300"
                                        }`}
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={card.img}
                                            alt={card.name}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h4 className="text-green-600 font-semibold text-lg">{card.name}</h4>
                                            <small className="text-gray-500">{card.update}</small>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-3">
                                        <span className="text-3xl font-bold text-green-700">{card.price}</span>
                                        <span className="ml-2 text-gray-500">{card.unit}</span>
                                    </div>

                                    {/* Change */}
                                    <div
                                        className={`flex justify-between items-center px-3 py-2 rounded-md font-semibold ${card.positive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        <span>{card.change}</span>
                                        <span>{card.trend}</span>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a
                            href="dashboard.html"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-700 transition"
                        >
                            सभी भाव देखें
                        </a>
                        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition">
                            प्राइस अलर्ट सेट करें
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}