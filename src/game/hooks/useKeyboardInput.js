import { useEffect, useRef } from "react";

const isUserTyping = (target) => {
  const tag = target.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || target.isContentEditable;
};

export const useKeyboardInput = ({
  isGameOver,
  isStartModalOpen,
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
    const handleKeyDown = (e) => {
      const typing = isUserTyping(e.target);

      if ((e.key === "r" || e.key === "R" || e.key === "ㄱ") && typing) return;

      if (
        e.code === "Space" &&
        !isKeyDownRef.current &&
        !isGameOver &&
        !isStartModalOpen
      ) {
        isKeyDownRef.current = true;
        pressRef.current();
      }

      if ((e.key === "r" || e.key === "R") && !isStartModalOpen) {
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
  }, [isGameOver, isStartModalOpen]);
};
