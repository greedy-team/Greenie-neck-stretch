import clock from "../clock.png";
import fireworks from "../balloon.png";
import trophy from "../trophy1.png";
import RankingTable from "./RankingTable";

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
};

const innerStyle = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  color: "white",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const TimeOverHeading = () => (
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
        style={{ width: "60px", height: "60px", marginRight: "10px" }}
      />
    </div>
    <div style={rowStyle}>
      <img
        src={clock}
        alt="timer"
        style={{ width: "35px", height: "35px", marginRight: "10px" }}
      />
      <div
        style={{
          color: "#1e90ff",
          fontSize: "35px",
          fontFamily: "YOnepickTTF-Bold",
        }}
      >
        {finalClearTime?.toFixed(2)}초
      </div>
      <img
        src={clock}
        alt="timer"
        style={{ width: "40px", height: "40px", marginRight: "10px" }}
      />
    </div>
  </div>
);

const RankingHeading = () => (
  <div style={rowStyle}>
    <img src={trophy} alt="trophy" style={{ width: "35px", height: "35px" }} />
    <h2
      style={{
        fontSize: "40px",
        fontWeight: "bold",
        color: "#FFC107",
        fontFamily: "YOnepickTTF-Bold",
        margin: "20px",
      }}
    >
      랭킹
    </h2>
    <img src={trophy} alt="trophy" style={{ width: "35px", height: "35px" }} />
  </div>
);

const GameOverModal = ({ isTimeOver, finalClearTime, ranking }) => (
  <div style={overlayStyle}>
    <div style={innerStyle}>
      {isTimeOver ? (
        <TimeOverHeading />
      ) : (
        <SuccessHeading finalClearTime={finalClearTime} />
      )}
      <RankingHeading />
      <RankingTable ranking={ranking} />
      <div
        style={{
          marginTop: "20px",
          color: "white",
          fontSize: "25px",
          fontFamily: "YOnepickTTF-Bold",
        }}
      >
        R키를 눌러 처음으로
      </div>
    </div>
  </div>
);

export default GameOverModal;
