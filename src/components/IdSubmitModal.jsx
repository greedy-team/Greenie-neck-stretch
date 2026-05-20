import { useEffect, useRef, useState } from "react";
import { PLAYER_ID_LENGTH } from "../game/constants";
import { validateUser } from "../game/api";

const ID_PATTERN = /^[A-Z0-9]+$/;
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
  alignItems: "center",
  justifyContent: "center",
};

const panelStyle = {
  position: "relative",
  width: "80%",
  maxWidth: "700px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "2px solid white",
  borderRadius: "20px",
  padding: "100px 30px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  color: "white",
};

const titleStyle = {
  position: "absolute",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "40px",
  fontWeight: "bold",
  color: "lightgreen",
  fontFamily: "YOnepickTTF-Bold",
};

const descriptionStyle = {
  fontSize: "22px",
  fontFamily: "YOnepickTTF-Bold",
  marginBottom: "30px",
};

const inputStyle = {
  width: "300px",
  height: "60px",
  fontSize: "44px",
  fontFamily: "YOnepickTTF-Bold",
  textAlign: "center",
  letterSpacing: "8px",
};

const statusStyle = {
  marginTop: "20px",
  height: "30px",
  fontSize: "22px",
  fontFamily: "YOnepickTTF-Bold",
};

const buttonRowStyle = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "30px",
};

const primaryButtonStyle = {
  padding: "12px 30px",
  fontSize: "22px",
  fontFamily: "YOnepickTTF-Bold",
  backgroundColor: "#7CFF8D",
  color: "#1a1a1a",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const disabledButtonStyle = {
  ...primaryButtonStyle,
  backgroundColor: "#444",
  color: "#999",
  cursor: "not-allowed",
};

const secondaryButtonStyle = {
  padding: "12px 30px",
  fontSize: "22px",
  fontFamily: "YOnepickTTF-Bold",
  backgroundColor: "transparent",
  color: "white",
  border: "2px solid white",
  borderRadius: "10px",
  cursor: "pointer",
};

const IdSubmitModal = ({ submitStatus, onSubmit, onCancel }) => {
  const [playerId, setPlayerId] = useState("");
  const [validateState, setValidateState] = useState({ state: "idle" });
  const requestIdRef = useRef(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (playerId.length !== PLAYER_ID_LENGTH || !ID_PATTERN.test(playerId)) {
      setValidateState({ state: "idle" });
      return;
    }
    const reqId = ++requestIdRef.current;
    setValidateState({ state: "pending" });
    validateUser(playerId).then((res) => {
      if (reqId !== requestIdRef.current) return;
      if (res.ok) {
        setValidateState({ state: "success", user: res.user });
      } else {
        setValidateState({ state: "failed" });
      }
    });
  }, [playerId]);

  const handleChange = (e) => {
    setPlayerId(sanitize(e.target.value).slice(0, PLAYER_ID_LENGTH));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateState.state !== "success") return;
    if (submitStatus?.state === "pending") return;
    onSubmit(playerId);
  };

  const isSubmitting = submitStatus?.state === "pending";
  const canSubmit = validateState.state === "success" && !isSubmitting;

  const renderStatus = () => {
    if (isSubmitting) {
      return <div style={{ ...statusStyle, color: "#ccc" }}>전송 중...</div>;
    }
    if (submitStatus?.state === "failed") {
      return (
        <div style={{ ...statusStyle, color: "#ff6b6b" }}>
          전송에 실패했어요. 잠시 후 다시 시도해주세요.
        </div>
      );
    }
    if (validateState.state === "pending") {
      return <div style={{ ...statusStyle, color: "#ccc" }}>확인 중...</div>;
    }
    if (validateState.state === "success") {
      return (
        <div style={{ ...statusStyle, color: "lightgreen" }}>
          {validateState.user.nickname} ({validateState.user.userId})
        </div>
      );
    }
    if (validateState.state === "failed") {
      return (
        <div style={{ ...statusStyle, color: "#ff6b6b" }}>
          다시 확인해주세요
        </div>
      );
    }
    return <div style={statusStyle} />;
  };

  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        <div style={titleStyle}>기록 남기기</div>
        <div style={descriptionStyle}>
          부스에서 받은 4자리 ID를 입력해주세요
        </div>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={playerId}
            onChange={handleChange}
            autoComplete="off"
            maxLength={PLAYER_ID_LENGTH}
            style={inputStyle}
          />
          {renderStatus()}
          <div style={buttonRowStyle}>
            <button
              type="submit"
              disabled={!canSubmit}
              style={canSubmit ? primaryButtonStyle : disabledButtonStyle}
            >
              등록
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={secondaryButtonStyle}
              disabled={isSubmitting}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdSubmitModal;
