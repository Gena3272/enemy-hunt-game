import React from 'react';

import styles from './styles.module.scss';

interface GameStatsProps {
  level: number;
  timeLeft: number;
  enemiesKilled: number;
  totalEnemies: number;
}

const GameStats: React.FC<GameStatsProps> = ({ level, timeLeft, enemiesKilled, totalEnemies }) => (
  <div className={styles.wrapper}>
    <div className={`${styles.item} ${styles.itemLevel}`}>
      Рівень: {level}
    </div>
    <div className={`${styles.item} ${styles.itemTime}`}>
      Час: {timeLeft}с
    </div>
    <div className={`${styles.item} ${styles.itemEnemies}`}>
      Вороги: {enemiesKilled}/{totalEnemies}
    </div>
  </div>
);

export default GameStats;
