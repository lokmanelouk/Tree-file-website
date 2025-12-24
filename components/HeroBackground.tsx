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
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any existing transforms
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
      const nodeColor = isDark ? 'rgba(20, 184, 166, 0.6)' : 'rgba(71, 85, 105, 0.4)';
      const lineColor = isDark ? 'rgba(20, 184, 166, 0.15)' : 'rgba(71, 85, 105, 0.08)';
      const trailColor = isDark ? '20, 184, 166' : '71, 85, 105';

      // Draw Mouse Trail
      trail.forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4 * node.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${trailColor}, ${node.alpha * 0.3})`;
        ctx.fill();
        
        // Update alpha for next frame
        node.alpha -= 0.025;
      });
      trail = trail.filter(node => node.alpha > 0);

      // Draw Network Particles
      localParticles.forEach((p, i) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const force = (120 - distance) / 120;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 5;
          p.y -= Math.sin(angle) * force * 5;
        }

        // Boundary check
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < localParticles.length; j++) {
          const p2 = localParticles[j];
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Add node to trail
      if (trail.length === 0 || Math.sqrt(Math.pow(trail[trail.length - 1].x - e.clientX, 2) + Math.pow(trail[trail.length - 1].y - e.clientY, 2)) > 10) {
        trail.push({ x: e.clientX, y: e.clientY, alpha: 1.0 });
        if (trail.length > MAX_TRAIL_LENGTH) {
          trail.shift();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn 5 new particles
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
      
      // Ensure the total count doesn't exceed MAX_PARTICLES
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
      className="absolute inset-0 -z-10 w-full h-full pointer-events-none opacity-60 transition-opacity duration-1000"
    />
  );
};