import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Users, BarChart4, Trophy, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  
  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(47, 182, 252, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(47, 182, 252, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <motion.div style={{ y: y1 }} className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-[#2FB6FC]/10 blur-[100px]"></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">
              {t("about.title")}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">{t("about.mission.title")}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t("about.mission.text")}
              </p>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white pt-4">{t("about.approach.title")}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t("about.approach.text")}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">10K+</div>
                    <div className="text-gray-400 text-sm">{t("about.stats.users")}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC]">
                    <BarChart4 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">$50M+</div>
                    <div className="text-gray-400 text-sm">{t("about.stats.volume")}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC]">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">5+</div>
                    <div className="text-gray-400 text-sm">{t("about.stats.experience")}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">30+</div>
                    <div className="text-gray-400 text-sm">{t("about.stats.exchanges")}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#2FB6FC]/20">
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt={t("about.image.alt")}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="text-white font-medium text-lg md:text-xl mb-2">
                  {t("about.image.title")}
                </p>
                <p className="text-gray-300 text-sm md:text-base max-w-md">
                  {t("about.image.text")}
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#2FB6FC]/10 blur-[80px] rounded-full"></div>
          </motion.div>
        </div>
        
        {/* Testimonials section with carousel */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">
              {t("testimonials.title")}
            </span>
          </h2>
          
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}

// Testimonial data - now using translation keys
const testimonials = [
  {
    quoteKey: "testimonials.quotes.1",
    nameKey: "testimonials.names.1",
    titleKey: "testimonials.titles.1",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quoteKey: "testimonials.quotes.2",
    nameKey: "testimonials.names.2",
    titleKey: "testimonials.titles.2",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quoteKey: "testimonials.quotes.3",
    nameKey: "testimonials.names.3",
    titleKey: "testimonials.titles.3",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    quoteKey: "testimonials.quotes.4",
    nameKey: "testimonials.names.4",
    titleKey: "testimonials.titles.4",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];

// Testimonial carousel component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const slideVariants = {
    enter: {
      x: 1000,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -1000,
      opacity: 0,
    },
  };

  return (
    <div className="relative">
      <div className="overflow-hidden relative rounded-2xl">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            className="bg-[#111]/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8"
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#2FB6FC]/10 rounded-full flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={t(testimonials[currentIndex].nameKey)}
                  className="w-full h-full object-cover rounded-full"
                />
            </div>
            
            <div>
              <blockquote className="text-gray-300 text-lg md:text-xl italic font-light">
                  "{t(testimonials[currentIndex].quoteKey)}"
              </blockquote>
              <div className="mt-4">
                  <p className="text-white font-medium">{t(testimonials[currentIndex].nameKey)}</p>
                  <p className="text-gray-400 text-sm">{t(testimonials[currentIndex].titleKey)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
          </div>

      {/* Navigation buttons */}
      <button 
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-surface-light/80 backdrop-blur-md border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition-colors z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button 
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-surface-light/80 backdrop-blur-md border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition-colors z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {/* Indicator dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#2FB6FC]" : "bg-gray-700 hover:bg-gray-600"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 