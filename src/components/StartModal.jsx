import { useEffect } from "react";
import { PLAYER_ID_LENGTH } from "../game/constants";

const ID_PATTERN = /^[A-Z0-9]+$/;

const validateId = (name) => {
  if (name.length !== PLAYER_ID_LENGTH)
    return `${PLAYER_ID_LENGTH}자리의 id를 입력해주세요.`;
  if (!ID_PATTERN.test(name)) return "영문/숫자만 입력해주세요.";
  return "";
};

const sanitize = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

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

const StartModal = ({ playerId, nameError, onIdChange, onSubmit }) => {
  useEffect(() => {
    const t = setTimeout(() => {
      const input = document.querySelector('input[name="name"]');
      if (input) input.focus();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    const next = sanitize(e.target.value).slice(0, PLAYER_ID_LENGTH);
    onIdChange(next, validateId(next));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerId || nameError) return;
    onSubmit();
  };

  return (
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
          <span style={{ color: "lightgreen" }}>
            스페이스바를 연타해서
          </span>{" "}
          그린이의 목을 길~게 늘려
          <br />
          세종대학교 시계탑 꼭대기의 종을 울려주세요!
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <input
                type="text"
                name="name"
                value={playerId}
                onChange={handleChange}
                autoComplete="off"
                required
                style={{
                  width: "300px",
                  height: "50px",
                  fontSize: "40px",
                  fontFamily: "YOnepickTTF-Bold",
                }}
              />
              <button
                type="submit"
                disabled={!!nameError || !playerId}
                style={{ width: "100px", height: "55px" }}
              >
                입력
              </button>
            </div>
            <div style={{ height: "20px", marginTop: "5px" }}>
              {nameError && (
                <div style={{ color: "red", fontSize: "14px" }}>
                  {nameError}
                </div>
              )}
            </div>
          </form>
          <br />
          <span style={{ fontSize: "18px", color: "#ccc" }}>
            스페이스바를 눌러 게임을 시작하세요.
          </span>
        </div>
      </div>
    </div>
  );
};

export default StartModal;
