import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            q: "What is your 100-night trial promise?",
            a: "We want you to sleep soundly. You can test your new Fast Asleep mattress in your own bedroom for up to 100 nights. If it does not live up to your comfort expectations, we will collect it free of charge and issue a full refund."
        },
        {
            q: "Do you manufacture custom sizes and shapes?",
            a: "Yes! We specialize in custom-cut foam mattresses and protectors for caravans, bakkies, boats, and specialized baby cots. Please visit our Contact page to send a WhatsApp or Email for a custom size quote."
        },
        {
            q: "How does the modular comfort layer adjustment work?",
            a: "Our mattresses feature layer-based customization. You can easily unzip the premium bamboo cover and rearrange the inner memory foam and support layers to adjust the feel from Soft, to Medium, or Firm."
        },
        {
            q: "How long does delivery take?",
            a: "We offer free nationwide shipping across South Africa. Standard products are delivered within 2-5 business days. Custom orders take 10-15 business days as they are individually handcrafted in Johannesburg."
        },
        {
            q: "What warranty do you offer?",
            a: "We offer a 2-year guarantee and a comprehensive 25-year service warranty on our modular mattresses, reflecting the premium craftsmanship and durability of South African manufacturing."
        }
    ];

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-24 border-b border-gray-150">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center md:text-left mb-16">
                    <span className="text-gray-400 font-bold uppercase tracking-[0.25em] text-[10px] block mb-2">
                        QUESTIONS?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-navy uppercase tracking-wider">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div 
                                key={index} 
                                className="border border-gray-250 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                            >
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className="font-extrabold text-navy text-sm md:text-base tracking-wide">
                                        {item.q}
                                    </span>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                                            isOpen ? 'rotate-180 text-navy' : ''
                                        }`} 
                                    />
                                </button>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ${
                                        isOpen ? 'max-h-60 border-t border-gray-150' : 'max-h-0'
                                    }`}
                                >
                                    <p className="p-6 text-gray-600 text-xs md:text-sm leading-relaxed bg-white">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
