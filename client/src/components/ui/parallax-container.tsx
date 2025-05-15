import React, { ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/use-parallax";

export interface ParallaxLayer {
  zIndex: number;
  translateYMultiplier: number;
  children: ReactNode;
  className?: string;
}

interface ParallaxContainerProps {
  className?: string;
  layers: ParallaxLayer[];
}

export function ParallaxContainer({ className, layers }: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useParallax();
  const [intersectionRatio, setIntersectionRatio] = useState(1);

  // Only apply parallax effect when container is in view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersectionRatio(entry.intersectionRatio);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("parallax-section relative h-[100vh] overflow-hidden z-10", className)}
    >
      {layers.map((layer, index) => (
        <div
          key={index}
          className={cn(
            "parallax-layer absolute w-full h-full top-0 left-0",
            layer.className
          )}
          style={{
            zIndex: layer.zIndex,
            transform: `translateY(${
              scrollY * layer.translateYMultiplier * intersectionRatio
            }px)`,
          }}
        >
          {layer.children}
        </div>
      ))}
    </div>
  );
}
