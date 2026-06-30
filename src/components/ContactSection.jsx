import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export default function ContactSection() {
    return (
        <section className="bg-navy py-20 text-white text-center">
            <div className="container-custom max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Not Sure What You Need? We're Here To Help.</h2>
                <p className="text-lg text-gray-300 mb-2">Choosing the right sleep solution can feel overwhelming.</p>
                <p className="text-4xl md:text-5xl text-[#cca86e] font-script mb-12">Let our team guide you.</p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <button className="w-full md:w-auto bg-white text-navy font-bold py-4 px-8 rounded-sm flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm shadow-lg">
                        <Phone className="w-5 h-5 text-navy" />
                        Call Us
                    </button>
                    <button className="w-full md:w-auto bg-[#25D366] text-white font-bold py-4 px-8 rounded-sm flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-colors uppercase tracking-widest text-sm shadow-lg">
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp Us Instantly
                    </button>
                    <button className="w-full md:w-auto border border-white/30 text-white font-bold py-4 px-8 rounded-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-colors uppercase tracking-widest text-sm shadow-lg">
                        <Mail className="w-5 h-5" />
                        Email Support
                    </button>
                </div>
            </div>
        </section>
    );
}
