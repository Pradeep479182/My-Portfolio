import React, { useRef } from "react";
import "../styles/bubble.css";

type Bubble = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

export default function BubbleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbles: Bubble[] = [];

  // 👇 Only 10 small bubbles
  for (let i = 0; i < 10; i++) {
    bubbles.push({
      left: Math.random() * 100,
      size: 6 + Math.random() * 10,      // 🔥 smaller size
      duration: 12 + Math.random() * 10, // 🔥 slower
      delay: Math.random() * 8,
      opacity: 0.2 + Math.random() * 0.3,
    });
  }

  return (
    <div ref={containerRef} className="bubble-container">
      {bubbles.map((b, index) => (
        <div
          key={index}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
