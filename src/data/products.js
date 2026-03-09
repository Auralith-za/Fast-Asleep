export const products = [
    // Mattresses
    {
        id: 'hybrid-pc',
        name: 'HYBRID-PC',
        category: 'mattresses',
        priceRange: 'R9,995.00 – R17,545.00',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1000',
        description: 'A luxurious plush top memory foam pocket coil mattress. Features high-density memory foam for pressure relief.',
        slug: 'hybrid-pc',
        features: ['Pressure Relief', 'Zero Movement Transfer', 'Bamboo Fabric']
    },
    {
        id: 'hydra-cool',
        name: 'HYDRA-COOL',
        category: 'mattresses',
        priceRange: 'R6,400.00 – R15,275.00',
        image: 'https://images.unsplash.com/photo-1505693416388-b0346efee539?auto=format&fit=crop&q=80&w=1000',
        description: 'Designed for cooling comfort and support.',
        slug: 'hydra-cool',
        features: ['Cooling Technology', 'Supportive Core']
    },
    {
        id: 'ortho-eclipse',
        name: 'ORTHO ECLIPSE',
        category: 'mattresses',
        priceRange: 'R5,650.00 – R13,770.00',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000',
        description: 'Orthopaedic support for a healthy spine.',
        slug: 'ortho-eclipse',
        features: ['Orthopaedic Support', 'Durable']
    },
    {
        id: 'latex-plush',
        name: 'LATEX PLUSH',
        category: 'mattresses',
        priceRange: 'R4,470.00 – R15,275.00',
        image: 'https://images.unsplash.com/photo-1522771753062-5a31a5052472?auto=format&fit=crop&q=80&w=1000',
        description: 'Natural latex comfort with plush feel.',
        slug: 'latex-plush',
        features: ['Natural Latex', 'Hypoallergenic']
    },
    {
        id: 'b-zen-bronnel',
        name: 'B ZEN BRONNEL',
        category: 'mattresses',
        priceRange: 'R3,400.00 – R9,485.00',
        image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&q=80&w=1000',
        description: 'Affordable comfort for everyday use.',
        slug: 'b-zen-bronnel',
        features: ['Budget Friendly', 'Reliable Support']
    },

    // Pillows
    {
        id: 'activated-charcoal-pillow',
        name: 'Activated Charcoal Foam Pillow',
        category: 'pillows',
        priceRange: 'R770.00',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000', // Placeholder
        description: 'Infused with activated charcoal for odor control and cooling.',
        slug: 'activated-charcoal-pillow',
        features: ['Odor Control', 'Cooling', 'Memory Foam']
    },
    {
        id: 'combo-pillow',
        name: 'Combo Pillow',
        category: 'pillows',
        priceRange: 'R550.00',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000', // Placeholder
        description: 'Versatile comfort for all sleeping positions.',
        slug: 'combo-pillow',
        features: ['Versatile', 'Soft Support']
    },
    {
        id: 'classic-travel-pillow',
        name: 'Classic Travel Pillow',
        category: 'pillows',
        priceRange: 'R390.00',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000', // Placeholder
        description: 'Compact comfort for your travels.',
        slug: 'classic-travel-pillow',
        features: ['Compact', 'Travel Friendly']
    },

    // Toppers (Placeholder data as specific topper names weren't explicitly detailed, assuming generic)
    {
        id: 'memory-foam-topper',
        name: 'Memory Foam Topper',
        category: 'toppers',
        priceRange: 'R1,500.00 - R3,000.00',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7bab016?q=80&w=2070&auto=format&fit=crop', // Placeholder
        description: 'Add a layer of plush memory foam to any mattress.',
        slug: 'memory-foam-topper',
        features: ['Plush Comfort', 'Revitalize Old Mattress']
    }
];

export const features = [
    {
        title: "Pressure Relief",
        description: "A top layer designed to cradle pressure points and adapt to the body's shape.",
        icon: "Cloud"
    },
    {
        title: "Support",
        description: "A dedicated support layer engineered to keep the spine aligned throughout the night.",
        icon: "Activity"
    },
    {
        title: "Breathability",
        description: "Utilizes open-cell foam to allow free air flow and temperature regulation.",
        icon: "Wind"
    },
    {
        title: "Simplicity",
        description: "Designed to work with most frames and foundations; available in all standard sizes.",
        icon: "CheckCircle"
    }
];
