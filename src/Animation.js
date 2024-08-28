import React, { useState, useEffect } from 'react';

const CannyEdgeAnimatedExplanation = () => {
    const [frame, setFrame] = useState(0);
    const gridSize = 5;
    const [grid, setGrid] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(0)));
    const [initialGrid, setInitialGrid] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(0)));
    const [isRunning, setIsRunning] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
            setFrame((prevFrame) => (prevFrame + 1) % 5);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (frame === 0) {
            setGrid(initialGrid.map(row => [...row]));
        } else {
            const newGrid = grid.map(row => [...row]);
            const laplacian = [
            [0, 1, 0],
            [1, -4, 1],
            [0, 1, 0]
            ];
            for (let i = 1; i < gridSize - 1; i++) {
            for (let j = 1; j < gridSize - 1; j++) {
                let sum = 0;
                for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    sum += newGrid[i + di][j + dj] * laplacian[di + 1][dj + 1];
                }
                }
                newGrid[i][j] = Math.max(-1, Math.min(1, sum));
            }
            }
            setGrid(newGrid);
        }
    }, [frame, initialGrid]);

    const handleCellClick = (i, j) => {
      if (!isRunning) {
        const newInitialGrid = initialGrid.map(row => [...row]);
        newInitialGrid[i][j] = newInitialGrid[i][j] === 1 ? 0 : 1;
        setInitialGrid(newInitialGrid);
        setGrid(newInitialGrid);
      }
    };
  
    const toggleRunning = () => {
      setIsRunning(!isRunning);
      setFrame(0);
    };
  
    const resetGrid = () => {
      setIsRunning(false);
      setFrame(0);
      setInitialGrid(Array(gridSize).fill().map(() => Array(gridSize).fill(0)));
      setGrid(Array(gridSize).fill().map(() => Array(gridSize).fill(0)));
    };
  
    const explanation = [
      "Configuración inicial: Haz clic en las celdas para activarlas o desactivarlas.",
      "Primera aplicación: El operador Laplaciano detecta cambios bruscos alrededor de los puntos activos.",
      "Segunda aplicación: El efecto se propaga, resaltando más los bordes.",
      "Tercera aplicación: Se observa una mayor propagación del efecto.",
      "Resultado final: Se aprecia claramente el patrón de detección de bordes del operador Laplaciano."
    ];
  
    const ConvolutionMatrix = () => (
      <div className="flex flex-col items-center mb-6">
        <h4 className="text-lg font-semibold mb-3">Matriz de Convolución del Operador Laplaciano</h4>
        <div className="relative">
          <div className="grid grid-cols-3 gap-1 p-4 bg-gray-100 rounded-xl shadow-lg">
            {[0, 1, 0, 1, -4, 1, 0, 1, 0].map((value, index) => (
              <div 
                key={index} 
                className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-lg ${
                  value === 0 ? 'bg-gray-200 text-gray-500' : 
                  value === 1 ? 'bg-blue-200 text-blue-700' : 
                  'bg-red-200 text-red-700'
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold">
            Píxeles superiores
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold">
            Píxeles inferiores
          </div>
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
            Píxeles izquierdos
          </div>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
            Píxeles derechos
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-300 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold">
            Píxel central
          </div>
        </div>
      </div>
    );
  
    const DetailedExplanation = () => (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Cómo el Operador Laplaciano detecta bordes:</h3>
        <ConvolutionMatrix />
        <p className="mb-3 text-sm">El Operador Laplaciano detecta bordes al medir los cambios bruscos de intensidad en una imagen. Funciona así:</p>
        <ol className="list-decimal list-inside mb-4 space-y-1 text-sm">
          <li>La matriz de convolución se aplica a cada píxel y sus 8 vecinos inmediatos.</li>
          <li>Se calcula la suma de los valores de los píxeles vecinos multiplicados por los valores correspondientes de la matriz.</li>
          <li>Un resultado cercano a cero indica un área uniforme (sin borde).</li>
          <li>Un resultado muy positivo o muy negativo indica un cambio brusco (borde).</li>
        </ol>
        <p className="text-sm font-semibold mb-2">En nuestra animación:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><span className="text-blue-600 font-semibold">Azul oscuro:</span> Valores positivos (cambio de oscuro a claro)</li>
          <li><span className="text-red-600 font-semibold">Rojo oscuro:</span> Valores negativos (cambio de claro a oscuro)</li>
          <li><span className="text-green-600 font-semibold">Verde:</span> Valores cercanos a cero (sin cambio significativo)</li>
        </ul>
      </div>
    );
  
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded">
          <p className="font-bold">Instrucciones:</p>
          <ol className="list-decimal list-inside text-sm mt-1">
            <li>Haz clic en las celdas de la cuadrícula para seleccionar puntos iniciales.</li>
            <li>Cuando estés listo, presiona "Iniciar Animación" para ver el efecto del Operador Laplaciano.</li>
            <li>Puedes detener la animación en cualquier momento y reiniciar la cuadrícula para probar diferentes configuraciones.</li>
          </ol>
        </div>
        
        <div className="grid grid-cols-5 gap-1 mb-4">
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className="w-12 h-12 flex items-center justify-center cursor-pointer text-xs"
                style={{
                  backgroundColor: `rgb(${255 * (1 - cell)}, ${255 * (1 - Math.abs(cell))}, ${255 * (1 + cell)})`
                }}
                onClick={() => handleCellClick(i, j)}
              >
                {cell.toFixed(2)}
              </div>
            ))
          )}
        </div>
        <p className="mb-3 text-sm">Frame: {frame}</p>
        <div className="flex space-x-2 mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300"
            onClick={toggleRunning}
          >
            {isRunning ? 'Detener' : 'Iniciar'} Animación
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300"
            onClick={resetGrid}
          >
            Reiniciar Cuadrícula
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? 'Ocultar' : 'Mostrar'} Explicación
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Explicación paso a paso:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {explanation.map((step, index) => (
              <li key={index} className={index === frame ? "font-bold" : ""}>
                {step}
              </li>
            ))}
          </ol>
        </div>
        {showExplanation && <DetailedExplanation />}
      </div>
    );
};

export default CannyEdgeAnimatedExplanation;
