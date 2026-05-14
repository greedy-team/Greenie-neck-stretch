import { useEffect } from "react";
import { SHAKE_DURATION_MS, SHAKE_TICK_MS } from "../constants";

export const useScreenShake = ({ active, targetId }) => {
  useEffect(() => {
    if (!active) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    const intervalId = setInterval(() => {
      const x = Math.random() * 30 - 15;
      const y = Math.random() * 30 - 15;
      const z = Math.random() * 6 - 3;
      target.style.transform = `translate(${x}px, ${y}px) rotateZ(${z}deg)`;
    }, SHAKE_TICK_MS);

    const stopId = setTimeout(() => {
      clearInterval(intervalId);
      target.style.transform = "none";
    }, SHAKE_DURATION_MS);

    return () => {
      clearInterval(intervalId);
      clearTimeout(stopId);
      target.style.transform = "none";
    };
  }, [active, targetId]);
};
