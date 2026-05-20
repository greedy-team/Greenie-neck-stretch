import { useEffect, useRef } from "react";

const isUserTyping = (target) => {
  const tag = target.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || target.isContentEditable;
};

export const useKeyboardInput = ({
  gameState,
  onPressSpace,
  onRestart,
}) => {
  const isKeyDownRef = useRef(false);
  const pressRef = useRef(onPressSpace);
  const restartRef = useRef(onRestart);

  useEffect(() => {
    pressRef.current = onPressSpace;
    restartRef.current = onRestart;
  });

  useEffect(() => {
    const acceptsSpace = gameState === "start" || gameState === "playing";
    const acceptsRestart =
      gameState === "playing" ||
      gameState === "result" ||
      gameState === "ranking";

    const handleKeyDown = (e) => {
      if (isUserTyping(e.target)) return;

      if (e.code === "Space" && acceptsSpace && !isKeyDownRef.current) {
        isKeyDownRef.current = true;
        pressRef.current();
      }

      if ((e.key === "r" || e.key === "R") && acceptsRestart) {
        restartRef.current();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space") isKeyDownRef.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);
};
