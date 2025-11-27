import React, { useRef } from 'react';
import * as PIXI from 'pixi.js';

import { Enemy, LevelConfig } from '@types/game.types';

import { EnemyManager } from '@services/EnemyManager.ts';

import { GAME_CONFIG } from '@constants/game.constants';

import styles from './styles.module.scss';

interface GameCanvasProps {
  level: LevelConfig;
  onEnemyClick: (enemyId: number) => void;
  enemiesRef: React.MutableRefObject<Enemy[]>;
  isPlayingRef: React.MutableRefObject<boolean>;
  isPaused: boolean;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  level,
  onEnemyClick,
  enemiesRef,
  isPlayingRef,
  isPaused
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixiAppRef = useRef<PIXI.Application | null>(null);
  const enemyManagerRef = useRef(new EnemyManager());
  const animationRef = useRef<number>();

  React.useEffect(() => {
    if (!containerRef.current) return;

    const app = new PIXI.Application({
      width: GAME_CONFIG.CANVAS_WIDTH,
      height: GAME_CONFIG.CANVAS_HEIGHT,
      backgroundColor: level.background,
      antialias: true
    });

    containerRef.current.appendChild(app.view as HTMLCanvasElement);
    pixiAppRef.current = app;

    const enemies: Enemy[] = [];
    for (let i = 0; i < level.enemyCount; i++) {
      const enemy = enemyManagerRef.current.createEnemy(i, app);

      enemy.sprite.on('pointerdown', () => {
        if (!isPlayingRef.current || isPaused) return;
        onEnemyClick(enemy.id);
      });

      enemies.push(enemy);
    }

    enemiesRef.current = enemies;

    const animate = () => {
      if (isPlayingRef.current && !isPaused) {
        enemyManagerRef.current.updateEnemies(enemiesRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (app.view && containerRef.current?.contains(app.view as HTMLCanvasElement)) {
        containerRef.current.removeChild(app.view as HTMLCanvasElement);
      }
      app.destroy(true, { children: true });
    };
  }, [level, onEnemyClick, enemiesRef, isPlayingRef, isPaused]);

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      style={{ width: GAME_CONFIG.CANVAS_WIDTH, height: GAME_CONFIG.CANVAS_HEIGHT }}
    />
  );
};

export default GameCanvas;
