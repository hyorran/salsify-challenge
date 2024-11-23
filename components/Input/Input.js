'use client'

import React from "react";
import styles from "./Input.module.scss";

const Input = ({ value, onChange, name, type }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={(e) => onChange?.({ value: e.target.value, name })}
        name={name}
        className={styles.input}
        type={type}
      />
    </div>
  );
};

export default Input;