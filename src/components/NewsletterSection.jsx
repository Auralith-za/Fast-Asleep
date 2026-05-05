import React from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
    return (
        <section className="bg-rose-50 py-20 border-t border-rose-100">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 md:p-14 text-center border border-gray-100">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 uppercase tracking-wide">
                        Sleep Better Starting Today
                    </h2>
                    <p className="text-gray-600 mb-8 md:text-lg max-w-xl mx-auto">
                        Get <strong className="text-rose-500">10% off your first order</strong> plus exclusive sleeping tips straight to your inbox.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-navy text-white font-bold py-4 px-8 rounded-lg uppercase tracking-widest text-sm hover:bg-rose-500 transition-colors whitespace-nowrap shadow-md"
                        >
                            ⭐️ Subscribe
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-4">We respect your privacy. No spam, ever.</p>
                </div>
            </div>
        </section>
    );
}
