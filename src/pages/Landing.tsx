import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Shield, Activity, PieChart, ArrowRight } from 'lucide-react';

import { CreditCard } from '../components/shared-assets/credit-card/credit-card';

/* ------------------------------------------------------------------ */
/*  Features Data                                                      */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: <Shield strokeWidth={1} className="w-8 h-8" />,
    title: 'Bank-grade Security',
    description: 'Your financial data is encrypted and protected with enterprise-level security protocols. Total peace of mind.',
  },
  {
    icon: <Activity strokeWidth={1} className="w-8 h-8" />,
    title: 'Real-time Tracking',
    description: 'Every transaction is instantly categorized. Monitor your cash flow down to the precise millisecond.',
  },
  {
    icon: <PieChart strokeWidth={1} className="w-8 h-8" />,
    title: 'Intelligent Insights',
    description: 'Predictive analytics algorithms that forecast your financial trajectory and highlight savings opportunities.',
  },
];

/* ------------------------------------------------------------------ */
/*  Sleek Custom Cursor                                                */
/* ------------------------------------------------------------------ */
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white hidden md:block"
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: isHovering ? 4 : 1,
        opacity: isHovering ? 0.5 : 1
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Landing Page Masterpiece (Awwwards 3D Scroll Sequence)             */
/* ------------------------------------------------------------------ */
export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll over the entire 600vh container
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20, restDelta: 0.001 });

  // 1. Hero Animations (0 to 0.15)
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.12], [0, -100]);

  // 2. The 3D Credit Card Cinematic Journey
  // It starts low and tilted like a dramatic camera angle, rises to center, 
  // sweeps left and right to reveal features, and finally sinks for the CTA.
  const cardScale = useTransform(smoothProgress, [0, 0.15, 0.4, 0.6, 0.8, 1], [0.5, 1.1, 0.9, 0.9, 1.1, 0.4]);
  
  // X movement to make room for text on desktop
  const cardX = useTransform(smoothProgress, 
    [0, 0.15, 0.3, 0.5, 0.7, 0.9], 
    ['0%', '0%', '25vw', '-25vw', '25vw', '0%']
  );
  
  const cardY = useTransform(smoothProgress, [0, 0.15, 0.8, 1], ['40vh', '0vh', '0vh', '-10vh']);
  
  // Complex multi-axis 3D rotation (Different camera angles)
  const cardRotateX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [60, 5, -15, 15, 0, 50]);
  const cardRotateY = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 15, -25, 25, -15, 0]);
  const cardRotateZ = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [-30, -5, 10, -10, 5, -30]);

  // 3. Feature 1 Reveals (Left Side) - Active ~ 0.2 to 0.4
  const f1Opacity = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const f1Y = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [50, 0, 0, -50]);

  // 4. Feature 2 Reveals (Right Side) - Active ~ 0.4 to 0.6
  const f2Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const f2Y = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [50, 0, 0, -50]);

  // 5. Feature 3 Reveals (Left Side) - Active ~ 0.6 to 0.8
  const f3Opacity = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const f3Y = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.85], [50, 0, 0, -50]);

  // 6. CTA Finale (0.85 to 1.0)
  const ctaOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.85, 0.95], [50, 0]);

  return (
    <div className="bg-[#09090B] text-[#FAFAFA] selection:bg-[#2563EB] selection:text-white font-sans">
      <CustomCursor />

      {/* Global subtle noise texture for premium feel */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"></div>

      {/* Navigation (Ultra Minimal) */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-xl font-medium tracking-widest uppercase pointer-events-auto">Finsight.</div>
        <Link to="/app/" className="text-sm font-medium tracking-wide hover:text-[#2563EB] transition-colors pointer-events-auto">
          Log in
        </Link>
      </nav>

      {/* The 600vh Scroll Track that powers the entire sequence */}
      <div ref={containerRef} className="relative h-[600vh]">
        
        {/* The Sticky Viewport (Acts as the camera lens) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

          {/* 1. Hero Section */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 max-w-5xl mx-auto px-6 pointer-events-none"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[120px] font-medium leading-[0.9] tracking-tighter mb-8">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A1A1AA]">
                financial life.
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-[#A1A1AA] font-light max-w-2xl mx-auto tracking-wide">
              The definitive platform for modern wealth management.
            </p>
          </motion.div>

          {/* 2. The 3D Credit Card Anchor */}
          <motion.div
            style={{
              x: cardX,
              y: cardY,
              scale: cardScale,
              rotateX: cardRotateX,
              rotateY: cardRotateY,
              rotateZ: cardRotateZ,
              perspective: 2500,
              transformStyle: "preserve-3d"
            }}
            className="absolute z-20 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[#2563EB]/20 blur-[80px] rounded-[3rem] -z-10 translate-y-10 scale-90"></div>
            <CreditCard
              type="brand-dark"
              company="Finsight Black"
              cardNumber="4111 2222 3333 4444"
              cardHolder="VIP MEMBER"
              cardExpiration="12/30"
              width={500}
              className="shadow-[0_40px_80px_rgba(0,0,0,0.6)] rounded-2xl border border-white/10 backdrop-blur-md hidden md:block"
            />
            {/* Mobile Fallback */}
            <CreditCard
              type="brand-dark"
              company="Finsight Black"
              cardNumber="4111 2222 3333 4444"
              cardHolder="VIP MEMBER"
              cardExpiration="12/30"
              width={320}
              className="shadow-[0_40px_80px_rgba(0,0,0,0.6)] rounded-2xl border border-white/10 backdrop-blur-md block md:hidden"
            />
          </motion.div>

          {/* 3. Feature 1 (Left Side) */}
          <motion.div 
            style={{ opacity: f1Opacity, y: f1Y }}
            className="absolute left-[5%] md:left-[10%] top-[60%] md:top-1/2 -translate-y-1/2 w-[90%] md:w-[450px] z-30 pointer-events-none bg-[#09090B]/60 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-8 md:p-0 rounded-3xl border border-white/5 md:border-transparent"
          >
            <div className="text-[#A1A1AA] mb-6">{features[0].icon}</div>
            <h3 className="text-3xl md:text-5xl font-light mb-4 text-[#FAFAFA] tracking-tight">{features[0].title}</h3>
            <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed font-light">{features[0].description}</p>
          </motion.div>

          {/* 4. Feature 2 (Right Side) */}
          <motion.div 
            style={{ opacity: f2Opacity, y: f2Y }}
            className="absolute right-[5%] md:right-[10%] top-[60%] md:top-1/2 -translate-y-1/2 w-[90%] md:w-[450px] z-30 pointer-events-none md:text-right bg-[#09090B]/60 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-8 md:p-0 rounded-3xl border border-white/5 md:border-transparent"
          >
            <div className="text-[#A1A1AA] mb-6 flex md:justify-end">{features[1].icon}</div>
            <h3 className="text-3xl md:text-5xl font-light mb-4 text-[#FAFAFA] tracking-tight">{features[1].title}</h3>
            <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed font-light">{features[1].description}</p>
          </motion.div>

          {/* 5. Feature 3 (Left Side) */}
          <motion.div 
            style={{ opacity: f3Opacity, y: f3Y }}
            className="absolute left-[5%] md:left-[10%] top-[60%] md:top-1/2 -translate-y-1/2 w-[90%] md:w-[450px] z-30 pointer-events-none bg-[#09090B]/60 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-8 md:p-0 rounded-3xl border border-white/5 md:border-transparent"
          >
            <div className="text-[#A1A1AA] mb-6">{features[2].icon}</div>
            <h3 className="text-3xl md:text-5xl font-light mb-4 text-[#FAFAFA] tracking-tight">{features[2].title}</h3>
            <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed font-light">{features[2].description}</p>
          </motion.div>

          {/* 6. Finale CTA */}
          <motion.div 
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 pointer-events-none"
          >
            <h2 className="text-5xl md:text-8xl font-medium tracking-tight mb-16 max-w-4xl px-4 text-[#FAFAFA]">
              Begin your journey.
            </h2>
            <Link
              to="/app/"
              className="group pointer-events-auto relative inline-flex items-center justify-center px-10 md:px-12 py-5 md:py-6 bg-white text-[#09090B] rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-4 font-medium text-lg tracking-wide">
                Launch Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[#2563EB] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,0.1,0.25,1] z-0"></div>
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-4 font-medium text-lg tracking-wide text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Launch Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
