import { useEffect, useRef, useState } from "react";
import goalBell from "./Goal_Bell.mp3";
import "./App.css";

import {
  BG_MAX_OFFSET,
  BG_MIN_OFFSET,
  BG_STEP_PER_PRESS,
  GAME_DURATION_SEC,
  NECK_INITIAL_OFFSET,
  NECK_MAX_OFFSET,
  NECK_MIN_OFFSET,
  NECK_STEP,
  PARTICLE_STAGE_1_START,
  PARTICLE_STAGE_2_START,
  PARTICLE_STAGE_3_START,
  RANKING_TOP_N,
  SPACEBAR_GOAL_COUNT,
} from "./game/constants";
import { fetchRanking, submitScore } from "./game/api";
import { useGameTimer } from "./game/hooks/useGameTimer";
import { useParticles } from "./game/hooks/useParticles";
import { useKeyboardInput } from "./game/hooks/useKeyboardInput";
import { useScreenShake } from "./game/hooks/useScreenShake";

import Hud from "./components/Hud";
import Particles from "./components/Particles";
import GiraffeSprite from "./components/GiraffeSprite";
import StartModal from "./components/StartModal";
import ResultModal from "./components/ResultModal";
import IdSubmitModal from "./components/IdSubmitModal";
import GameOverModal from "./components/GameOverModal";
import {
  Background,
  Bell,
  ChangeCloud,
  SceneObjects,
  Tower,
} from "./components/SceneLayer";

const CONTAINER_ID = "game-container";

const Giraffe = () => {
  const audioRef = useRef(null);
  const isGreenieUpRef = useRef(true);

  const [gameState, setGameState] = useState("start");
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [backgroundOffset, setBackgroundOffset] = useState(BG_MAX_OFFSET);
  const [backgroundHeight, setBackgroundHeight] = useState(BG_MAX_OFFSET);
  const [pressCount, setPressCount] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [neckOffset, setNeckOffset] = useState(NECK_INITIAL_OFFSET);
  const [finalClearTime, setFinalClearTime] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ state: "idle" });

  const timer = useGameTimer();
  const particles = useParticles();

  useEffect(() => {
    setBackgroundHeight(BG_MAX_OFFSET + window.innerHeight);
  }, []);

  useEffect(() => {
    fetchRanking().then((r) => setRanking(r.slice(0, RANKING_TOP_N)));
  }, []);

  useEffect(() => {
    if (gameState === "playing" && timer.remainingTime === 0) {
      timer.stop();
      setFinalClearTime(GAME_DURATION_SEC);
      setIsTimeOver(true);
      setGameState("result");
    }
  }, [timer.remainingTime, gameState, timer]);

  useScreenShake({
    active: gameState === "result" && !isTimeOver,
    targetId: CONTAINER_ID,
  });

  const advanceNeck = () => {
    setNeckOffset((prev) => {
      const next = isGreenieUpRef.current ? prev + NECK_STEP : prev - NECK_STEP;
      if (next >= NECK_MAX_OFFSET) {
        isGreenieUpRef.current = false;
        return NECK_MAX_OFFSET;
      }
      if (next <= NECK_MIN_OFFSET) {
        isGreenieUpRef.current = true;
        return NECK_MIN_OFFSET;
      }
      return next;
    });
  };

  const spawnStageParticles = (count) => {
    if (count < PARTICLE_STAGE_1_START) return;
    if (count < PARTICLE_STAGE_2_START) particles.spawn(1);
    else if (count < PARTICLE_STAGE_3_START) particles.spawn(2);
    else particles.spawn(3);
  };

  const handlePressSpace = () => {
    if (gameState === "start") setGameState("playing");
    timer.start();

    advanceNeck();
    setBackgroundOffset((prev) =>
      Math.max(prev - BG_STEP_PER_PRESS, BG_MIN_OFFSET),
    );

    setPressCount((prev) => {
      const next = prev + 1;
      spawnStageParticles(next);

      if (next >= SPACEBAR_GOAL_COUNT) {
        timer.stop();
        const clearTime = GAME_DURATION_SEC - timer.remainingTimeRef.current;
        setFinalClearTime(clearTime);
        setIsTimeOver(false);
        setGameState("result");
        audioRef.current?.play();
      }
      return next;
    });
  };

  const handleRestart = () => {
    timer.reset();
    setGameState("start");
    setIsTimeOver(false);
    setPressCount(0);
    setBackgroundOffset(BG_MAX_OFFSET);
    setNeckOffset(NECK_INITIAL_OFFSET);
    setFinalClearTime(null);
    setSubmitStatus({ state: "idle" });
    isGreenieUpRef.current = true;
  };

  const handleOpenIdInput = () => {
    setSubmitStatus({ state: "idle" });
    setGameState("idInput");
  };

  const handleCancelIdInput = () => {
    setSubmitStatus({ state: "idle" });
    setGameState("result");
  };

  const handleSubmitId = async (playerId) => {
    setSubmitStatus({ state: "pending" });
    const result = await submitScore(playerId, finalClearTime);
    if (!result.ok) {
      setSubmitStatus({ state: "failed", status: result.status });
      return;
    }
    const top = (await fetchRanking()).slice(0, RANKING_TOP_N);
    setRanking(top);
    setSubmitStatus({ state: "success" });
    setGameState("ranking");
  };

  useKeyboardInput({
    gameState,
    onPressSpace: handlePressSpace,
    onRestart: handleRestart,
  });

  return (
    <div
      id={CONTAINER_ID}
      style={{ position: "relative", overflow: "hidden", height: "100vh" }}
    >
      <style>{`
        @keyframes growCircle {
          0%   { clip-path: circle(0% at center); }
          100% { clip-path: circle(150% at center); }
        }
      `}</style>

      <audio ref={audioRef} src={goalBell} />

      <Background offset={backgroundOffset} height={backgroundHeight} />
      <Hud remainingTime={timer.remainingTime} pressCount={pressCount} />
      <Particles particles={particles.particles} />
      <Tower offset={backgroundOffset} />
      <ChangeCloud offset={backgroundOffset} />
      <Bell offset={backgroundOffset} />
      <GiraffeSprite neckOffset={neckOffset} pressCount={pressCount} />
      <SceneObjects offset={backgroundOffset} />

      {gameState === "start" && <StartModal />}

      {gameState === "result" && (
        <ResultModal
          isTimeOver={isTimeOver}
          finalClearTime={finalClearTime}
          pressCount={pressCount}
          onSubmitRecord={handleOpenIdInput}
          onNextChallenger={handleRestart}
        />
      )}

      {gameState === "idInput" && (
        <IdSubmitModal
          submitStatus={submitStatus}
          onSubmit={handleSubmitId}
          onCancel={handleCancelIdInput}
        />
      )}

      {gameState === "ranking" && (
        <GameOverModal
          isTimeOver={isTimeOver}
          finalClearTime={finalClearTime}
          ranking={ranking}
        />
      )}
    </div>
  );
};

export default Giraffe;
