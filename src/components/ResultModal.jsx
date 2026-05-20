import clock from "../clock.png";
import fireworks from "../balloon.png";
import { SPACEBAR_GOAL_COUNT } from "../game/constants";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 100,
  clipPath: "circle(0% at center)",
  animation: "growCircle 0.6s ease-out forwards",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const innerStyle = {
  textAlign: "center",
  color: "white",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const buttonRowStyle = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "40px",
};

const primaryButtonStyle = {
  padding: "15px 30px",
  fontSize: "22px",
  fontFamily: "YOnepickTTF-Bold",
  backgroundColor: "#7CFF8D",
  color: "#1a1a1a",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "15px 30px",
  fontSize: "22px",
  fontFamily: "YOnepickTTF-Bold",
  backgroundColor: "transparent",
  color: "white",
  border: "2px solid white",
  borderRadius: "10px",
  cursor: "pointer",
};

const TimeOverHeading = ({ pressCount }) => (
  <div>
    <div style={rowStyle}>
      <img
        src={clock}
        alt="timer"
        style={{ width: "60px", height: "60px", marginRight: "10px" }}
      />
      <div style={{ fontSize: "60px", fontFamily: "YOnepickTTF-Bold" }}>
        시간 종료!
      </div>
    </div>
    <div
      style={{
        marginTop: "20px",
        fontSize: "24px",
        fontFamily: "YOnepickTTF-Bold",
        color: "#ccc",
      }}
    >
      {SPACEBAR_GOAL_COUNT}번 중 {pressCount}번까지 도달
    </div>
  </div>
);

const SuccessHeading = ({ finalClearTime }) => (
  <div>
    <div style={rowStyle}>
      <img
        src={fireworks}
        alt="fireworks"
        style={{ width: "60px", height: "60px", marginRight: "10px" }}
      />
      <div
        style={{
          color: "#7CFF8D",
          fontSize: "60px",
          fontFamily: "YOnepickTTF-Bold",
        }}
      >
        성공
      </div>
      <img
        src={fireworks}
        alt="fireworks"
        style={{ width: "60px", height: "60px", marginLeft: "10px" }}
      />
    </div>
    <div style={{ ...rowStyle, marginTop: "20px" }}>
      <img
        src={clock}
        alt="timer"
        style={{ width: "35px", height: "35px", marginRight: "10px" }}
      />
      <div
        style={{
          color: "#1e90ff",
          fontSize: "40px",
          fontFamily: "YOnepickTTF-Bold",
        }}
      >
        {finalClearTime?.toFixed(2)}초
      </div>
    </div>
  </div>
);

const ResultModal = ({
  isTimeOver,
  finalClearTime,
  pressCount,
  onSubmitRecord,
  onNextChallenger,
}) => (
  <div style={overlayStyle}>
    <div style={innerStyle}>
      {isTimeOver ? (
        <TimeOverHeading pressCount={pressCount} />
      ) : (
        <SuccessHeading finalClearTime={finalClearTime} />
      )}
      <div style={buttonRowStyle}>
        <button
          type="button"
          style={primaryButtonStyle}
          onClick={onSubmitRecord}
        >
          기록 남기기
        </button>
        <button
          type="button"
          style={secondaryButtonStyle}
          onClick={onNextChallenger}
        >
          처음으로 (R)
        </button>
      </div>
    </div>
  </div>
);

export default ResultModal;
