'use client';

import React from 'react';
import styles from './Dropdown.module.scss';

const Dropdown = ({ options, onChange, defaultOption = 'Select an option', name, label }) => {
  return (
    <div className={styles.dropdownWrapper}>
      <label
        htmlFor={name}
      >
        {label}
      </label>
      <select
        className={styles.dropdown}
        onChange={(e) => onChange?.({ value: e.target.value, name })}
        id={name}
      >
        <option value="">{defaultOption}</option>
        {options?.map(({ id, name: optName }) => (
          <option key={id} value={id}>
            {optName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;