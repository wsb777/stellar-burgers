import styles from './modal-overlay.module.css';
import React from 'react';

export const ModalOverlayUI = ({
  onClick,
  ...rest
}: {
  onClick: () => void;
}) => <div {...rest} className={styles.overlay} onClick={onClick} />;
