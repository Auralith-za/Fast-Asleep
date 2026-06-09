import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/27837845518"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white text-[#25D366] border-2 border-[#25D366] px-5 py-3 rounded-full shadow-md hover:bg-[#25D366] hover:text-white hover:shadow-lg transition-all hover:-translate-y-1 group"
        >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="font-bold hidden md:block">Chat with us</span>

            {/* Tooltip for desktop if needed, or just text */}
            <span className="absolute right-0 bottom-full mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Quick Quotes & Support
            </span>
        </a>
    );
}
