'use client';

import React from 'react';
import styles from './Input.module.scss';

const Input = ({ value, onChange, name, type, label }) => {
  return (
    <div className={styles.inputWrapper}>
      <label
        htmlFor={name}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange?.({ value: e.target.value, name })}
        name={name}
        id={name}
        className={styles.input}
        type={type}
      />
    </div>
  );
};

export default Input;