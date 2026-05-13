import React, { Suspense, useRef, useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    Stage, 
    OrbitControls, 
    useGLTF, 
    Float, 
    PerspectiveCamera,
    Environment,
    ContactShadows,
    BakeShadows
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Menu, 
    X, 
    ArrowRight, 
    ChevronDown, 
    Download,
    Box,
    Globe,
    ShieldCheck,
    Zap,
    Maximize
} from 'lucide-react';

// --- 3D Components ---
function HelmetModel({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    return (
        <primitive 
            object={scene} 
            scale={1.5} 
            rotation={[0, Math.PI / 4, 0]}
        />
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={0.8} 
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 4}
            />
            
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            
            <Suspense fallback={null}>
                <Stage intensity={0.5} environment="city" adjustCamera={false}>
                    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.6}>
                        <HelmetModel url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb" />
                    </Float>
                </Stage>
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            </Suspense>

            <Environment preset="night" />
            <BakeShadows />
        </>
    );
}

// --- Navigation ---
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 px-6 py-4 flex justify-between items-center ${
            scrolled ? 'bg-dark/90 backdrop-blur-md border-b border-gold/20' : 'bg-transparent'
        }`}>
            <div className="flex items-center gap-2">
                <div className="p-2 border gold-border flex items-center justify-center rotate-45 group hover:bg-gold transition-all duration-500">
                    <Box className="-rotate-45 gold-text group-hover:text-dark" size={20} />
                </div>
                <span className="text-xl font-serif font-bold tracking-[0.3em] gold-text uppercase ml-2">Empire</span>
            </div>

            <div className="hidden lg:flex gap-12 items-center uppercase text-[10px] tracking-[0.4em] font-medium">
                {['Showcase', 'Process', 'Pricing'].map((item) => (
                    <a 
                        key={item} 
                        href={`#${item.toLowerCase()}`} 
                        className="opacity-60 hover:opacity-100 hover:gold-text transition-all"
                    >
                        {item}
                    </a>
                ))}
                <button className="bg-gold text-dark px-8 py-2.5 rounded-none font-bold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    Consult Project
                </button>
            </div>

            <button onClick={() => setMobileMenu(true)} className="lg:hidden gold-text p-2">
                <Menu size={24} />
            </button>

            <AnimatePresence>
                {mobileMenu && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed inset-0 bg-dark z-[60] p-10 flex flex-col gap-10"
                    >
                        <button onClick={() => setMobileMenu(false)} className="self-end gold-text">
                            <X size={32} />
                        </button>
                        <div className="flex flex-col gap-8 text-4xl font-serif italic text-white">
                            {['Showcase', 'Process', 'Pricing'].map(item => (
                                <a key={item} onClick={() => setMobileMenu(false)} href={`#${item.toLowerCase()}`} className="hover:gold-text transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// --- Hero Section ---
const Hero = () => (
    <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Canvas dpr={[1, 2]} shadows>
                <Scene />
            </Canvas>
        </div>

        <div className="container mx-auto px-6 z-10 pointer-events-none text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <span className="gold-text text-sm tracking-[0.6em] uppercase mb-10 block font-mono">Modernity Meets Tradition</span>
                <h1 className="text-7xl md:text-[8rem] mb-1 leading-none font-light italic font-serif">
                    Imperial <br />
                    <span className="font-bold not-italic tracking-tighter mix-blend-difference text-white">Aesthetics</span>
                </h1>
                <div className="w-1/3 h-[1px] bg-gold mx-auto my-12 opacity-30" />
                <p className="text-lg md:text-xl opacity-50 font-light max-w-2xl mx-auto leading-relaxed mb-12 mix-blend-exclusion text-white">
                    Defining the new era of architectural majesty. High-fidelity rendering for projects that demand nothing less than visceral perfection.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center pointer-events-auto">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gold text-dark px-12 py-5 uppercase text-[10px] tracking-[0.4em] font-black hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all"
                    >
                        Start Engagement
                    </motion.button>
                    <button className="border border-gold/40 gold-text px-12 py-5 uppercase text-[10px] tracking-[0.4em] hover:bg-gold hover:text-dark transition-all">
                        Archive 2024
                    </button>
                </div>
            </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[8px] tracking-[0.8em] font-mono uppercase text-white">Explore Below</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ChevronDown size={14} className="text-white" />
            </motion.div>
        </div>
    </section>
);

// --- Portfolio Section ---
const PortfolioGrid = () => {
    const projects = [
        { id: 1, title: 'Obsidian Penthouse', cat: 'Interior Design', img: 'https://images.unsplash.com/photo-1628592102751-ba83b0314276?auto=format&fit=crop&q=80&w=1200' },
        { id: 2, title: 'The Marble Cathedral', cat: 'Public Space', img: 'https://images.unsplash.com/photo-1541462608141-ad4d1f995502?auto=format&fit=crop&q=80&w=1200' },
        { id: 3, title: 'Golden Hour Villa', cat: 'Exterior Render', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200' },
        { id: 4, title: 'Crystal Pavilion', cat: 'Experimental', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200' }
    ];

    return (
        <section id="showcase" className="py-40 bg-dark/50 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-32">
                    <div className="max-w-3xl">
                        <span className="gold-text text-[10px] tracking-[0.6em] uppercase mb-4 block">The Collections</span>
                        <h2 className="text-6xl md:text-8xl mb-8 font-serif leading-tight text-white">Masterpieces in <br /><span className="gold-text italic">Digital Stone</span></h2>
                        <p className="opacity-50 text-xl font-light leading-relaxed text-white">
                            Every visualization is a calculated symphony of light and material science. We don't just render images; we architect emotions.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {projects.map((p) => (
                        <motion.div 
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group cursor-pointer h-[500px] border border-gold/20 p-4 bg-dark flex flex-col"
                        >
                            <div className="relative flex-1 overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${p.img})` }}
                                />
                                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-700" />
                            </div>
                            
                            <div className="pt-8 pb-4 flex justify-between items-end">
                                <div>
                                    <span className="text-[10px] tracking-[0.4em] uppercase gold-text block mb-2 font-mono">{p.cat}</span>
                                    <h3 className="text-3xl font-serif tracking-tight italic group-hover:not-italic transition-all text-white">{p.title}</h3>
                                </div>
                                <div className="w-12 h-12 flex items-center justify-center border border-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <ArrowRight size={20} className="gold-text" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Footer ---
const Footer = () => (
    <footer className="py-32 bg-black relative border-t-2 border-gold/20">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 border gold-border flex items-center justify-center rotate-45">
                            <Box className="-rotate-45 gold-text" size={20} />
                        </div>
                        <span className="text-2xl font-serif font-black tracking-widest gold-text uppercase">Empire</span>
                    </div>
                    <p className="text-xl font-light opacity-40 mb-12 leading-relaxed text-white">
                        Curating the digital legacy of global architecture. London | New York | Dubai
                    </p>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <p className="gold-text font-serif italic text-3xl mb-4">Ready for the Next Era?</p>
                    <button className="gold-text uppercase tracking-[0.4em] text-[10px] border-b border-gold/20 pb-2 hover:border-gold transition-all">
                        Request a Consultation
                    </button>
                </div>
            </div>
            <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-[8px] tracking-[0.4em] opacity-20 uppercase font-mono text-white">
                <span>&copy; {new Date().getFullYear()} EMPIRE VIZUALIZATION LTD.</span>
                <div className="flex gap-8">
                    <span>London</span>
                    <span>New York</span>
                    <span>Dubai</span>
                </div>
            </div>
        </div>
    </footer>
);

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-10 text-center">
                    <h1 className="text-4xl font-serif gold-text mb-4">Something went wrong</h1>
                    <p className="opacity-50 max-w-md">{this.state.error?.message || "An unexpected error occurred."}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-2 border gold-border gold-text hover:bg-gold hover:text-dark transition-all"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function App() {
    return (
        <ErrorBoundary>
            <div className="bg-dark min-h-screen text-white font-sans selection:bg-gold selection:text-dark">
                <Navbar />
                <Hero />
                <PortfolioGrid />
                <Footer />
            </div>
        </ErrorBoundary>
    );
}

