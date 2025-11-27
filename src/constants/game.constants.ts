export const LEVELS = [
  {
    id: 1,
    enemyCount: 5,
    timeLimit: 30,
    starThresholds: { three: 15, two: 22 },
    background: 0x4a90e2
  },
  {
    id: 2,
    enemyCount: 8,
    timeLimit: 45,
    starThresholds: { three: 20, two: 32 },
    background: 0xe49188
  },
  {
    id: 3,
    enemyCount: 12,
    timeLimit: 60,
    starThresholds: { three: 25, two: 42 },
    background: 0x27ae60
  }
];

export const GAME_CONFIG = {
  BOOSTER_TIME: 10,
  ENEMY_SIZE: 50,
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 500
};
