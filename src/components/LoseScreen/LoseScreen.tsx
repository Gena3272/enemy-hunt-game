import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

import Button from '@components/Button/Button.tsx';

import styles from './styles.module.scss';

interface LoseScreenProps {
  enemiesKilled: number;
  totalEnemies: number;
  onRestart: () => void;
  onMenu: () => void;
}

const LoseScreen: React.FC<LoseScreenProps> = ({
  enemiesKilled,
  totalEnemies,
  onRestart,
  onMenu
}) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <h2 className={styles.title}>Поразка!</h2>

      <div className={styles.stats}>
        <p className={styles.statTimeout}>Час вийшов!</p>
        <p className={styles.statEnemie}>Знищено: {enemiesKilled} / {totalEnemies}</p>
      </div>

      <div className={styles.buttons}>
        <Button onClick={onRestart} variant="danger">
          <span className={styles.icon}><RotateCcw size={20} /></span>
          Спробувати знову
        </Button>

        <Button onClick={onMenu} variant="secondary">
          <span className={styles.icon}><Home size={20} /></span>
          Головне меню
        </Button>
      </div>
    </div>
  </div>
);

export default LoseScreen;
