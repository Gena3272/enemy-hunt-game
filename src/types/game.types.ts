import * as PIXI from 'pixi.js';

export interface Enemy {
  id: number;
  sprite: PIXI.Graphics;
  vx: number;
  vy: number;
  animSpeed: number;
  animFrame: number;
}

export interface LevelConfig {
  id: number;
  enemyCount: number;
  timeLimit: number;
  starThresholds: { three: number; two: number };
  background: number;
}

export interface GameState {
  level: number;
  enemiesKilled: number;
  totalEnemies: number;
  timeLeft: number;
  timeElapsed: number;
  isPaused: boolean;
  boosterUsed: boolean;
  stars: number;
}

export type ScreenType = 'menu' | 'game' | 'win' | 'lose';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export const SCREEN = {
  MENU: 'menu',
  GAME: 'game',
  WIN: 'win',
  LOSE: 'lose',
} as const satisfies Record<string, ScreenType>;
