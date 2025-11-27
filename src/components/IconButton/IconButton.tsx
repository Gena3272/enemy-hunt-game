import React from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Zap, Home } from 'lucide-react';

import styles from './styles.module.scss';

interface IconButtonProps {
  onClick: () => void;
  icon: 'play' | 'pause' | 'sound-on' | 'sound-off' | 'restart' | 'boost' | 'home';
  disabled?: boolean;
  title?: string;
  variant?: 'primary' | 'warning' | 'purple' | 'gray';
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  disabled = false,
  title,
  variant = 'primary'
}) => {
  const icons = {
    'play': <Play size={24} />,
    'pause': <Pause size={24} />,
    'sound-on': <Volume2 size={24} />,
    'sound-off': <VolumeX size={24} />,
    'restart': <RotateCcw size={20} />,
    'boost': <Zap size={24} />,
    'home': <Home size={24} />
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
      title={title}
    >
      {icons[icon]}
    </button>
  );
};

export default IconButton;
