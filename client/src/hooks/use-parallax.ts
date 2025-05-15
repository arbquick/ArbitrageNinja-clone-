import { useState, useEffect } from "react";

interface ParallaxHook {
  scrollY: number;
  scrollX: number;
}

export function useParallax(): ParallaxHook {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollX(window.scrollX);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial values
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollY, scrollX };
}
