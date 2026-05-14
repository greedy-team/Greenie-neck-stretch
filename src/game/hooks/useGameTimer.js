import { useEffect, useRef, useState } from "react";
import { GAME_DURATION_SEC } from "../constants";

export const useGameTimer = () => {
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(GAME_DURATION_SEC);
  const [remainingTime, setRemainingTime] = useState(GAME_DURATION_SEC);

  useEffect(() => {
    remainingTimeRef.current = remainingTime;
  }, [remainingTime]);

  useEffect(() => {
    let frameId;
    const tick = () => {
      if (startTimeRef.current !== null) {
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        setRemainingTime(Math.max(GAME_DURATION_SEC - elapsed, 0));
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const start = () => {
    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now();
    }
  };

  const stop = () => {
    startTimeRef.current = null;
  };

  const reset = () => {
    startTimeRef.current = null;
    setRemainingTime(GAME_DURATION_SEC);
  };

  return { remainingTime, remainingTimeRef, startTimeRef, start, stop, reset };
};
