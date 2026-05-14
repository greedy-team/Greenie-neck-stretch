import { useEffect, useState } from "react";
import giraffePartyA from "../party1.png";
import giraffePartyB from "../party2.png";
import giraffeSpaceA from "../space1.png";
import giraffeSpaceB from "../space2.png";
import {
  GIRAFFE_FRAME_INTERVAL_MS,
  GIRAFFE_TRANSITION_SEC,
  GIRAFFE_WIDTH,
} from "../game/constants";

const useFrameToggle = (intervalMs) => {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f === 0 ? 1 : 0)),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [intervalMs]);
  return frame;
};

const pickSprite = (pressCount, frame) => {
  if (pressCount > 50) return frame === 0 ? giraffeSpaceA : giraffeSpaceB;
  return frame === 0 ? giraffePartyA : giraffePartyB;
};

const GiraffeSprite = ({ neckOffset, pressCount }) => {
  const frame = useFrameToggle(GIRAFFE_FRAME_INTERVAL_MS);

  return (
    <div
      style={{
        position: "fixed",
        bottom: `${neckOffset}px`,
        transition: `bottom ${GIRAFFE_TRANSITION_SEC}s cubic-bezier(0.25, 1, 0.5, 1)`,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
      }}
    >
      <img
        src={pickSprite(pressCount, frame)}
        alt="Giraffe"
        style={{ width: `${GIRAFFE_WIDTH}px`, height: "auto" }}
      />
    </div>
  );
};

export default GiraffeSprite;
