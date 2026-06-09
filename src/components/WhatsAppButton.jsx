import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/27837845518"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white border-[3px] border-white w-14 h-14 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-[#20bd5a] hover:shadow-[0_8px_25px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-1 group"
        >
            <MessageCircle className="w-7 h-7 fill-current" />

            {/* Tooltip for desktop */}
            <span className="absolute right-[calc(100%+1rem)] top-1/2 -translate-y-1/2 bg-white text-navy font-bold text-[11px] px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 hidden md:block">
                Chat with us
            </span>
        </a>
    );
}
