import { LevelConfig } from '../types/game.types';

export const calculateStars = (timeElapsed: number, level: LevelConfig): number => {
  if (timeElapsed <= level.starThresholds.three) return 3;
  if (timeElapsed <= level.starThresholds.two) return 2;
  return 1;
};
