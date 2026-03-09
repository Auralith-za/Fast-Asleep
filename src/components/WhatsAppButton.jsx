import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/27123456789" // Placeholder number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#20bd5a] hover:shadow-xl transition-all hover:-translate-y-1 group"
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
