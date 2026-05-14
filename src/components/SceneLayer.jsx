import brick from "../brick.png";
import changeCloud from "../changeCloud.png";
import bell from "../bell.png";
import { SCENE_OBJECTS } from "../game/sceneObjects";
import {
  BG_TRANSITION_SEC,
  TOWER_HEIGHT,
  TOWER_TRANSITION_SEC,
  TOWER_WIDTH_RATIO,
  SCENE_TRANSITION,
} from "../game/constants";

export const Background = ({ offset, height }) => (
  <div
    style={{
      position: "absolute",
      top: `-${offset}px`,
      width: "100%",
      height: `${height + window.innerHeight}px`,
      background:
        "linear-gradient(to bottom, #000000, #1a1a80, #3399ff, #66ccff, #99cc66)",
      transition: `top ${BG_TRANSITION_SEC}s ease-out`,
    }}
  />
);

export const Tower = ({ offset }) => (
  <div
    style={{
      position: "absolute",
      top: `-${offset}px`,
      left: "50%",
      transform: "translateX(-50%)",
      width: `${TOWER_WIDTH_RATIO}%`,
      height: `${TOWER_HEIGHT}px`,
      backgroundImage: `url(${brick})`,
      backgroundRepeat: "repeat-y",
      backgroundSize: "100% auto",
      transition: `all ${TOWER_TRANSITION_SEC}s ease`,
      zIndex: 10,
    }}
  />
);

export const ChangeCloud = ({ offset }) => (
  <div
    style={{
      position: "fixed",
      top: `${5100 - offset}px`,
      left: "50%",
      transform: "translateX(-50%)",
      transition: SCENE_TRANSITION,
      zIndex: 25,
    }}
  >
    <img
      src={changeCloud}
      alt="cloud"
      style={{ width: "1000px", height: "auto" }}
    />
  </div>
);

export const Bell = ({ offset }) => (
  <div
    style={{
      position: "fixed",
      top: `-${100 + offset}px`,
      left: "50%",
      transform: "translateX(-50%)",
      transition: SCENE_TRANSITION,
      zIndex: 27,
    }}
  >
    <img src={bell} alt="bell" style={{ width: "700px", height: "auto" }} />
  </div>
);

const sidePosition = (side) =>
  side === "left"
    ? { left: "20%", transform: "translateX(-50%)" }
    : { right: "0%" };

export const SceneObjects = ({ offset }) => (
  <>
    {SCENE_OBJECTS.map((obj, i) => (
      <div
        key={i}
        style={{
          position: "fixed",
          top: `${obj.topOffset - offset}px`,
          transition: SCENE_TRANSITION,
          zIndex: 7,
          ...sidePosition(obj.side),
        }}
      >
        <img
          src={obj.src}
          alt={obj.alt}
          style={{ width: `${obj.width}px`, height: "auto" }}
        />
      </div>
    ))}
  </>
);
