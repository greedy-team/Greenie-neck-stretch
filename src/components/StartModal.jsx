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
  justifyContent: "center",
  alignItems: "center",
};

const panelStyle = {
  position: "relative",
  width: "80%",
  height: "70%",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "2px solid white",
  borderRadius: "20px",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
};

const titleStyle = {
  position: "absolute",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "50px",
  fontWeight: "bold",
  color: "lightgreen",
  fontFamily: "YOnepickTTF-Bold",
};

const bodyStyle = {
  marginTop: "80px",
  fontSize: "24px",
  lineHeight: "1.6",
  fontFamily: "YOnepickTTF-Bold",
};

const StartModal = () => (
  <div style={overlayStyle}>
    <div style={panelStyle}>
      <div style={titleStyle}>그린이 목늘리기!</div>
      <div style={bodyStyle}>
        <br />
        세종대학교 시계탑 안에
        <br />
        진짜 기린이 살고 있다는 소문, 들어봤나요?
        <br />
        <br />
        <span style={{ color: "lightgreen" }}>스페이스바를 연타해서</span>{" "}
        그린이의 목을 길~게 늘려
        <br />
        세종대학교 시계탑 꼭대기의 종을 울려주세요!
        <br />
        <br />
        <span style={{ fontSize: "18px", color: "#ccc" }}>
          15초 안에 100번 입력하면 성공!
        </span>
        <br />
        <br />
        <span style={{ fontSize: "22px" }}>
          스페이스바를 눌러 게임을 시작하세요.
        </span>
      </div>
    </div>
  </div>
);

export default StartModal;
