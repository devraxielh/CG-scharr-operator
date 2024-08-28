import React, { useState, useEffect } from 'react';

const SchorrOperatorInteractiveFullControls = () => {
  const [inputGrid, setInputGrid] = useState([
    [50, 50, 50, 200, 200],
    [50, 50, 50, 200, 200],
    [50, 50, 50, 200, 200],
    [50, 50, 50, 200, 200],
    [50, 50, 50, 200, 200]
  ]);
  const [outputGrid, setOutputGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: 2, col: 2 });
  const [gx, setGx] = useState(0);
  const [gy, setGy] = useState(0);
  const [g, setG] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const cellSize = 50;

  const schorrX = [
    [-3, 0, 3],
    [-10, 0, 10],
    [-3, 0, 3]
  ];

  const schorrY = [
    [-3, -10, -3],
    [0, 0, 0],
    [3, 10, 3]
  ];

  useEffect(() => {
    calculateGradients();
    calculateOutputImage();
  }, [inputGrid, selectedCell]);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setAnimationStep((prevStep) => (prevStep + 1) % 7);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const calculateGradients = () => {
    const { row, col } = selectedCell;
    let sumX = 0;
    let sumY = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const gridValue = inputGrid[row + i]?.[col + j] || 0;
        sumX += gridValue * schorrX[i + 1][j + 1];
        sumY += gridValue * schorrY[i + 1][j + 1];
      }
    }

    setGx(sumX);
    setGy(sumY);
    setG(Math.sqrt(sumX * sumX + sumY * sumY));
  };

  const calculateOutputImage = () => {
    const output = inputGrid.map((row, i) =>
      row.map((_, j) => {
        let sumX = 0;
        let sumY = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            const value = inputGrid[i + di]?.[j + dj] || 0;
            sumX += value * schorrX[di + 1][dj + 1];
            sumY += value * schorrY[di + 1][dj + 1];
          }
        }
        return Math.sqrt(sumX * sumX + sumY * sumY);
      })
    );

    const flatOutput = output.flat();
    const maxValue = Math.max(...flatOutput);
    const normalizedOutput = output.map(row =>
      row.map(value => Math.round((value / maxValue) * 255))
    );

    setOutputGrid(normalizedOutput);
  };

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleCellValueChange = (row, col, value) => {
    const newGrid = inputGrid.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setInputGrid(newGrid);
  };

  const renderGrid = (grid, isOutput = false, highlight = []) => {
    return grid.map((row, i) => (
      <div key={i} style={{ display: 'flex' }}>
        {row.map((cell, j) => (
          <div
            key={j}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: highlight.some(([hi, hj]) => hi === i && hj === j) ? 'yellow' : `rgb(${cell}, ${cell}, ${cell})`,
              border: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: cell > 128 ? 'black' : 'white',
              outline: !isOutput && i === selectedCell.row && j === selectedCell.col ? '2px solid red' : 'none',
              cursor: isOutput ? 'default' : 'pointer',
            }}
            onClick={() => !isOutput && handleCellClick(i, j)}
          >
            {!isOutput && (
              <input
                type="number"
                value={cell}
                onChange={(e) => handleCellValueChange(i, j, parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'none',
                  textAlign: 'center',
                  color: 'inherit',
                  fontSize: '14px',
                }}
                min="0"
                max="255"
              />
            )}
            {isOutput && cell}
          </div>
        ))}
      </div>
    ));
  };

  const renderKernel = (kernel, highlight = []) => (
    <div style={{ display: 'inline-block', marginRight: '20px', verticalAlign: 'top' }}>
      {kernel.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row.map((cell, j) => (
            <div
              key={j}
              style={{
                width: cellSize / 2,
                height: cellSize / 2,
                border: '1px solid #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: highlight.some(([hi, hj]) => hi === i && hj === j) ? 'yellow' : (cell === 0 ? '#f0f0f0' : cell > 0 ? '#ffcccc' : '#ccccff'),
                fontSize: '12px',
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderAnimationStep = () => {
    const { row, col } = selectedCell;
    switch (animationStep) {
      case 0:
        return (
          <div>
            <h3>Paso 1: Imagen de entrada</h3>
            {renderGrid(inputGrid, false, [[row, col]])}
            <p>Comenzamos con la imagen de entrada. El píxel central (resaltado) es el que vamos a procesar.</p>
          </div>
        );
      case 1:
        return (
          <div>
            <h3>Paso 2: Kernel X</h3>
            {renderKernel(schorrX)}
            <p>Este es el kernel X que usaremos para detectar bordes verticales.</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Paso 3: Aplicación del Kernel X</h3>
            {renderGrid(inputGrid, false, [[row-1, col-1], [row-1, col], [row-1, col+1], [row, col-1], [row, col], [row, col+1], [row+1, col-1], [row+1, col], [row+1, col+1]])}
            {renderKernel(schorrX)}
            <p>Aplicamos el kernel X a los 9 píxeles centrados en nuestro píxel de interés.</p>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Paso 4: Kernel Y</h3>
            {renderKernel(schorrY)}
            <p>Este es el kernel Y que usaremos para detectar bordes horizontales.</p>
          </div>
        );
      case 4:
        return (
          <div>
            <h3>Paso 5: Aplicación del Kernel Y</h3>
            {renderGrid(inputGrid, false, [[row-1, col-1], [row-1, col], [row-1, col+1], [row, col-1], [row, col], [row, col+1], [row+1, col-1], [row+1, col], [row+1, col+1]])}
            {renderKernel(schorrY)}
            <p>Aplicamos el kernel Y a los mismos 9 píxeles.</p>
          </div>
        );
      case 5:
        return (
          <div>
            <h3>Paso 6: Cálculo de Gradientes</h3>
            <p>Gx = {gx.toFixed(2)}</p>
            <p>Gy = {gy.toFixed(2)}</p>
            <p>G = √(Gx² + Gy²) = {g.toFixed(2)}</p>
            <p>Calculamos los gradientes Gx y Gy, y luego el gradiente total G.</p>
          </div>
        );
      case 6:
        return (
          <div>
            <h3>Paso 7: Resultado Final</h3>
            {renderGrid(outputGrid, true)}
            <p>El resultado final muestra los bordes detectados. Los píxeles más brillantes indican bordes más fuertes.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  const sectionStyle = {
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '4px 9px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  const controlButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2196F3',
    padding: '5px 10px',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2>Imágenes de entrada y salida</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Imagen de entrada</h3>
            {renderGrid(inputGrid)}
            <p>Haz clic en una celda para seleccionarla y modifica su valor para ver cómo afecta al resultado.</p>
          </div>
          <div>
            <h3>Imagen de salida</h3>
            {renderGrid(outputGrid, true)}
          </div>
        </div>
      </div>
      
      <div style={sectionStyle}>
        <h2>Resultados del cálculo</h2>
        <p>Celda seleccionada: ({selectedCell.row}, {selectedCell.col})</p>
        <p>Gradiente X (Gx): {gx.toFixed(2)}</p>
        <p>Gradiente Y (Gy): {gy.toFixed(2)}</p>
        <p>Gradiente total (G): {g.toFixed(2)}</p>
      </div>
      
      <div style={sectionStyle}>
        <h2>Animación del proceso</h2>
        <div style={{ marginBottom: '10px' }}>
          <button 
            style={{...buttonStyle, backgroundColor: isAnimating ? '#f44336' : '#4CAF50'}} 
            onClick={() => setIsAnimating(!isAnimating)}
          >
            {isAnimating ? 'Pausar' : 'Iniciar'} animación
          </button>
          <button 
            style={controlButtonStyle} 
            onClick={() => setAnimationStep((prevStep) => (prevStep - 1 + 7) % 7)}
            disabled={isAnimating}
          >
            Anterior
          </button>
          <button 
            style={controlButtonStyle} 
            onClick={() => setAnimationStep((prevStep) => (prevStep + 1) % 7)}
            disabled={isAnimating}
          >
            Siguiente
          </button>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px', minHeight: '300px' }}>
          {renderAnimationStep()}
        </div>
      </div>
    </div>
  );
};

export default SchorrOperatorInteractiveFullControls;