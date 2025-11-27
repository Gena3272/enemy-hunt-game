import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

import Button from '@components/Button/Button.tsx';
import Stars from '@components/Stars/Stars.tsx';

import styles from './styles.module.scss';

interface WinScreenProps {
  stars: number;
  timeElapsed: number;
  enemiesKilled: number;
  currentLevel: number;
  totalLevels: number;
  onNextLevel: () => void;
  onRestart: () => void;
  onMenu: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({
  stars,
  timeElapsed,
  enemiesKilled,
  currentLevel,
  totalLevels,
  onNextLevel,
  onRestart,
  onMenu
}) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <h2 className={styles.title}>Перемога!</h2>

      <Stars count={stars} />

      <div className={styles.stats}>
        <p className={styles.statTime}>Час: {timeElapsed} секунд</p>
        <p className={styles.statEnemies}>Знищено ворогів: {enemiesKilled}</p>
      </div>

      <div className={styles.buttons}>
        {currentLevel < totalLevels - 1 && (
          <Button onClick={onNextLevel} variant="success">
            Наступний рівень
          </Button>
        )}

        <Button onClick={onRestart}>
          <span className={styles.icon}><RotateCcw size={20} /></span>
          Переграти рівень
        </Button>

        <Button onClick={onMenu} variant="secondary">
          <span className={styles.icon}><Home size={20} /></span>
          Головне меню
        </Button>
      </div>
    </div>
  </div>
);

export default WinScreen;
