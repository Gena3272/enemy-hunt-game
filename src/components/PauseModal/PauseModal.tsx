import React from 'react';

import styles from './styles.module.scss';

interface PauseModalProps {
  onResume: () => void;
}

const PauseModal: React.FC<PauseModalProps> = ({ onResume }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <h3 className={styles.title}>Пауза</h3>
      <button onClick={onResume} className={styles.button}>
        Продовжити
      </button>
    </div>
  </div>
);

export default PauseModal;
