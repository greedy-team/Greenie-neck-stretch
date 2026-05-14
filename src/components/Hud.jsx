import { SPACEBAR_GOAL_COUNT } from "../game/constants";

const Timer = ({ remainingTime }) => {
  const isCritical = remainingTime <= 5;
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        color: isCritical ? "red" : "white",
        fontSize: isCritical ? "60px" : "45px",
        zIndex: 30,
        fontFamily: "LOTTERIACHAB",
      }}
    >
      {remainingTime.toFixed(2)}
    </div>
  );
};

const Gauge = ({ pressCount }) => {
  const fillPercent = (pressCount / SPACEBAR_GOAL_COUNT) * 100;

  return (
    <div
      style={{
        position: "fixed",
        right: "40px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "30px",
        height: "80%",
        backgroundColor: "#000",
        borderRadius: "15px",
        overflow: "hidden",
        zIndex: 50,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          fontSize: "20px",
          color: "white",
          margin: "8px 0",
          zIndex: 25,
        }}
      >
        🔔
      </div>
      <div style={{ flexGrow: 1, position: "relative", width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: `${fillPercent}%`,
            backgroundColor: "#00ff00",
            transition: "height 0.2s ease",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />
      </div>
    </div>
  );
};

const Hud = ({ remainingTime, pressCount }) => (
  <>
    <Timer remainingTime={remainingTime} />
    <Gauge pressCount={pressCount} />
  </>
);

export default Hud;
