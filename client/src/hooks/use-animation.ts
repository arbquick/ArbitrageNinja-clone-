import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, Variant, Variants } from 'framer-motion';
import { useEffect } from 'react';

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay: number = 0): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.7,
        delay
      }
    }
  };
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

export const pulse = (scale: number = 1.05, duration: number = 1.5): Variants => {
  return {
    initial: { scale: 1 },
    animate: {
      scale: [1, scale, 1],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
};

export const floatAnimation = (y: number = 10, duration: number = 2): Variants => {
  return {
    initial: { y: 0 },
    animate: {
      y: [-y, 0, -y],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
};

export const glow = (
  initialColor: string = "rgba(99, 102, 241, 0.3)",
  glowColor: string = "rgba(99, 102, 241, 0.8)",
  duration: number = 2
): Variants => {
  return {
    initial: { boxShadow: `0 0 10px ${initialColor}` },
    animate: {
      boxShadow: [`0 0 10px ${initialColor}`, `0 0 20px ${glowColor}`, `0 0 10px ${initialColor}`],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
};

export const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};