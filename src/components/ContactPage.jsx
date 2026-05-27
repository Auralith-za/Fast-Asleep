import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' or 'email'
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [subject, setSubject] = useState('General Inquiry');
    const [message, setMessage] = useState('');

    const MESSAGE_LIMIT = 200;

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (channel === 'whatsapp') {
            const formattedText = `Hi Fast Asleep, my name is ${firstName} ${lastName}. 
Inquiry: ${subject}
Message: ${message.substring(0, MESSAGE_LIMIT)}
Contact: ${emailOrPhone}`;
            
            const encodedText = encodeURIComponent(formattedText);
            // Open WhatsApp link (using mock number 27720000000 or custom)
            window.open(`https://wa.me/27720000000?text=${encodedText}`, '_blank');
        } else {
            // Email submit simulation
            alert(`Inquiry sent successfully via Email!\nSubject: ${subject}\nWe'll get back to you at ${emailOrPhone} within 24 hours.`);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom">
                <h1 className="text-4xl font-bold text-navy text-center mb-4 uppercase tracking-wider">Contact Us</h1>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Have a question about our mattresses, caravan cuts, or need a custom quote? We'd love to help you.
                    Choose your preferred communication channel below.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Contact Info & Map */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Info Cards */}
                        <div className="bg-white p-8 rounded-none border border-gray-200/80 shadow-sm">
                            <h2 className="text-2xl font-extrabold text-navy mb-6 uppercase tracking-wider">Get in Touch</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-lightGrey flex items-center justify-center shrink-0 border border-gray-200/50">
                                        <Phone className="w-5 h-5 text-navy" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">Phone</h3>
                                        <p className="text-gray-600 text-sm mt-1">+27 12 345 6789</p>
                                        <p className="text-gray-500 text-xs mt-1">Mon-Fri: 8am - 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-lightGrey flex items-center justify-center shrink-0 border border-gray-200/50">
                                        <Mail className="w-5 h-5 text-navy" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">Email</h3>
                                        <p className="text-gray-600 text-sm mt-1">hello@fastasleep.co.za</p>
                                        <p className="text-gray-500 text-xs mt-1">We reply within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-lightGrey flex items-center justify-center shrink-0 border border-gray-200/50">
                                        <MapPin className="w-5 h-5 text-navy" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">Visit Us</h3>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">Unit 1, Jet Industrial Park<br />Jet Park, Johannesburg, 1459</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map iframe */}
                        <div className="bg-white p-2 rounded-none border border-gray-200/80 shadow-sm h-64 relative overflow-hidden">
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
                    <div className="lg:col-span-7 bg-white p-8 rounded-none border border-gray-200/80 shadow-sm">
                        <h2 className="text-2xl font-extrabold text-navy mb-6 uppercase tracking-wider">Send a Message</h2>

                        {/* Channel Switcher */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button
                                type="button"
                                onClick={() => setChannel('whatsapp')}
                                className={`py-4 px-4 flex items-center justify-center gap-3 border font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                                    channel === 'whatsapp'
                                        ? 'border-green-500 bg-green-500 text-white'
                                        : 'border-gray-200 text-gray-500 hover:border-green-500 hover:text-green-500 bg-white'
                                }`}
                            >
                                <MessageSquare className="w-4 h-4" /> WhatsApp Message
                            </button>
                            <button
                                type="button"
                                onClick={() => setChannel('email')}
                                className={`py-4 px-4 flex items-center justify-center gap-3 border font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                                    channel === 'email'
                                        ? 'border-navy bg-navy text-white'
                                        : 'border-gray-200 text-gray-500 hover:border-navy hover:text-navy bg-white'
                                }`}
                            >
                                <Mail className="w-4 h-4" /> Send Email
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">First Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full border border-gray-200 p-3 rounded-none focus:outline-none focus:border-[#c5a059] text-sm" 
                                        placeholder="John" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Last Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full border border-gray-200 p-3 rounded-none focus:outline-none focus:border-[#c5a059] text-sm" 
                                        placeholder="Doe" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                                    {channel === 'whatsapp' ? 'Phone Number (linked to WhatsApp)' : 'Email Address'}
                                </label>
                                <input 
                                    type={channel === 'whatsapp' ? 'tel' : 'email'} 
                                    required
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    className="w-full border border-gray-200 p-3 rounded-none focus:outline-none focus:border-[#c5a059] text-sm" 
                                    placeholder={channel === 'whatsapp' ? '+27 82 123 4567' : 'john@example.com'} 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Subject / Product Range</label>
                                <select 
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full border border-gray-200 p-3 rounded-none focus:outline-none focus:border-[#c5a059] text-sm bg-white"
                                >
                                    <option>General Inquiry</option>
                                    <option>Caravan & Bakkie Mattress Quote</option>
                                    <option>Custom Foam Cuts Quote</option>
                                    <option>Beds & Bases Info</option>
                                    <option>Order Status & Inquiries</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <label className="block text-xs font-bold text-navy uppercase tracking-wider">Inquiry Details</label>
                                    {channel === 'whatsapp' && (
                                        <span className={`text-[10px] font-bold ${message.length > MESSAGE_LIMIT ? 'text-red-500' : 'text-gray-400'}`}>
                                            {message.length} / {MESSAGE_LIMIT} chars
                                        </span>
                                    )}
                                </div>
                                <textarea 
                                    rows="4" 
                                    required
                                    value={message}
                                    onChange={handleMessageChange}
                                    maxLength={channel === 'whatsapp' ? MESSAGE_LIMIT : undefined}
                                    className="w-full border border-gray-200 p-3 rounded-none focus:outline-none focus:border-[#c5a059] text-sm" 
                                    placeholder={channel === 'whatsapp' ? "Describe your request in under 200 characters for immediate review..." : "How can we help you?"}
                                ></textarea>
                                
                                {channel === 'whatsapp' && (
                                    <p className="text-[10px] text-green-600 font-bold mt-1.5 animate-pulse">
                                        ⚡ WhatsApp Prompt Guidance: Keep your inquiry short and precise (under 200 characters) for faster agent assignment!
                                    </p>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className={`w-full py-4.5 flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] text-xs text-white shadow-lg transition-all duration-300 ${
                                    channel === 'whatsapp' 
                                        ? 'bg-green-500 hover:bg-green-600' 
                                        : 'bg-navy hover:bg-[#0a1530]'
                                }`}
                            >
                                {channel === 'whatsapp' ? (
                                    <>Open WhatsApp Chat <MessageSquare className="w-4 h-4" /></>
                                ) : (
                                    <>Send Inquiry Email <Send className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
