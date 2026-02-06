import React, { useState } from 'react';

// SoilHealth_UI_Soil.js
// Single-file React component (Tailwind CSS assumed present in the project)
// Designed to be responsive for mobile (Android/iOS) and desktop (laptop)

export default function SoilPage() {
    // page states
    const [showSchemes, setShowSchemes] = useState(false);
    const [activeNutrient, setActiveNutrient] = useState('macro'); // 'macro' or 'micro'

    // appointment modal + form states (moved inside component)
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        preferredDate: '',
        crop: '',
        sampleId: '',
        notes: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);

    const schemes = [
        {
            id: 1,
            title: 'National Soil Health Programme (NSHP)',
            short: 'Soil testing and recommendations at farmer level',
            img: './assets/Nshp.jpg'
        },
        {
            id: 2,
            title: 'Soil Health Card Scheme (SHC)',
            short: 'Personalized soil cards for farmers',
            img: './assets/Shcs.jpg'
        },
        {
            id: 3,
            title: 'Soil Health Card Scheme 2025',
            short: 'All Type soil Testing',
            img: './assets/Scheme2025.jpg'
        }
    ];

    const successStories = [
        { id: 1, title: 'Farmer A — Yield +30%', text: 'Used balanced fertilizer after testing', img: './assets/Sf1.webp' },
        { id: 2, title: 'Farmer B — Water saved 25%', text: 'Adopted micronutrient plan', img: './assets/Sf2.jpg' }
    ];

    const announcements = [
        { id: 1, title: 'New SHC drive launched - Oct 2025', icon: '📢' },
        { id: 2, title: 'Free testing camps this month', icon: '🧪' }
    ];

    const trainingVideos = [
        { id: 1, title: 'How to collect a soil sample', url: '#' },
        { id: 2, title: 'Understanding soil health card', url: '#' },
        { id: 3, title: 'Macro & micro nutrients explained', url: '#' },
        { id: 4, title: 'Organic ways to correct pH', url: '#' }
    ];

    // Simple circular chart component for macro/micro demonstration
    function CircularNutrientChart({ labels = [], values = [] }) {
        // values are expected 0..100
        const total = values.reduce((a, b) => a + b, 0) || 1;
        const normalized = values.map(v => (v / total) * 100);

        return (
            <div className="flex flex-col md:flex-row items-center gap-4">
                <svg viewBox="0 0 36 36" className="w-full h-full max-w-[260px] max-h-[260px]">
                    {/* background ring */}
                    <circle cx="18" cy="18" r="15.9155" fill="none" strokeWidth="3" strokeOpacity="0.15" stroke="#1E293B" />
                    {/* stacked rings */}
                    {normalized.map((n, i) => {
                        const dash = `${n} ${100 - n}`;
                        const strokeWidth = 3;
                        const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];
                        return (
                            <circle
                                key={i}
                                cx="18"
                                cy="18"
                                r={15.9155 - i * 2.6}
                                fill="none"
                                stroke={colors[i % colors.length]}
                                strokeWidth={strokeWidth}
                                strokeDasharray={dash}
                                transform={`rotate(-90 18 18)`}
                                strokeLinecap="round"
                                style={{ transition: 'all 400ms ease' }}
                            />
                        );
                    })}
                </svg>

                <div className="text-sm">
                    {labels.map((l, i) => (
                        <div key={i} className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full" style={{ background: ['#2563EB', '#10B981', '#F59E0B', '#EF4444'][i % 4] }} />
                            <span className="font-medium">{l}</span>
                            <span className="text-xs text-slate-500 ml-2">{values[i]}%</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // form submit handler
    async function handleAppointmentSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setSubmitResult(null);

        // basic validation
        if (!appointmentForm.name || !appointmentForm.phone || !appointmentForm.address) {
            setSubmitResult({ success: false, message: 'Name, phone and address are required.' });
            setSubmitting(false);
            return;
        }

        try {
            // POST to backend route (update host/port if your API is on different origin)
            const res = await fetch('/api/soil-appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentForm)
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Server returned ${res.status}`);
            }

            const data = await res.json();
            setSubmitResult({ success: true, message: data.message || 'Appointment booked successfully.' });
            // reset form
            setAppointmentForm({
                name: '',
                phone: '',
                email: '',
                address: '',
                preferredDate: '',
                crop: '',
                sampleId: '',
                notes: ''
            });
        } catch (err) {
            setSubmitResult({ success: false, message: err.message || 'Submission failed.' });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="p-4 mt-20 md:p-8 max-w-7xl mx-auto font-sans">
            {/* Header / Hero */}
            <header className="mb-8">
                <div className="bg-orange-300 rounded-2xl shadow p-6 md:p-8 hover:shadow-lg transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-semibold">Soil Health Dashboard</h1>
                            <p className="text-sm text-slate-600 mt-2 max-w-xl">
                                Empowering Farmers with Soil Insights for Sustainable Growth
                                <br />
                                Empowered 10+ million farmers with data-driven insights to optimize their yields, conserve resources, and build a sustainable
                                future for agriculture.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <img
                                src="../assets/SoilHealth.jpg"
                                alt="Soil Health Card"
                                className="w-40 h-28 object-contain border rounded-lg shadow"
                            />
                            <button
                                onClick={() => setShowAppointmentModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                                aria-label="Get soil health card"
                            >
                                Get soil health card
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Three-box section below hero */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div
                    onClick={() => setShowSchemes(true)}
                    className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition cursor-pointer"
                    role="button"
                    aria-pressed={showSchemes}
                >
                    <h3 className="text-lg font-semibold mb-2">Scheme Progress</h3>
                    <p className="text-sm text-slate-600">Click to view current government schemes related to soil testing.</p>
                    <div className="mt-4 flex gap-2 text-xs text-slate-500">
                        {schemes.slice(0, 3).map(s => (
                            <div key={s.id} className="flex items-center gap-2">
                                <img src={s.img} alt={s.title} className="w-10 h-10 rounded" />
                                <div>
                                    <div className="font-medium">{s.title}</div>
                                    <div className="text-xs">{s.short}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition">
                    <h3 className="text-lg font-semibold mb-2">Success Stories</h3>
                    <p className="text-sm text-slate-600">Short highlights from farmers who improved yields using soil testing.</p>
                    <div className="mt-3 grid grid-cols-1 gap-2">
                        {successStories.map(s => (
                            <div key={s.id} className="flex items-center gap-3">
                                <img src={s.img} alt={s.title} className="w-12 h-12 rounded" />
                                <div>
                                    <div className="font-medium text-sm">{s.title}</div>
                                    <div className="text-xs text-slate-500">{s.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition">
                    <h3 className="text-lg font-semibold mb-2">Resources</h3>
                    <p className="text-sm text-slate-600">Guides, FAQs, and quick links for farmers and extension workers.</p>
                    <ul className="mt-3 list-disc list-inside text-sm text-slate-600">
                        <li>How to take soil samples</li>
                        <li>Interpreting your soil health card</li>
                        <li>Contact your nearest testing lab</li>
                    </ul>
                </div>
            </section>

            {/* Soil health check progress section with three image boxes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Soil Health Check Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative p-4 rounded-2xl overflow-hidden shadow bg-white hover:shadow-lg transition">
                        <img src="./assets/SoilSample.png" alt="camp" className="w-full h-40 object-cover rounded-md" />
                        <div className="mt-3">
                            <h3 className="font-medium">Testing Soil Sample</h3>
                            <p className="text-sm text-slate-500">1200+ camps across districts</p>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold">New</div>
                    </div>

                    <div className="relative p-4 rounded-2xl overflow-hidden shadow bg-white hover:shadow-lg transition">
                        <img src="./assets/Soil-LabUpdate.png" alt="lab" className="w-full h-40 object-cover rounded-md" />
                        <div className="mt-3">
                            <h3 className="font-medium">Lab Upgrades</h3>
                            <p className="text-sm text-slate-500">50 district labs modernized</p>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold">Announcement</div>
                    </div>

                    <div className="relative p-4 rounded-2xl overflow-hidden shadow bg-white hover:shadow-lg transition">
                        <img src="./assets/Soil-health-cardAprove.webp" alt="farm" className="w-full h-40 object-cover rounded-md" />
                        <div className="mt-3">
                            <h3 className="font-medium">Soil Health Cards Issued</h3>
                            <p className="text-sm text-slate-500">10M+ cards and growing</p>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold">Update</div>
                    </div>
                </div>
            </section>

            {/* Announcements row */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Announcements</h2>
                <div className="flex flex-col md:flex-row gap-3">
                    {announcements.map(a => (
                        <div key={a.id} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow hover:shadow-md transition">
                            <div className="text-2xl p-2 bg-blue-50 rounded-full">{a.icon}</div>
                            <div>
                                <div className="font-medium">{a.title}</div>
                                <div className="text-sm text-slate-500">Important update from the soil testing cell</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Soil health benefit section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Soil Health Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold">Improve Yields</h3>
                        <p className="text-sm text-slate-600">Targeted nutrient management increases productivity.</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold">Save Inputs</h3>
                        <p className="text-sm text-slate-600">Avoid overuse of fertilizers and save cost.</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold">Sustainability</h3>
                        <p className="text-sm text-slate-600">Preserve long-term soil health and ecosystem services.</p>
                    </div>
                </div>
            </section>

            {/* Nutrient analysis + Training videos (single section) */}
            <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT: Nutrient Analysis */}
                <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
                    {/* Title (top, centered) */}
                    <h2 className="text-xl font-semibold text-center">Nutrient Analysis</h2>

                    {/* Buttons (centered under title) */}
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                            onClick={() => setActiveNutrient('macro')}
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${activeNutrient === 'macro' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700'}`}
                        >
                            Macro-nutrient
                        </button>
                        <button
                            onClick={() => setActiveNutrient('micro')}
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${activeNutrient === 'micro' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700'}`}
                        >
                            Micro-nutrient
                        </button>
                    </div>

                    {/* Big rounded chart in middle */}
                    <div className="mt-6 flex flex-col items-center gap-4">
                        {/* outer bg circle */}
                        <div className="w-[520px] max-w-full md:w-[480px] h-[520px] md:h-[480px] rounded-full bg-slate-50 flex items-center justify-center shadow-inner">
                            {/* Inner (chart) wrapper made larger */}
                            <div className="w-[440px] max-w-full md:w-[420px] h-[440px] md:h-[420px] rounded-full flex items-center justify-center">
                                <CircularNutrientChart
                                    labels={activeNutrient === 'macro' ? ['N', 'P', 'K'] : ['S', 'Fe', 'Zn']}
                                    values={activeNutrient === 'macro' ? [45, 30, 25] : [40, 35, 25]}
                                />
                            </div>
                        </div>

                        {/* Chips / elements below chart */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                            {(activeNutrient === 'macro' ? ['N', 'P', 'K'] : ['S', 'Fe', 'Zn']).map(x => (
                                <button
                                    key={x}
                                    onClick={() => { /* optional: show nutrient detail */ }}
                                    className="w-16 h-16 rounded-full flex items-center justify-center border shadow-sm text-sm font-semibold hover:scale-105 transition"
                                    aria-label={`Show details for ${x}`}
                                >
                                    {x}
                                </button>
                            ))}
                        </div>

                        <p className="text-sm text-slate-600 mt-2 text-center">Click a nutrient chip to see specific advice (example UI).</p>
                    </div>
                </div>

                {/* RIGHT: Training Videos */}
                <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">Training Videos</h3>
                    <p className="text-sm text-slate-600">Short, practical videos for farmers and extension staff. (Add your video links below.)</p>

                    <div className="mt-3 grid grid-cols-1 gap-3">
                        {(trainingVideos || []).slice(0, 4).map((v, i) => (
                            <a key={i} href={v?.url || '#'} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition" onClick={(e) => { if (!v?.url) e.preventDefault() }}>
                                <div className="w-14 h-10 bg-slate-100 rounded flex items-center justify-center">▶</div>
                                <div className="flex-1">
                                    <div className="font-medium">{v?.title ?? `Video option ${i + 1}`}</div>
                                    <div className="text-xs text-slate-500">{v?.duration ?? '5 - 12 min'}</div>
                                </div>
                            </a>
                        ))}

                        {(!trainingVideos || trainingVideos.length === 0) && (
                            <>
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-dashed">
                                        <div className="w-14 h-10 bg-slate-100 rounded flex items-center justify-center">▶</div>
                                        <div className="flex-1">
                                            <div className="font-medium">Video option {i + 1}</div>
                                            <div className="text-xs text-slate-500">duration (e.g. 5-12 min)</div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Soil Testing related Scheme with image */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Soil Testing Related Schemes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {schemes.map(s => (
                        <div key={s.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                            <img src={s.img} alt={s.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <div className="font-semibold">{s.title}</div>
                                <div className="text-sm text-slate-600 mt-1">{s.short}</div>
                                <div className="mt-3 flex items-center gap-2">
                                    <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded">Learn more</button>
                                    <button className="text-sm px-3 py-1 border rounded">Share</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Schemes modal / panel (simple inline implementation) */}
            {showSchemes && (
                <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-lg relative">
                        <button onClick={() => setShowSchemes(false)} className="absolute top-4 right-4 text-slate-500">✕</button>
                        <h3 className="text-xl font-semibold mb-4">Current Government Schemes (Soil Testing)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {schemes.map(s => (
                                <div key={s.id} className="flex gap-3 p-3 rounded-lg border">
                                    <img src={s.img} alt={s.title} className="w-20 h-20 object-cover rounded" />
                                    <div>
                                        <div className="font-medium">{s.title}</div>
                                        <div className="text-sm text-slate-600">{s.short}</div>
                                        <div className="mt-2 text-xs text-slate-500">Status: Active</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Appointment Modal */}
            {showAppointmentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => { if (!submitting) { setShowAppointmentModal(false); setSubmitResult(null); } }}
                    />
                    {/* modal */}
                    <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Soil Test Appointment</h3>
                            <button
                                className="text-slate-500 hover:text-slate-700"
                                onClick={() => { if (!submitting) { setShowAppointmentModal(false); setSubmitResult(null); } }}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAppointmentSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    className="border rounded px-3 py-2"
                                    placeholder="Full name *"
                                    value={appointmentForm.name}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                                    required
                                />
                                <input
                                    className="border rounded px-3 py-2"
                                    placeholder="Phone number *"
                                    value={appointmentForm.phone}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                                    required
                                />
                                <input
                                    className="border rounded px-3 py-2"
                                    placeholder="Email"
                                    type="email"
                                    value={appointmentForm.email}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                                />
                                <input
                                    className="border rounded px-3 py-2"
                                    placeholder="Preferred date"
                                    type="date"
                                    value={appointmentForm.preferredDate}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, preferredDate: e.target.value })}
                                />
                                <input
                                    className="col-span-1 md:col-span-2 border rounded px-3 py-2"
                                    placeholder="Address (village / post / block) *"
                                    value={appointmentForm.address}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, address: e.target.value })}
                                    required
                                />
                                <input
                                    className="border rounded px-3 py-2"
                                    placeholder="Crop (e.g. Wheat)"
                                    value={appointmentForm.crop}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, crop: e.target.value })}
                                />
                                <input
                                    className="border rounded px-3 py-2"
                                    placeholder="Sample ID (if any)"
                                    value={appointmentForm.sampleId}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, sampleId: e.target.value })}
                                />
                                <textarea
                                    className="col-span-1 md:col-span-2 border rounded px-3 py-2"
                                    placeholder="Additional notes"
                                    rows={3}
                                    value={appointmentForm.notes}
                                    onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                                    >
                                        {submitting ? 'Submitting...' : 'Book Appointment'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { if (!submitting) { setShowAppointmentModal(false); setSubmitResult(null); } }}
                                        className="ml-3 px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className="text-sm">
                                    {submitResult && (
                                        <span className={submitResult.success ? 'text-green-600' : 'text-red-600'}>
                                            {submitResult.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <footer className="mt-8 text-sm text-slate-500">Designed for government-facing soil health services. Responsive for mobile and desktop.</footer>
        </div>
    );
}
