import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  originX: number;
  originY: number;
}

interface TrailNode {
  x: number;
  y: number;
  alpha: number;
}

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let localParticles: Particle[] = [];
    let trail: TrailNode[] = [];
    const MAX_PARTICLES = 200;
    const MAX_TRAIL_LENGTH = 20;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      init();
    };

    const init = () => {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 15000) + 50,
        MAX_PARTICLES
      );
      localParticles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        localParticles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = resolvedTheme === 'dark';

      /** 
       * ADJUSTMENTS FOR LIGHT MODE:
       * 1. Switched from Slate Gray to a richer Teal (13, 148, 136) to match the brand.
       * 2. Increased Opacity: Lines increased from 0.08 to 0.15.
       * 3. Nodes: Increased from 0.4 to 0.5 for better visibility.
       */
      const nodeColor = isDark 
        ? 'rgba(20, 184, 166, 0.6)' 
        : 'rgba(13, 148, 136, 0.5)'; // More vibrant teal for light mode
      
      const lineColor = isDark 
        ? 'rgba(20, 184, 166, 0.15)' 
        : 'rgba(13, 148, 136, 0.15)'; // Increased opacity for light mode
      
      const trailColor = isDark 
        ? '20, 184, 166' 
        : '13, 148, 136';

      // Draw Mouse Trail
      trail.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4 * node.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${trailColor}, ${node.alpha * (isDark ? 0.3 : 0.4)})`;
        ctx.fill();
        node.alpha -= 0.025;
      });
      trail = trail.filter(node => node.alpha > 0);

      // Draw Network Particles
      localParticles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const force = (120 - distance) / 120;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 5;
          p.y -= Math.sin(angle) * force * 5;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < localParticles.length; j++) {
          const p2 = localParticles[j];
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            // Slightly thicker lines in light mode to make them visible
            ctx.lineWidth = isDark ? 0.5 : 0.8; 
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (trail.length === 0 || Math.sqrt(Math.pow(trail[trail.length - 1].x - e.clientX, 2) + Math.pow(trail[trail.length - 1].y - e.clientY, 2)) > 10) {
        trail.push({ x: e.clientX, y: e.clientY, alpha: 1.0 });
        if (trail.length > MAX_TRAIL_LENGTH) trail.shift();
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        localParticles.push({
          x: e.clientX,
          y: e.clientY,
          originX: e.clientX,
          originY: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 2 + 1,
        });
      }
      if (localParticles.length > MAX_PARTICLES) {
        localParticles.splice(0, localParticles.length - MAX_PARTICLES);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      /* Changed opacity: 60% in dark mode, but 80% in light mode for better presence */
      className="absolute inset-0 -z-10 w-full h-full pointer-events-none opacity-80 dark:opacity-60 transition-opacity duration-1000"
    />
  );
};