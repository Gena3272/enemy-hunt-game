import React from 'react';

import { ButtonVariant } from "@types/game.types.ts";

import styles from './styles.module.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
