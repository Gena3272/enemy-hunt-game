import React from 'react';

import Button from '@components/Button/Button.tsx';

import { LevelConfig } from "@types/game.types.ts";

import styles from './styles.module.scss';

interface MenuScreenProps {
  onStartGame: (levelIndex: number) => void;
  levels: LevelConfig[];
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame, levels }) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <h1 className={styles.title}>Полювання на ворогів</h1>

      <div className={styles.levels}>
        {levels.map((level, index) => (
          <Button key={level.id} onClick={() => onStartGame(index)}>
            <div className={styles.content}>
              <span>Рівень {level.id}</span>
              <div className={styles.textSmall}>
                {level.enemyCount} ворогів / {level.timeLimit}с
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className={styles.info}>
        <p>Клікай по ворогах щоб їх знищити!</p>
        <p>Використовуй бустер для додаткового часу</p>
      </div>
    </div>
  </div>
);

export default MenuScreen;
