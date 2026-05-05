import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-darkFooter text-gray-300 pt-16 pb-8 text-sm">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-2">Fast Asleep</h3>
                        <p className="text-gold font-script text-2xl mb-6">Where Better Sleep Begin</p>
                        <p className="mb-6 leading-relaxed">
                            South Africa's trusted foam specialists. We manufacture high-quality, fully customisable mattresses for every need — from homes to hospitals, caravans to cribs.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">Shop</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-gold transition-colors">Mattresses</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Pillows & Toppers</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Kids Range</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Pet Beds</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Custom Cuts</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Care */}
                    <div>
                        <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Shipping & Delivery</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Returns Policy</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Warranty Registration</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">Stay Connected</h3>
                        <p className="mb-4 text-xs">Get 10% off your first order + sleep tips.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold"
                            />
                            <button className="btn-primary w-full py-3">Subscribe</button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Fast Asleep. All rights reserved.
                    </p>

                    {/* Payment Logos (Simulated with text/icons or placeholders) */}
                    <div className="flex gap-4 items-center opacity-50">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-bold tracking-tighter text-lg">VISA</span>
                        <span className="font-bold tracking-tighter text-lg">Mastercard</span>
                        <span className="font-bold tracking-tighter text-lg italic">PayFast</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
