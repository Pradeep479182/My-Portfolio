import React, { useEffect, useRef } from "react";
import "../styles/waterLiquidBackground.css";

export default function WaterLiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let scrollY = 0;
  let scrollSpeed = 0;
  let lastScrollY = 0;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Water color
      ctx.fillStyle = "rgba(34, 211, 238, 0.18)";
      ctx.beginPath();

      ctx.moveTo(0, canvas.height);

      const waveHeight = 40 + scrollSpeed * 2; // 👈 BIG reaction
      const waveFrequency = 0.015;

      for (let x = 0; x <= canvas.width; x += 15) {
        const y =
          canvas.height / 2 +
          Math.sin(x * waveFrequency + time) * waveHeight +
          Math.sin(time * 2 + scrollY * 0.02) * 20;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Smooth slow down
      scrollSpeed *= 0.9;
      time += 0.03;

      requestAnimationFrame(draw);
    };

    draw();

    const onScroll = () => {
      scrollY = window.scrollY;
      scrollSpeed = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="water-liquid-canvas" />;
}
