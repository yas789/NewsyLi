import React, { useState, useMemo } from 'react';
import './ModuloMatrix.css';

const ModuloMatrix = () => {
  const [mMax, setMMax] = useState(8);
  const [nMax, setNMax] = useState(12);
  const [showMultipleIndicator, setShowMultipleIndicator] = useState(false);

  const { remainderMatrix, multipleMatrix } = useMemo(() => {
    const remainder = [];
    const multiple = [];
    
    for (let m = 2; m <= mMax; m++) {
      const remainderRow = [];
      const multipleRow = [];
      
      for (let n = 2; n <= nMax; n++) {
        const rem = n % m;
        remainderRow.push(rem);
        multipleRow.push(rem === 0 ? 1 : 0);
      }
      
      remainder.push(remainderRow);
      multiple.push(multipleRow);
    }
    
    return { remainderMatrix: remainder, multipleMatrix: multiple };
  }, [mMax, nMax]);

  const getCellColor = (value, isMultiple = false, m = null, n = null) => {
    if (isMultiple) {
      return value === 1 
        ? 'matrix-cell-multiple' 
        : 'matrix-cell-empty';
    } else {
      // Below the diagonal (m > n)
      if (m !== null && n !== null && m > n) {
        return 'matrix-cell-invalid';
      }
      
      // Above and on diagonal: only red if remainder is 0 (divisible)
      if (value === 0) {
        return 'matrix-cell-zero';
      }
      
      // Color code non-zero remainders
      return `matrix-cell-remainder matrix-cell-value-${value % 10}`;
    }
  };

  const MatrixTable = ({ matrix, title, isMultiple = false }) => (
    <div className="matrix-container">
      <div className="matrix-header">
        <h3 className="matrix-title">
          {title}
        </h3>
        <p className="matrix-description">
          {isMultiple 
            ? 'Shows 1 if m divides n, 0 otherwise' 
            : 'Each cell shows n mod m (remainder when n is divided by m)'}
        </p>
      </div>
      <div className="matrix-table-wrapper">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="matrix-header-cell matrix-corner-cell">
                <div className="matrix-corner-content">
                  <span className="matrix-corner-label">m</span>
                  <span className="matrix-corner-slash">\</span>
                  <span className="matrix-corner-label">n</span>
                </div>
              </th>
              {Array.from({ length: nMax - 1 }, (_, i) => (
                <th key={i + 2} className="matrix-header-cell">
                  <span className="matrix-header-value">
                    {i + 2}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => {
              const currentM = rowIndex + 2;
              return (
                <tr key={rowIndex}>
                  <td className="matrix-row-header">
                    <div className="matrix-row-value">
                      {currentM}
                    </div>
                  </td>
                  {row.map((value, colIndex) => {
                    const currentN = colIndex + 2;
                    const displayValue = isMultiple ? (value === 1 ? '1' : '0') : value;
                    const operation = isMultiple ? `${currentN} ÷ ${currentM}` : `${currentN} mod ${currentM}`;
                    const result = isMultiple ? (value === 1 ? 'divisible' : 'not divisible') : displayValue;
                    return (
                      <td 
                        key={colIndex} 
                        className={`matrix-cell ${getCellColor(value, isMultiple, currentM, currentN)}`}
                        title={`${operation} = ${result}`}
                      >
                        <div className="matrix-cell-content">
                          <span className="matrix-cell-value">{displayValue}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="modulo-matrix-page">
      <div className="modulo-header">
        <h2 className="modulo-title">
          Modular Arithmetic Explorer
        </h2>
        <p className="modulo-description">
          Visualize modular arithmetic operations with these interactive matrices. 
          The remainder matrix shows n mod m, while the multiple indicator highlights divisibility.
        </p>
      </div>

      <div className="modulo-controls">
        <div className="controls-grid">
          <div className="control-group">
            <label className="control-label">
              Max m value: <span className="control-value">{mMax}</span>
            </label>
            <input
              type="range"
              min="2"
              max="24"
              value={mMax}
              onChange={(e) => setMMax(Number(e.target.value))}
              className="control-slider"
            />
          </div>
          <div className="control-group">
            <label className="control-label">
              Max n value: <span className="control-value">{nMax}</span>
            </label>
            <input
              type="range"
              min="2"
              max="30"
              value={nMax}
              onChange={(e) => setNMax(Number(e.target.value))}
              className="control-slider"
            />
          </div>
        </div>
        <div className="toggle-container">
          <button
            onClick={() => setShowMultipleIndicator(!showMultipleIndicator)}
            className={`toggle-button ${showMultipleIndicator ? 'toggle-active' : ''}`}
          >
            <span className={`toggle-slider ${showMultipleIndicator ? 'toggle-slider-active' : ''}`} />
          </button>
          <span className="toggle-label">
            {showMultipleIndicator ? 'Multiple Indicator Matrix' : 'Remainder Matrix'}
          </span>
        </div>
      </div>

      {showMultipleIndicator ? (
        <MatrixTable 
          matrix={multipleMatrix} 
          title="Multiple Indicator Matrix" 
          isMultiple={true} 
        />
      ) : (
        <MatrixTable 
          matrix={remainderMatrix} 
          title="Remainder Matrix (n mod m)" 
        />
      )}

      <div className="modulo-explanation">
        <h3 className="explanation-title">
          <svg className="explanation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Understanding the Matrices
        </h3>
        <div className="explanation-grid">
          <div className="explanation-item">
            <h4 className="explanation-subtitle remainder-subtitle">
              <span className="explanation-dot remainder-dot"></span>
              Remainder Matrix
            </h4>
            <p className="explanation-text">
              Each cell shows the remainder when n is divided by m (n mod m). 
              When m {'>'} n, the result is always n (shown in red). 
              When m divides n, the remainder is 0 (also shown in red).
            </p>
          </div>
          <div className="explanation-item">
            <h4 className="explanation-subtitle multiple-subtitle">
              <span className="explanation-dot multiple-dot"></span>
              Multiple Indicator Matrix
            </h4>
            <p className="explanation-text">
              Shows 1 if m divides n (n mod m = 0), and 0 otherwise. 
              This highlights all the multiples of each number m in the rows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuloMatrix;
