import React from "react";

const Footer = () => {
    return (
        <footer className="bg-yellow-800 text-black-300">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand + Social */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">🌾 KishanSetu</h2>
                    <p className="text-sm mb-6">
                        Connecting farmers and buyers with real-time mandi prices,
                        government schemes, and agri-support services.
                    </p>
                    <div className="flex space-x-3">
                        {["X", "f", "▶", "📷", "in"].map((icon, i) => (
                            <div
                                key={i}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-colors cursor-pointer"
                            >
                                <span className="text-white font-bold">{icon}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activities */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Activities</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-orange-400">Groups</a></li>
                        <li><a href="#" className="hover:text-orange-400">Discuss</a></li>
                        <li><a href="#" className="hover:text-orange-400">Poll & Survey</a></li>
                        <li><a href="#" className="hover:text-orange-400">Campaigns</a></li>
                        <li><a href="#" className="hover:text-orange-400">Blog</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Help & Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-orange-400">Help Center</a></li>
                        <li><a href="#" className="hover:text-orange-400">FAQ</a></li>
                        <li><a href="#" className="hover:text-orange-400">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-orange-400">Feedback</a></li>
                        <li><a href="#" className="hover:text-orange-400">Contact Us</a></li>
                    </ul>
                </div>

                {/* Useful Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Useful Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-orange-400">MyGov Quiz</a></li>
                        <li><a href="#" className="hover:text-orange-400">Transforming India</a></li>
                        <li><a href="#" className="hover:text-orange-400">MyGov Innovation</a></li>
                        <li><a href="#" className="hover:text-orange-400">MyGov Blog</a></li>
                        <li><a href="#" className="hover:text-orange-400">Campus Program</a></li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700"></div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm">
                    © {new Date().getFullYear()} KishanSetu. All rights reserved.
                </p>
                <p className="text-sm">
                    Designed & Developed with ❤️ by <span className="text-orange-400">Team KishanSetu</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
