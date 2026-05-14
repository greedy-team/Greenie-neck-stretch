import { useEffect, useRef, useState } from "react";
import { PARTICLE_LIFETIME_STEP, PARTICLE_MAX_COUNT } from "../constants";

const pickXOutsideCenter = (width) => {
  const forbiddenStart = width * 0.3;
  const forbiddenEnd = width * 0.7;
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    if (x < forbiddenStart || x > forbiddenEnd) return x;
  }
  return Math.random() < 0.5
    ? Math.random() * forbiddenStart
    : forbiddenEnd + Math.random() * (width - forbiddenEnd);
};

export const useParticles = () => {
  const idCounter = useRef(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let frameId;
    const tick = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, lifetime: p.lifetime + PARTICLE_LIFETIME_STEP }))
          .filter((p) => p.lifetime < 1),
      );
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const spawn = (count) => {
    const width = window.innerWidth;
    const yMax = count === 1 ? 300 : count === 2 ? 400 : 600;

    const created = Array.from({ length: count }).map(() => ({
      id: idCounter.current++,
      x: pickXOutsideCenter(width),
      y: 100 + Math.random() * (yMax - 100),
      angle: Math.random() * 360,
      lifetime: 0,
    }));

    setParticles((prev) => [...prev, ...created].slice(-PARTICLE_MAX_COUNT));
  };

  return { particles, spawn };
};
