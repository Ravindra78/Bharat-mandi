import React, { useState, useRef } from "react";

export default function Tractor() {
    const bookingRef = useRef(null);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        location: "",
        state: "Uttar Pradesh",
        district: "Agra",
        mandi: "Agra Mandi",
        days: 1,
        addDriver: false,
        accessories: [],
    });
    const [submitted, setSubmitted] = useState(false);

    const CONTACT = {
        owner: "Ram Kishan Tractors",
        phone: "+91-98765-43210",
        location: "Near Old Grain Market, Agra, Uttar Pradesh",
        email: "ram@tractor-rentals.example",
    };

    const ATTACHMENTS = [
        { id: "rotavator", name: "Rotavator (Power Tiller)", pricePerDay: 500, img: "./assets/TractorService/Rotovater.webp" },
        { id: "cultivator", name: "Cultivator / Tiller", pricePerDay: 400, img: "./assets/TractorService/Cultivator.jpeg" },
        { id: "mbplough", name: "MB Plough (Mould Board Plough)", pricePerDay: 600, img: "./assets/TractorService/Mbplough.jpg" },
        { id: "disc", name: "Disc Harrow", pricePerDay: 450, img: "./assets/TractorService/DiscHarrow.jpg" },
        { id: "subsoiler", name: "Sub Soiler", pricePerDay: 550, img: "./assets/TractorService/SubSoiler.webp" },

        { id: "seeddrill", name: "Seed Drill", pricePerDay: 700, img: "./assets/TractorService/Seed-Dril.webp" },
        { id: "potatopl", name: "Potato Planter", pricePerDay: 800, img: "./assets/TractorService/Patato-Planter.avif" },
        { id: "transplanter", name: "Paddy Transplanter", pricePerDay: 1200, img: "./assets/TractorService/Paddy Transplanter.jpg" },

        { id: "boom", name: "Boom Sprayer (Mounted / Trailed)", pricePerDay: 600, img: "./assets/TractorService/BoomSprsyer.webp" },
        { id: "weeder", name: "Inter Row Rotary Weeder", pricePerDay: 500, img: "./assets/TractorService/Inter Row Rotary Weeder.jpeg" },

        { id: "reaper", name: "Reaper", pricePerDay: 1500, img: "./assets/TractorService/Reaper.jpg" },
        { id: "combine", name: "Combine Harvester (tractor mounted)", pricePerDay: 4500, img: "./assets/TractorService/Combine Harvester.jpg" },
        { id: "potatodigger", name: "Potato Digger", pricePerDay: 900, img: "./assets/TractorService/Patato-Digger.webp" },

        { id: "thresher", name: "Thresher (Multi-crop)", pricePerDay: 1200, img: "./assets/TractorService/Thresher.jpg" },
        { id: "baler", name: "Baler (Straw Baler)", pricePerDay: 2000, img: "./assets/TractorService/Baler.jpg" },
        { id: "loader", name: "Front End Loader", pricePerDay: 1000, img: "./assets/TractorService/Front End Loader.png" },

        { id: "trolley", name: "Trolley (Hydraulic / Non-hydraulic)", pricePerDay: 800, img: "./assets/TractorService/Trolley.jpg" },
        { id: "watertank", name: "Water Tanker", pricePerDay: 900, img: "./assets/TractorService/WaterTanker.jpeg" },
        { id: "spreader", name: "Seed & Fertilizer Spreader", pricePerDay: 650, img: "./assets/TractorService/Seed-Dril.webp" },

        { id: "dozer", name: "Dozer Blade (land leveling)", pricePerDay: 2500, img: "./assets/TractorService/DozerBlade.jpg" },
        { id: "backhoe", name: "Backhoe (JCB type digger)", pricePerDay: 3000, img: "./assets/TractorService/Jcb.jpg" },
        { id: "posthole", name: "Post Hole Digger", pricePerDay: 700, img: "./assets/TractorService/Post Hole Digger.jpg" },
        { id: "laser", name: "Laser Land Leveler", pricePerDay: 6000, img: "./assets/TractorService/Laser Land Levele.webp" },
        { id: "ptogen", name: "Tractor Fitted Generator (PTO)", pricePerDay: 1800, img: "./assets/TractorService/TractorGenerator.jpg" },
    ];

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        if (name === "addDriver") {
            setForm((f) => ({ ...f, addDriver: checked }));
            return;
        }

        // ensure numeric fields are numbers
        if (name === "days") {
            const days = Math.max(1, Number(value || 1));
            setForm((f) => ({ ...f, days }));
            return;
        }

        setForm((f) => ({ ...f, [name]: value }));
    }

    function toggleAccessory(id) {
        setForm((f) => {
            const exists = f.accessories.includes(id);
            return { ...f, accessories: exists ? f.accessories.filter((a) => a !== id) : [...f.accessories, id] };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (submitted) return;
        // Basic client-side validation example
        if (!form.name.trim() || !form.phone.trim() || !form.location.trim()) {
            alert("Please fill name, phone and location.");
            return;
        }
        setSubmitted(true);

        // demo: show summary and pretend to send to backend
        console.log("Booking payload:", form);

        // In real app: call API here (fetch/axios). After response, show success or error.
        // Here we'll reset 'submitted' after a short delay and optional form reset
        setTimeout(() => {
            setSubmitted(false);
            // optional: clear form after submit (comment out if you don't want this)
            // setForm({ name: "", phone: "", location: "", state: "Uttar Pradesh", district: "Agra", mandi: "Agra Mandi", days: 1, addDriver: false, accessories: [] });
        }, 3500);
    }

    function calcTotal() {
        const basePerDay = 3000;
        const accTotal = form.accessories.reduce((sum, id) => {
            const a = ATTACHMENTS.find((x) => x.id === id);
            return sum + (a ? a.pricePerDay : 0);
        }, 0);
        const driverChargePerDay = form.addDriver ? 500 : 0; // example driver charge
        const days = Math.max(1, Number(form.days || 1));
        return (basePerDay + accTotal + driverChargePerDay) * days;
    }

    function scrollToBooking() {
        if (bookingRef.current) bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="min-h-screen mt-10 bg-slate-50 py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Hero */}
                <div className="bg-white rounded-2xl shadow p-6 md:p-8 mb-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">🚜 Tractor on Rent</h1>
                        <p className="mt-3 text-slate-600">Trusted tractor rental service with drivers, attachments and flexible rental durations. Enter your location below to see availability and book.</p>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <button onClick={scrollToBooking} className="inline-block px-5 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700">Book a Tractor</button>
                            <button onClick={() => document.getElementById("accessories")?.scrollIntoView({ behavior: "smooth" })} className="inline-block px-5 py-3 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50">View Accessories</button>
                        </div>

                        <div className="mt-4 text-sm text-slate-500">
                            <div><strong>Service area:</strong> Uttar Pradesh, Rajasthan, Haryana</div>
                            <div className="mt-1"><strong>Contact:</strong> {CONTACT.phone} • {CONTACT.email}</div>
                        </div>
                    </div>

                    {/* Contact Card on right */}
                    <div className="w-full md:w-80 bg-amber-50 rounded-xl p-4 shadow-inner">
                        <h4 className="font-semibold">Contact Provider</h4>
                        <div className="mt-3">
                            <div className="font-medium">{CONTACT.owner}</div>
                            <div className="text-sm text-slate-700">{CONTACT.location}</div>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <a href={`tel:${CONTACT.phone.replace(/\D/g, "")}`} className="px-4 py-2 bg-amber-600 text-white rounded-lg">Call: {CONTACT.phone}</a>
                        </div>

                        <div className="mt-4 text-xs text-slate-600">Available: Mon–Sat • 7:00 AM – 7:00 PM</div>
                    </div>
                </div>

                {/* Accessories (grid) */}
                <section id="accessories" className="bg-white rounded-2xl p-6 shadow mb-6">
                    <h3 className="text-xl font-semibold">Available Attachments & Services</h3>
                    <p className="mt-2 text-sm text-slate-600">Select attachments you want to rent along with the tractor. Prices shown are per day (example rates).</p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {ATTACHMENTS.map((a) => (
                            <div key={a.id} className="bg-slate-50 rounded-lg p-3 flex flex-col">
                                <img
                                    src={a.img}
                                    alt={a.name}
                                    className="w-full h-40 object-cover rounded-md"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = "/assets/placeholder-image.png";
                                    }}
                                />
                                <div className="mt-3 flex-1">
                                    <div className="font-medium">{a.name}</div>
                                    <div className="text-sm text-slate-600 mt-1">₹{a.pricePerDay} / day</div>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.accessories.includes(a.id)}
                                            onChange={() => toggleAccessory(a.id)}
                                            className="accent-amber-600"
                                            aria-label={`Add ${a.name}`}
                                        />
                                        <span className="text-sm">Add</span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Booking Form */}
                <section id="booking" ref={bookingRef} className="bg-white rounded-2xl p-6 shadow mb-6">
                    <h3 className="text-xl font-semibold">Book a Tractor</h3>
                    <p className="text-sm text-slate-600 mt-1">Fill details below and we will contact you to confirm availability & payment.</p>

                    <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4" noValidate>
                        <label className="sr-only" htmlFor="name">Your name</label>
                        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="p-3 border rounded" required />

                        <label className="sr-only" htmlFor="phone">Phone number</label>
                        <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className="p-3 border rounded" required pattern="[0-9+\-\s]+" />

                        <label className="sr-only" htmlFor="location">Village / Area</label>
                        <input id="location" name="location" value={form.location} onChange={handleChange} placeholder="Village / Area" className="p-3 border rounded" required />

                        <select name="state" value={form.state} onChange={handleChange} className="p-3 border rounded" aria-label="State">
                            <option>Uttar Pradesh</option>
                            <option>Rajasthan</option>
                            <option>Haryana</option>
                            <option>Madhya Pradesh</option>
                        </select>

                        <select name="district" value={form.district} onChange={handleChange} className="p-3 border rounded" aria-label="District">
                            <option>Agra</option>
                            <option>Jaipur</option>
                            <option>Ludhiana</option>
                        </select>

                        <select name="mandi" value={form.mandi} onChange={handleChange} className="p-3 border rounded" aria-label="Mandi">
                            <option>Agra Mandi</option>
                            <option>Sanganer</option>
                            <option>Ludhiana Mandi</option>
                        </select>

                        <input name="days" id="days" value={form.days} onChange={handleChange} type="number" min="1" className="p-3 border rounded" aria-label="Number of days" />

                        <label className="inline-flex items-center gap-2 p-3 border rounded" aria-hidden={false}>
                            <input type="checkbox" name="addDriver" checked={form.addDriver} onChange={handleChange} className="accent-amber-600" />
                            <span className="text-sm">Add driver (extra charge)</span>
                        </label>

                        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                            <div>
                                <div className="text-sm text-slate-600">Selected accessories: <span className="font-medium">{form.accessories.length}</span></div>
                                <div className="text-sm text-slate-500">Estimated total (example): <span className="font-semibold">₹{calcTotal()}</span></div>
                                {form.addDriver && <div className="text-xs text-slate-500 mt-1">Driver charge included in estimate.</div>}
                            </div>

                            <button type="submit" disabled={submitted} className="px-6 py-3 bg-amber-600 text-white rounded disabled:opacity-60">
                                {submitted ? "Sending..." : "Request Booking"}
                            </button>

                            <div className="text-sm text-slate-600">You will receive a call within 24 hours to confirm and arrange payment.</div>
                        </div>
                    </form>

                    {submitted && <div className="mt-4 text-green-600">Booking request submitted — provider will contact you shortly.</div>}
                </section>

                {/* Location + Map placeholder */}
                <section className="bg-white rounded-2xl p-6 shadow mb-6">
                    <h3 className="text-xl font-semibold">Location</h3>
                    <p className="mt-2 text-sm text-slate-700">{CONTACT.location}</p>
                    <div className="mt-4 w-full h-64 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">Map placeholder (embed Google Maps here)</div>
                </section>

                {/* Terms & FAQ */}
                <section className="bg-white rounded-2xl p-6 shadow mb-12">
                    <h3 className="text-xl font-semibold">Terms & FAQ</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                        <li><strong>Deposit:</strong> Security deposit required depending on tractor size.</li>
                        <li><strong>Fuel:</strong> Fuel cost borne by renter unless specified.</li>
                        <li><strong>Cancellation:</strong> Cancel 24 hours in advance for full refund of deposit.</li>
                        <li><strong>Driver:</strong> Drivers provided on request at extra charge.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

