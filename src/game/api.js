import { GAME_NAME } from "./constants";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const jsonHeaders = { "Content-Type": "application/json" };

export const submitScore = async (userId, score) => {
  const payload = {
    gameName: GAME_NAME,
    userId,
    score: Number(score.toFixed(5)),
    apiKey: API_KEY,
  };

  try {
    const res = await fetch(`${BASE_URL}/api/result`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`❌ 점수 전송 실패: HTTP ${res.status}`, body);
      return { ok: false, status: res.status };
    }
    console.log("✅ 점수 전송 성공");
    return { ok: true };
  } catch (e) {
    console.error("❌ 점수 전송 오류:", e);
    return { ok: false, status: 0, error: e };
  }
};

export const validateUser = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/${encodeURIComponent(userId)}`, {
      method: "GET",
    });
    if (!res.ok) return { ok: false, status: res.status };
    const data = await res.json();
    return { ok: true, user: data };
  } catch (e) {
    return { ok: false, status: 0, error: e };
  }
};

export const fetchRanking = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/leader-board/${GAME_NAME}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!data || !Array.isArray(data.rankings)) {
      console.error("❌ 랭킹 데이터 형식 오류:", data);
      return [];
    }
    return data.rankings;
  } catch (err) {
    console.error("랭킹 불러오기 실패:", err);
    return [];
  }
};
