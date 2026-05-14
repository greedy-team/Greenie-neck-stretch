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
  const submittedRef = useRef(false);
  const isGreenieUpRef = useRef(true);

  const [backgroundOffset, setBackgroundOffset] = useState(BG_MAX_OFFSET);
  const [backgroundHeight, setBackgroundHeight] = useState(BG_MAX_OFFSET);
  const [pressCount, setPressCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [, setIsSubmitted] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [nameError, setNameError] = useState("");
  const [neckOffset, setNeckOffset] = useState(NECK_INITIAL_OFFSET);
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);
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

  const handleSubmitResult = async (score) => {
    timer.stop();
    setFinalClearTime(score);
    setSubmitStatus({ state: "pending" });
    const result = await submitScore(playerId, score);
    setSubmitStatus(
      result.ok
        ? { state: "success" }
        : { state: "failed", status: result.status },
    );
    const top = (await fetchRanking()).slice(0, RANKING_TOP_N);
    submittedRef.current = true;
    setRanking(top);
  };

  useEffect(() => {
    if (timer.remainingTime === 0 && !isGameOver) {
      setIsTimeOver(true);
      setIsGameOver(true);
      timer.stop();
    }
  }, [timer.remainingTime, isGameOver, timer]);

  useEffect(() => {
    if (isGameOver && isTimeOver && !submittedRef.current) {
      handleSubmitResult(GAME_DURATION_SEC);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, isTimeOver]);

  useScreenShake({
    active: isGameOver && !isTimeOver,
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
    timer.start();

    advanceNeck();
    setBackgroundOffset((prev) =>
      Math.max(prev - BG_STEP_PER_PRESS, BG_MIN_OFFSET),
    );

    setPressCount((prev) => {
      const next = prev + 1;
      spawnStageParticles(next);

      if (next >= SPACEBAR_GOAL_COUNT && !submittedRef.current) {
        setIsTimeOver(false);
        setIsGameOver(true);
        setIsSubmitted(true);
        timer.stop();
        const clearTime = GAME_DURATION_SEC - timer.remainingTimeRef.current;
        setFinalClearTime(clearTime);
        handleSubmitResult(clearTime);
        audioRef.current?.play();
      }
      return next;
    });
  };

  const handleRestart = () => {
    timer.reset();
    submittedRef.current = false;
    setIsGameOver(false);
    setIsTimeOver(false);
    setPressCount(0);
    setIsSubmitted(false);
    setBackgroundOffset(BG_MAX_OFFSET);
    setNeckOffset(NECK_INITIAL_OFFSET);
    setIsStartModalOpen(true);
    setPlayerId("");
    setSubmitStatus({ state: "idle" });
  };

  useKeyboardInput({
    isGameOver,
    isStartModalOpen,
    onPressSpace: handlePressSpace,
    onRestart: handleRestart,
  });

  const handlePlayerIdChange = (next, errMessage) => {
    setPlayerId(next);
    setNameError(errMessage);
  };

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

      {isStartModalOpen && (
        <StartModal
          playerId={playerId}
          nameError={nameError}
          onIdChange={handlePlayerIdChange}
          onSubmit={() => setIsStartModalOpen(false)}
        />
      )}

      {isGameOver && (
        <GameOverModal
          isTimeOver={isTimeOver}
          finalClearTime={finalClearTime}
          ranking={ranking}
          submitStatus={submitStatus}
        />
      )}
    </div>
  );
};

export default Giraffe;
