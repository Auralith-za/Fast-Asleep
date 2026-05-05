import React, { useState } from 'react';
import { Heart, Star, ArrowRight, ShieldCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import bodyPillowImg from '../assets/promos/body-pillow.png';
import babyMattressImg from '../assets/promos/baby-mattress.png';
import topperBundleImg from '../assets/promos/topper-bundle.png';
import backrestPillowImg from '../assets/promos/backrest-pillow.png';

export default function MothersDaySpecials({ onNavigate, onProductClick }) {
    const [activeSlide, setActiveSlide] = useState(0);

    const specials = [
        {
            id: "4687",
            title: "Orthopaedic Baby Care",
            cursiveTitle: "better nights",
            subtitle: "Spinal Alignment",
            desc: "Give your baby the comfort they deserve and the best start in life. Our orthopaedic cot mattress ensures healthy spinal alignment and deep, restful sleep.",
            price: "R699",
            oldPrice: "R1100",
            save: "SAVE R401",
            image: "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/33558115-D31F-4D2F-9E60-13CDA539149E.png",
            features: [
                { icon: <Star className="text-[#B28C57] w-7 h-7 fill-[#B28C57]" />, title: "Safe & Healthy", text: "Hypoallergenic and breathable materials." },
                { icon: <ShieldCheck className="text-[#B28C57] w-7 h-7" />, title: "Premium Quality", text: "Built to last and support growing spines." }
            ]
        },
        {
            id: "4686",
            title: "Full Body Support Pillow",
            cursiveTitle: "better sleep",
            subtitle: "Award Winning Comfort",
            desc: "From new moms to moms-to-be, give the gift of deep, comfortable sleep every night. Our full body support pillow is designed to cradle her in total bliss.",
            price: "R499",
            oldPrice: "R900",
            save: "SAVE R401",
            image: "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/58B76993-AAFB-4D42-928D-22FEECA9C0AE.png",
            features: [
                { icon: <ShieldCheck className="text-rose-400 w-7 h-7" />, title: "Relieves Pressure", text: "Gentle support for back, hips and neck." },
                { icon: <Heart className="text-rose-400 w-7 h-7" />, title: "Supports Belly", text: "Helps expectant mothers rest comfortably." }
            ]
        },
        {
            id: "4695",
            title: "Base Set Combo Deal",
            cursiveTitle: "best gift",
            subtitle: "Premium Sleep System",
            desc: "Get 20% OFF any mattress base set + a FREE Pillow & Mattress Protector Combo worth R950! Because she deserves the best sleep, every night.",
            price: "20% OFF",
            oldPrice: "",
            save: "FREE COMBO",
            image: "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/2B3C7C12-C2A1-4881-A49E-AEF613AA8013.png",
            features: [
                { icon: <Award className="text-[#B28C57] w-7 h-7" />, title: "2 Year Warranty", text: "Quality you can trust for years to come." },
                { icon: <ShieldCheck className="text-[#B28C57] w-7 h-7" />, title: "30 Night Promise", text: "Sleep easy with our comfort guarantee." }
            ]
        },
        {
            id: "4689",
            title: "Backrest Wedge Pillow",
            cursiveTitle: "just for her",
            subtitle: "Ergonomic Support",
            desc: "Perfect for reading, resting or watching TV in bed. Ergonomic support for her back, neck and arms with soft, durable fabric that lasts.",
            price: "R699",
            oldPrice: "R950",
            save: "SAVE R251",
            image: "https://wp.fastasleep.co.za/wp-content/uploads/2021/11/00D9E579-5787-4F3C-941B-BB98B786416C.png",
            features: [
                { icon: <Heart className="text-rose-400 w-7 h-7" />, title: "Lived by Moms", text: "Trusted and recommended for daily comfort." },
                { icon: <Award className="text-rose-400 w-7 h-7" />, title: "Multiple Colours", text: "Available in various shades to suit her style." }
            ]
        }
    ];

    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % specials.length);
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + specials.length) % specials.length);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1px] w-12 bg-gray-200"></div>
                        <Heart className="text-rose-400 fill-rose-400 w-4 h-4" />
                        <span className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Mother's Day Specials</span>
                        <Heart className="text-rose-400 fill-rose-400 w-4 h-4" />
                        <div className="h-[1px] w-12 bg-gray-200"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6 tracking-tight leading-[1.1]">
                        Thoughtful gifts. <br className="md:hidden" /> 
                        <span className="font-script font-normal text-rose-400 lowercase text-5xl md:text-7xl">Better sleep.</span>
                    </h2>
                </div>

                {/* Carousel Container */}
                <div className="relative mb-32">
                    <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20">
                        <button onClick={prevSlide} className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-navy hover:bg-[#B28C57] hover:text-white transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20">
                        <button onClick={nextSlide} className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-navy hover:bg-[#B28C57] hover:text-white transition-all">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="transition-all duration-700 ease-in-out">
                        {specials.map((special, idx) => (
                            <div key={idx} className={`${idx === activeSlide ? 'block' : 'hidden'} animate-fade-in`}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                    <div className="relative group">
                                        <div className="absolute -inset-6 bg-[#FDF5F5] rounded-[2.5rem] -z-10"></div>
                                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[12px] border-white aspect-[4/5] lg:aspect-auto bg-[#f9f7f4]">
                                            <img 
                                                src={special.image} 
                                                alt={special.title} 
                                                className="w-full h-auto lg:h-[750px] object-contain transition-transform duration-[2s] group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-[#B28C57] font-bold uppercase tracking-widest text-[10px] mb-6">
                                            <Award className="w-4 h-4" /> {special.subtitle}
                                        </div>
                                        <h2 className="text-5xl md:text-6xl font-bold text-navy mb-8 leading-[1.05] tracking-tight">
                                            The gift of <br />
                                            <span className="text-[#B28C57] font-script font-normal lowercase text-5xl md:text-7xl">{special.cursiveTitle}</span> <br />
                                            for every mom.
                                        </h2>
                                        <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-xl">
                                            {special.desc}
                                        </p>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 border-y border-gray-100 py-8">
                                            {special.features.map((f, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <div className="bg-rose-50 p-3 rounded-xl">
                                                        {f.icon}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-navy text-[11px] uppercase tracking-wider mb-1">{f.title}</p>
                                                        <p className="text-gray-400 text-[10px] leading-relaxed">{f.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                                            <div>
                                                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[9px] mb-2">Mother's Day Price</p>
                                                <div className="flex items-baseline gap-3">
                                                    <span className="text-5xl font-black tracking-tighter text-navy">{special.price}</span>
                                                    {special.oldPrice && <span className="text-gray-300 line-through text-xl font-medium">{special.oldPrice}</span>}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => onProductClick(special.id)}
                                                className="w-full sm:w-auto bg-navy text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#B28C57] transition-all flex items-center justify-center gap-3 group/arrow shadow-xl"
                                            >
                                                Order Now <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {specials.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setActiveSlide(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === activeSlide ? 'bg-[#B28C57] w-8' : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Grid Section: Kept as secondary specials */}
                <div className="bg-navy rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">More ways to <span className="font-script font-normal lowercase text-4xl md:text-6xl text-rose-400">spoil her</span></h2>
                            <div className="h-1 w-16 bg-rose-500 mx-auto rounded-full"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Topper Bundle */}
                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden group cursor-pointer" onClick={() => onProductClick("4688")}>
                                <div className="h-48 overflow-hidden relative">
                                    <img src={topperBundleImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                </div>
                                <div className="p-8">
                                    <h4 className="text-xl font-bold text-white mb-3">Mattress Topper Bundle</h4>
                                    <p className="text-white/50 text-xs mb-6">Buy any topper and get a FREE premium pillow set.</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">From R1499</span>
                                        <ArrowRight className="text-[#B28C57] w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            {/* Backrest Pillow */}
                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden group cursor-pointer" onClick={() => onProductClick("4689")}>
                                <div className="h-48 overflow-hidden relative bg-[#f9f7f4]">
                                    <img 
                                        src="https://wp.fastasleep.co.za/wp-content/uploads/2021/11/00D9E579-5787-4F3C-941B-BB98B786416C.png" 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                </div>
                                <div className="p-8">
                                    <h4 className="text-xl font-bold text-white mb-3">Backrest Wedge Pillow</h4>
                                    <p className="text-white/50 text-xs mb-6">Perfect for reading or watching TV in bed.</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold">R699</span>
                                        <ArrowRight className="text-[#B28C57] w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            {/* Flash Sale Card */}
                            <div className="bg-rose-500 rounded-3xl p-8 flex flex-col justify-center items-center text-center cursor-pointer" onClick={() => onProductClick("4690")}>
                                <h4 className="text-2xl font-bold text-white mb-6">Pillow Flash Sale</h4>
                                <div className="bg-white/20 p-4 rounded-2xl w-full mb-6">
                                    <p className="text-white font-black text-lg">BUY 2 GET 1 FREE</p>
                                </div>
                                <button className="bg-white text-rose-500 px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest w-full">
                                    Shop Sale
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


