import React, { useState, useCallback, useRef, useEffect } from 'react';

import { GameState, ScreenType, Enemy, SCREEN } from './types/game.types';

import { LEVELS, GAME_CONFIG } from './constants/game.constants';

import { AudioManager } from './utils/audio.utils';
import { calculateStars } from './utils/game.utils';

import { EnemyManager } from './services/EnemyManager';

import MenuScreen from '@components/MenuScreen/MenuScreen.tsx';
import WinScreen from '@components/WinScreen/WinScreen.tsx';
import LoseScreen from '@components/LoseScreen/LoseScreen.tsx';
import GameStats from '@components/GameStats/GameStats.tsx';
import GameControls from '@components/GameControls/GameControls.tsx';
import GameCanvas from '@components/GameCanvas/GameCanvas.tsx';
import PauseModal from '@components/PauseModal/PauseModal.tsx';

import backgroundMusic from './assets/audio/background-music.mp3';

import './styles/index.css';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenType>(SCREEN.MENU);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState<GameState>({
    level: 0,
    enemiesKilled: 0,
    totalEnemies: 0,
    timeLeft: LEVELS[0].timeLimit,
    timeElapsed: 0,
    isPaused: false,
    boosterUsed: false,
    stars: 0
  });

  const enemiesRef = useRef<Enemy[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);
  const audioManagerRef = useRef(new AudioManager());
  const [soundEnabled, setSoundEnabled] = useState(true);

  const enemyManagerRef = useRef(new EnemyManager());

  const cleanupGame = useCallback(() => {
    isPlayingRef.current = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    enemyManagerRef.current.destroyAll(enemiesRef.current);
    enemiesRef.current = [];
  }, []);

  const startGame = useCallback((levelIndex: number) => {
    cleanupGame();

    const level = LEVELS[levelIndex];
    setCurrentLevel(levelIndex);
    setGameState({
      level: levelIndex,
      enemiesKilled: 0,
      totalEnemies: level.enemyCount,
      timeLeft: level.timeLimit,
      timeElapsed: 0,
      isPaused: false,
      boosterUsed: false,
      stars: 0
    });
    setScreen(SCREEN.GAME);

    isPlayingRef.current = true;

    if (soundEnabled) {
      audioManagerRef.current.loadAndPlayMP3('./assets/audio/background-music.mp3');
    }
  }, [cleanupGame]);

  const handleEnemyClick = useCallback((enemyId: number) => {
    audioManagerRef.current.playEnemyKill();

    const enemyIndex = enemiesRef.current.findIndex(e => e.id === enemyId);
    if (enemyIndex !== -1) {
      enemyManagerRef.current.destroyEnemy(enemiesRef.current[enemyIndex]);
      enemiesRef.current.splice(enemyIndex, 1);
    }

    setGameState(prev => {
      const newKilled = prev.enemiesKilled + 1;

      if (newKilled >= prev.totalEnemies) {
        isPlayingRef.current = false;
        const stars = calculateStars(prev.timeElapsed, LEVELS[prev.level]);
        audioManagerRef.current.playVictory();
        setTimeout(() => setScreen(SCREEN.WIN), 100);
        return { ...prev, enemiesKilled: newKilled, stars };
      }

      return { ...prev, enemiesKilled: newKilled };
    });
  }, []);

  const useBooster = useCallback(() => {
    if (!gameState.boosterUsed && isPlayingRef.current && !gameState.isPaused) {
      setGameState(prev => ({
        ...prev,
        timeLeft: prev.timeLeft + GAME_CONFIG.BOOSTER_TIME,
        boosterUsed: true
      }));
      audioManagerRef.current.playBooster();
    }
  }, [gameState.boosterUsed, gameState.isPaused]);

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      audioManagerRef.current.setEnabled(newValue);
      return newValue;
    });
  }, []);

  const goToMenu = useCallback(() => {
    cleanupGame();
    setScreen(SCREEN.MENU);
  }, [cleanupGame]);

  useEffect(() => {
    if (screen !== 'game' || !isPlayingRef.current || gameState.isPaused) return;

    timerRef.current = setInterval(() => {
      setGameState(prev => {
        if (!isPlayingRef.current) return prev;

        const newTimeLeft = prev.timeLeft - 1;
        const newTimeElapsed = prev.timeElapsed + 1;

        if (newTimeLeft <= 0) {
          isPlayingRef.current = false;
          audioManagerRef.current.playDefeat();
          setTimeout(() => setScreen(SCREEN.LOSE), 100);
          return { ...prev, timeLeft: 0 };
        }

        return { ...prev, timeLeft: newTimeLeft, timeElapsed: newTimeElapsed };
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [screen, gameState.isPaused]);

  useEffect(() => {
    if (screen === SCREEN.GAME && soundEnabled) {
      audioManagerRef.current.loadAndPlayMP3(backgroundMusic);
    } else {
      audioManagerRef.current.stopBackgroundMusic();
    }

    return () => {
      audioManagerRef.current.stopBackgroundMusic();
    };
  }, [screen, soundEnabled]);

  if (screen === SCREEN.MENU) {
    return <MenuScreen onStartGame={startGame} levels={LEVELS} />;
  }

  if (screen === SCREEN.WIN) {
    return (
        <WinScreen
            stars={gameState.stars}
            timeElapsed={gameState.timeElapsed}
            enemiesKilled={gameState.enemiesKilled}
            currentLevel={currentLevel}
            totalLevels={LEVELS.length}
            onNextLevel={() => startGame(currentLevel + 1)}
            onRestart={() => startGame(currentLevel)}
            onMenu={goToMenu}
        />
    );
  }

  if (screen === SCREEN.LOSE) {
    return (
        <LoseScreen
            enemiesKilled={gameState.enemiesKilled}
            totalEnemies={gameState.totalEnemies}
            onRestart={() => startGame(currentLevel)}
            onMenu={goToMenu}
        />
    );
  }

  return (
      <div className="game-screen">
        <div className="game-screen__container">
          <div className="game-screen__header">
            <GameStats
                level={LEVELS[currentLevel].id}
                timeLeft={gameState.timeLeft}
                enemiesKilled={gameState.enemiesKilled}
                totalEnemies={gameState.totalEnemies}
            />
            <GameControls
                onBooster={useBooster}
                onPause={togglePause}
                onSound={toggleSound}
                onMenu={goToMenu}
                boosterUsed={gameState.boosterUsed}
                isPaused={gameState.isPaused}
                soundEnabled={soundEnabled}
            />
          </div>

          <GameCanvas
              level={LEVELS[currentLevel]}
              onEnemyClick={handleEnemyClick}
              enemiesRef={enemiesRef}
              isPlayingRef={isPlayingRef}
              isPaused={gameState.isPaused}
          />

          {gameState.isPaused && <PauseModal onResume={togglePause} />}
        </div>
      </div>
  );
};

export default App;
