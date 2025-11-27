import React from 'react';

import IconButton from '@components/IconButton/IconButton.tsx';

import styles from './styles.module.scss';

interface GameControlsProps {
  onBooster: () => void;
  onPause: () => void;
  onSound: () => void;
  onMenu: () => void;
  boosterUsed: boolean;
  isPaused: boolean;
  soundEnabled: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onBooster,
  onPause,
  onSound,
  onMenu,
  boosterUsed,
  isPaused,
  soundEnabled
}) => (
  <div className={styles.wrapper}>
    <IconButton
      onClick={onBooster}
      icon="boost"
      disabled={boosterUsed}
      title="Бустер (+10с)"
      variant="warning"
    />
    <IconButton
      onClick={onPause}
      icon={isPaused ? 'play' : 'pause'}
      title={isPaused ? 'Продовжити' : 'Пауза'}
    />
    <IconButton
      onClick={onSound}
      icon={soundEnabled ? 'sound-on' : 'sound-off'}
      title={soundEnabled ? 'Вимкнути звук' : 'Увімкнути звук'}
      variant="purple"
    />
    <IconButton
      onClick={onMenu}
      icon="home"
      title="Головне меню"
      variant="gray"
    />
  </div>
);

export default GameControls;
