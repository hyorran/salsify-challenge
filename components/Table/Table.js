import React from 'react';
import styles from './Table.module.scss';

const Table = ({ headers, data }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        </thead>

        <tbody>
        {data.length === 0 ? (
          <tr>
            <td>No data available</td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;