// src/pages/GrainMarket.js
import React from "react";

const GrainMarket = () => {
    return (
        <section className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-8">
                    🌾 Grain Marketplace
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[
                        { name: "RICE", img: "https://www.nextechagrisolutions.com/blog/wp-content/uploads/2014/11/Rice-Parts.jpg" },
                        { name: "WHEAT", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUNmrMOaoc9IIumIOpCqhguS0Xk5U0TVI1g&s" },
                        { name: "JOWAR", img: "https://www.poshtik.in/cdn/shop/products/com1807851487263barley_Poshtik_c1712f8e-6b63-4231-9596-a49ce84f26ba.png?v=1626004318" },
                        { name: "CORN", img: "https://plantix.net/en/library/assets/custom/crop-images/maize.jpeg" },
                        { name: "SOYABEAN", img: "https://www.digicomply.com/hubfs/Soybeans%20trends%20digicomply.png" },
                        { name: "RAGI", img: "https://www.agrifarming.in/wp-content/uploads/Guide-to-Finger-Millet-Cultivation-2.jpg" },
                        { name: "BEANS", img: "https://goldenhillsfarm.in/media/product_images/french-beans-dolly-1.jpg" },
                        { name: "PEAS", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYg8BZlfC8JS-xLNlhDA1BzpXiAwzMkXgVIA&s" },
                        { name: "LENTIL", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSwR6o8EJHjMB1vXHjv27IN1WiTXVwRsWmxA&s" },
                        { name: "BAJRA", img: "./assets/bajra.webp" },
                    ].map((g, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col items-center"
                        >
                            {/* Title */}
                            <div className="w-full text-center font-semibold text-slate-800 mb-3">
                                {g.name}
                            </div>

                            {/* Image */}
                            <div className="w-full h-44 rounded-lg overflow-hidden mb-4">
                                <img src={g.img} alt={g.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow-sm hover:bg-orange-300">
                                    See More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GrainMarket;
