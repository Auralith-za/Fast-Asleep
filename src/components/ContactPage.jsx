import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom">
                <h1 className="text-4xl font-bold text-navy text-center mb-4">Contact Us</h1>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Have a question about our mattresses or need a custom cut? We'd love to hear from you.
                    Fill out the form below or visit us in store.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* Left Column: Contact Info & Map */}
                    <div className="space-y-8">
                        {/* Info Cards */}
                        <div className="bg-white p-8 rounded-sm shadow-sm">
                            <h2 className="text-2xl font-bold text-navy mb-6">Get in Touch</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-navy">Phone</h3>
                                        <p className="text-gray-600">+27 12 345 6789</p>
                                        <p className="text-gray-500 text-xs mt-1">Mon-Fri: 8am - 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-navy">Email</h3>
                                        <p className="text-gray-600">hello@fastasleep.co.za</p>
                                        <p className="text-gray-500 text-xs mt-1">We reply within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-navy">Visit Us</h3>
                                        <p className="text-gray-600">Unit 1, Jet Industrial Park<br />Jet Park, Johannesburg, 1459</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map iframe */}
                        <div className="bg-white p-2 rounded-sm shadow-sm h-64 relative overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://maps.google.com/maps?q=Unit+1,+Jet+Industrial+Park,+Jet+Park,+Johannesburg,+1459&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                title="Fast Asleep Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-white p-8 rounded-sm shadow-sm">
                        <h2 className="text-2xl font-bold text-navy mb-6">Send a Message</h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-navy mb-2">First Name</label>
                                    <input type="text" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-navy mb-2">Last Name</label>
                                    <input type="text" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-navy mb-2">Email Address</label>
                                <input type="email" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-navy mb-2">Subject</label>
                                <select className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white">
                                    <option>General Inquiry</option>
                                    <option>Order Status</option>
                                    <option>Custom Cut Quote</option>
                                    <option>Returns & Warranty</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-navy mb-2">Message</label>
                                <textarea rows="5" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="button" className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base shadow-lg hover:-translate-y-1 transition-transform">
                                Send Message <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
