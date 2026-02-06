import React, { useEffect, useMemo, useRef, useState } from "react";

// Tailwind-only version — inline classes everywhere (no normal CSS)

const STORAGE_DATA = [
    { id: 1, name: "Premium Cold Storage", type: "cold", capacity: 5000, temperature: "0-4°C", humidity: "85-95%", location: "Sector 15, Industrial Area", distance: 5.2, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200", crops: ["Fruits", "Vegetables", "Dairy"] },
    { id: 2, name: "Modern Grain Warehouse", type: "warehouse", capacity: 12000, temperature: "15-20°C", humidity: "50-60%", location: "Agricultural Complex, Zone A", distance: 8.7, image: "https://images.unsplash.com/photo-1601031297962-f8bdb72c5c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200", crops: ["Wheat", "Rice", "Barley"] },
    { id: 3, name: "Advanced Grain Silo", type: "silo", capacity: 8000, temperature: "18-22°C", humidity: "45-55%", location: "Farm District, Block C", distance: 3.1, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200", crops: ["Corn", "Wheat", "Soybeans"] },
    { id: 4, name: "Multi-Crop Storage Facility", type: "controlled", capacity: 15000, temperature: "Variable", humidity: "Variable", location: "Central Storage Hub", distance: 12.4, image: "https://images.unsplash.com/photo-1622551799386-18f9813f4b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200", crops: ["Mixed Crops", "Processed Goods"] },
    { id: 5, name: "Specialty Fruit Cold Room", type: "cold", capacity: 3000, temperature: "2-6°C", humidity: "90-95%", location: "Fruit Market Complex", distance: 7.8, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200", crops: ["Apples", "Oranges", "Berries"] },
    { id: 6, name: "High-Capacity Grain Bin", type: "grain-bin", capacity: 20000, temperature: "20-25°C", humidity: "40-50%", location: "Rural Storage Center", distance: 15.6, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200", crops: ["Corn", "Rice", "Wheat"] },
];

function Stat({ number, label }) {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-5 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-green-600 md:text-4xl">{number}</div>
            <div className="mt-1 text-sm font-semibold text-gray-600">{label}</div>
        </div>
    );
}

function StorageCard({ storage, onBook, onView }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl  bg-white shadow-xl ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative h-44 w-full overflow-hidden sm:h-56">
                <img
                    src={storage.image}
                    alt={storage.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.07]"
                />
                <div className="absolute right-3 top-3 rounded-full bg-green-600/90 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                    {storage.type.replace("-", " ").toUpperCase()}
                </div>
            </div>
            <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-green-900 sm:text-xl">{storage.name}</h3>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-900">
                    <span>📍 {storage.location}</span>
                    <span className="ml-auto inline-flex items-center rounded-full bg-rose-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                        {storage.distance} km
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-3">
                        <div className="text-xs font-semibold text-gray-500">Capacity</div>
                        <div className="text-sm font-bold text-green-900">{storage.capacity.toLocaleString()} kg</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-3">
                        <div className="text-xs font-semibold text-gray-500">Temperature</div>
                        <div className="text-sm font-bold text-green-900">{storage.temperature}</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-3">
                        <div className="text-xs font-semibold text-gray-500">Humidity</div>
                        <div className="text-sm font-bold text-green-900">{storage.humidity}</div>
                    </div>
                    <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-3">
                        <div className="text-xs font-semibold text-gray-500">Suitable For</div>
                        <div className="text-sm font-bold text-green-900">{storage.crops.join(", ")}</div>
                    </div>
                </div>

                {/* Responsive Buttons */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        onClick={() => onBook(storage.id)}
                        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-tr from-green-600 to-green-400 px-5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:from-green-700 hover:to-green-500 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                        Book Now
                    </button>
                    <button
                        onClick={() => onView(storage.id)}
                        className="inline-flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-5 text-base font-semibold text-green-900 shadow-sm transition-all duration-200 hover:border-green-300 hover:bg-green-50 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function FarmerStorage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [capacityFilter, setCapacityFilter] = useState("");
    const [loadingNearby, setLoadingNearby] = useState(false);
    const [data, setData] = useState(STORAGE_DATA);

    const storageRef = useRef(null);
    const analyticsRef = useRef(null);
    const locationsRef = useRef(null);
    const tipsRef = useRef(null);
    const contactRef = useRef(null);

    const filteredData = useMemo(() => {
        return STORAGE_DATA.filter((storage) => {
            const t = searchTerm.trim().toLowerCase();
            const matchesSearch =
                !t ||
                storage.name.toLowerCase().includes(t) ||
                storage.crops.some((c) => c.toLowerCase().includes(t)) ||
                storage.location.toLowerCase().includes(t);

            const matchesType = !typeFilter || storage.type === typeFilter;

            let matchesCapacity = true;
            if (capacityFilter === "small") matchesCapacity = storage.capacity <= 2000;
            else if (capacityFilter === "medium") matchesCapacity = storage.capacity > 2000 && storage.capacity <= 8000;
            else if (capacityFilter === "large") matchesCapacity = storage.capacity > 8000;

            return matchesSearch && matchesType && matchesCapacity;
        });
    }, [searchTerm, typeFilter, capacityFilter]);

    useEffect(() => setData(filteredData), [filteredData]);

    const stats = useMemo(() => {
        const totalFacilities = data.length;
        const totalCapacity = data.reduce((sum, s) => sum + s.capacity, 0);
        const nearbyCount = data.filter((s) => s.distance <= 10).length;
        const avgDistance = totalFacilities ? data.reduce((sum, s) => sum + s.distance, 0) / totalFacilities : 0;
        return {
            totalFacilities,
            totalCapacityDisplay: `${Math.round(totalCapacity / 1000)}K`,
            nearbyCount,
            avgDistanceDisplay: avgDistance.toFixed(1),
        };
    }, [data]);

    function findNearbyStorage() {
        setLoadingNearby(true);
        setTimeout(() => {
            const nearby = STORAGE_DATA.filter((s) => s.distance <= 10).sort((a, b) => a.distance - b.distance);
            setData(nearby);
            setLoadingNearby(false);
            storageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 900);
    }

    function bookStorage(id) {
        const s = STORAGE_DATA.find((x) => x.id === id);
        if (!s) return;
        alert(`Booking initiated for ${s.name}!\n\nYou will be redirected to the booking form.`);
    }
    function viewDetails(id) {
        const s = STORAGE_DATA.find((x) => x.id === id);
        if (!s) return;
        alert(
            `Detailed information for ${s.name}:\n\nLocation: ${s.location}\nDistance: ${s.distance} km\nSuitable for: ${s.crops.join(
                ", "
            )}\n\nContact facility for more information.`
        );
    }

    const NavLink = ({ label, targetRef }) => (
        <button
            onClick={() => targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="rounded-full px-4 py-2 text-sm font-semibold text-green-900 transition-all duration-200 hover:bg-gradient-to-tr hover:from-green-600 hover:to-green-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br mt-20 from-slate-50 to-blue-100 text-slate-800">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full bg-gradient-to-tr from-[#2c5530] via-green-600 to-green-300 py-6 text-white shadow-xl">
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-2xl font-extrabold drop-shadow-md md:text-4xl">Farmer Storage Solutions</h1>
                    <p className="mt-1 text-sm opacity-90 md:text-base">Smart Storage Management for Modern Agriculture</p>
                </div>
            </header>

            {/* Nav */}
            <nav className="sticky top-[72px] z-30 w-full backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-md">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-3 py-3 sm:gap-4">
                    <NavLink label="Storage Facilities" targetRef={storageRef} />
                    <NavLink label="Analytics" targetRef={analyticsRef} />
                    <NavLink label="Nearby Locations" targetRef={locationsRef} />
                    <NavLink label="Storage Tips" targetRef={tipsRef} />
                    <NavLink label="Contact" targetRef={contactRef} />
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-3 py-6 sm:px-5 md:py-10">
                {/* Search / Filters */}
                <section ref={storageRef} className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:p-8">
                    <h2 className="text-center text-xl font-extrabold text-green-900 sm:text-2xl">Find Perfect Storage Solutions</h2>
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                        <input
                            type="text"
                            placeholder="Search crops, storage types..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 w-full rounded-xl border-2 border-gray-200 px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500"
                        />
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="h-12 w-full rounded-xl border-2 border-gray-200 px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">All Storage Types</option>
                            <option value="cold">Cold Storage</option>
                            <option value="warehouse">Warehouse</option>
                            <option value="silo">Silo</option>
                            <option value="grain-bin">Grain Bin</option>
                            <option value="controlled">Controlled Atmosphere</option>
                        </select>
                        <select
                            value={capacityFilter}
                            onChange={(e) => setCapacityFilter(e.target.value)}
                            className="h-12 w-full rounded-xl border-2 border-gray-200 px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">All Capacities</option>
                            <option value="small">Small (0-2000 kg)</option>
                            <option value="medium">Medium (2000-8000 kg)</option>
                            <option value="large">Large (8000+ kg)</option>
                        </select>
                        <button
                            onClick={findNearbyStorage}
                            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-rose-400 px-4 text-sm font-bold text-white shadow-md transition-all duration-200 hover:from-rose-600 hover:to-rose-500 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                        >
                            <span className="mr-1.5">📍</span> Find Nearby
                        </button>
                    </div>
                </section>

                {/* Loading */}
                {loadingNearby && (
                    <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow">
                        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />
                        <p className="text-sm">Finding nearby storage facilities...</p>
                    </div>
                )}

                {/* Grid */}
                {!loadingNearby && (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {data.map((s) => (
                            <StorageCard key={s.id} storage={s} onBook={bookStorage} onView={viewDetails} />
                        ))}
                        {data.length === 0 && (
                            <div className="col-span-full rounded-2xl bg-white p-6 text-center text-sm text-gray-600 shadow">
                                No results found. Try adjusting filters.
                            </div>
                        )}
                    </div>
                )}

                {/* Stats */}
                <section className="mt-8 rounded-2xl bg-white p-5 shadow-xl sm:p-6 md:p-8">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Stat number={stats.totalFacilities} label="Storage Facilities" />
                        <Stat number={stats.totalCapacityDisplay} label="Total Capacity (kg)" />
                        <Stat number={stats.nearbyCount} label="Nearby Locations" />
                        <Stat number={stats.avgDistanceDisplay} label="Avg Distance (km)" />
                    </div>
                </section>

                {/* Placeholder sections */}
                <section ref={analyticsRef} className="mt-8 rounded-2xl bg-white p-6 shadow">
                    <h2 className="text-center text-xl font-extrabold text-green-900">Analytics</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        (Coming soon) Visualize crop-specific storage demand, utilization, and seasonal trends.
                    </p>
                </section>
                <section ref={locationsRef} className="mt-6 rounded-2xl bg-white p-6 shadow">
                    <h2 className="text-center text-xl font-extrabold text-green-900">Nearby Locations</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Use the "Find Nearby" button above to filter by distance.</p>
                </section>
                <section ref={tipsRef} className="mt-6 rounded-2xl bg-white p-6 shadow">
                    <h2 className="text-center text-xl font-extrabold text-green-900">Storage Tips</h2>
                    <ul className="mx-auto mt-2 max-w-3xl list-disc space-y-1 pl-6 text-sm text-gray-700">
                        <li>Pre-cool perishable produce before loading into cold storage.</li>
                        <li>Maintain recommended temperature & humidity for each crop type.</li>
                        <li>Use pallets to improve airflow and reduce moisture contact.</li>
                        <li>Schedule periodic fumigation/inspection to prevent pests.</li>
                        <li>Keep detailed inventory logs for faster retrieval and billing.</li>
                    </ul>
                </section>
                <section ref={contactRef} className="mt-6 rounded-2xl bg-white p-6 shadow">
                    <h2 className="text-center text-xl font-extrabold text-green-900">Contact</h2>
                    <p className="mt-2 text-center text-sm text-gray-700">
                        For partnerships and facility onboarding, email <strong>support@farmerstorage.example</strong>
                    </p>
                </section>
            </main>


        </div>
    );
}
