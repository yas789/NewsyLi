import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import './EnhancedFractalExplorer.css';

const EnhancedFractalExplorer = () => {
  const canvasRef = useRef(null);
  const [fractalType, setFractalType] = useState('mandelbrot');
  const [isRendering, setIsRendering] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [centerX, setCenterX] = useState(-0.5);
  const [centerY, setCenterY] = useState(0);
  const [maxIterations, setMaxIterations] = useState(150);
  const [juliaC, setJuliaC] = useState({ real: -0.7, imag: 0.27015 });
  const [colorScheme, setColorScheme] = useState('aurora');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showEquations, setShowEquations] = useState(true);
  const [zoomHistory, setZoomHistory] = useState([]);
  const animationRef = useRef(null);

  const width = 800;
  const height = 600;

  // Enhanced color schemes
  const colorSchemes = {
    aurora: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 0];
      const t = iter / maxIter;
      const smooth = t + 1 - Math.log2(Math.log2(2)); // Smooth coloring
      return [
        Math.floor(155 * Math.sin(smooth * Math.PI * 1.5) + 100),
        Math.floor(155 * Math.sin(smooth * Math.PI * 2.0) + 50),
        Math.floor(255 * Math.sin(smooth * Math.PI * 0.8 + 1) + 100)
      ];
    },
    mathematical: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 20];
      const t = iter / maxIter;
      // Colors inspired by mathematical constants
      const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
      const e = Math.E;
      return [
        Math.floor(200 * Math.sin(t * phi * Math.PI) + 55),
        Math.floor(180 * Math.sin(t * e * Math.PI / 2) + 75),
        Math.floor(255 * Math.sin(t * Math.PI * Math.PI / 2) + 100)
      ];
    },
    thermal: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 0];
      const t = iter / maxIter;
      // Heat map colors: black -> red -> yellow -> white
      if (t < 0.25) return [Math.floor(t * 4 * 255), 0, 0];
      if (t < 0.5) return [255, Math.floor((t - 0.25) * 4 * 255), 0];
      if (t < 0.75) return [255, 255, Math.floor((t - 0.5) * 4 * 255)];
      return [255, 255, 255];
    },
    ocean: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 10];
      const t = iter / maxIter;
      return [
        Math.floor(30 + 100 * t),
        Math.floor(80 + 150 * Math.sin(t * Math.PI)),
        Math.floor(120 + 135 * Math.sin(t * Math.PI * 2))
      ];
    }
  };

  // Julia set presets
  const juliaPresets = [
    { name: 'Classic', real: -0.7, imag: 0.27015 },
    { name: 'Spiral', real: -0.8, imag: 0.156 },
    { name: 'Lightning', real: -0.4, imag: 0.6 },
    { name: 'Douady Rabbit', real: -0.123, imag: 0.745 },
    { name: 'Siegel Disk', real: -0.391, imag: -0.587 },
    { name: 'Dendrite', real: 0.3, imag: 0.5 },
    { name: 'Dragon', real: -0.75, imag: 0.1 }
  ];

  // Famous zoom locations for Mandelbrot set
  const mandelbrotLocations = [
    { name: 'Overview', x: -0.5, y: 0, zoom: 1 },
    { name: 'Seahorse Valley', x: -0.743643887037151, y: 0.13182590420533, zoom: 500 },
    { name: 'Elephant Valley', x: 0.25, y: 0, zoom: 100 },
    { name: 'Lightning', x: -1.25066, y: 0.02012, zoom: 2000 },
    { name: 'Spiral', x: -0.7463, y: 0.1102, zoom: 1000 },
    { name: 'Mini Mandelbrot', x: -0.16070135, y: 1.0375665, zoom: 8000 }
  ];

  // Complex number calculations
  const mandelbrotIteration = useCallback((cx, cy, maxIter) => {
    let zx = 0, zy = 0;
    let iter = 0;
    
    while (zx * zx + zy * zy <= 4 && iter < maxIter) {
      const temp = zx * zx - zy * zy + cx;
      zy = 2 * zx * zy + cy;
      zx = temp;
      iter++;
    }
    
    // Smooth coloring for better gradients
    if (iter < maxIter) {
      const smoothIter = iter + 1 - Math.log2(Math.log2(zx * zx + zy * zy));
      return smoothIter;
    }
    return maxIter;
  }, []);

  const juliaIteration = useCallback((zx, zy, cx, cy, maxIter) => {
    let iter = 0;
    
    while (zx * zx + zy * zy <= 4 && iter < maxIter) {
      const temp = zx * zx - zy * zy + cx;
      zy = 2 * zx * zy + cy;
      zx = temp;
      iter++;
    }
    
    if (iter < maxIter) {
      const smoothIter = iter + 1 - Math.log2(Math.log2(zx * zx + zy * zy));
      return smoothIter;
    }
    return maxIter;
  }, []);

  const renderFractal = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    
    setIsRendering(true);

    // Calculate bounds
    const aspectRatio = width / height;
    const range = 3 / zoom;
    const xMin = centerX - range * aspectRatio;
    const xMax = centerX + range * aspectRatio;
    const yMin = centerY - range;
    const yMax = centerY + range;

    const colorFunc = colorSchemes[colorScheme];

    // Render in chunks for better performance
    const chunkSize = 50;
    for (let startY = 0; startY < height; startY += chunkSize) {
      const endY = Math.min(startY + chunkSize, height);
      
      for (let y = startY; y < endY; y++) {
        for (let x = 0; x < width; x++) {
          const cx = xMin + (x / width) * (xMax - xMin);
          const cy = yMin + (y / height) * (yMax - yMin);
          
          let iterations;
          if (fractalType === 'mandelbrot') {
            iterations = mandelbrotIteration(cx, cy, maxIterations);
          } else {
            iterations = juliaIteration(cx, cy, juliaC.real, juliaC.imag, maxIterations);
          }
          
          const [r, g, b] = colorFunc(iterations, maxIterations);
          const pixelIndex = (y * width + x) * 4;
          
          imageData.data[pixelIndex] = r;
          imageData.data[pixelIndex + 1] = g;
          imageData.data[pixelIndex + 2] = b;
          imageData.data[pixelIndex + 3] = 255;
        }
      }
      
      // Update canvas progressively
      ctx.putImageData(imageData, 0, 0);
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    setIsRendering(false);
  }, [fractalType, zoom, centerX, centerY, maxIterations, juliaC, colorScheme, mandelbrotIteration, juliaIteration]);

  // Handle canvas clicks for zooming
  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas || isRendering) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert pixel coordinates to complex plane
    const aspectRatio = width / height;
    const range = 3 / zoom;
    const newCenterX = centerX + ((x / width - 0.5) * range * aspectRatio * 2);
    const newCenterY = centerY + ((y / height - 0.5) * range * 2);

    // Save zoom state for undo
    setZoomHistory(prev => [...prev, { x: centerX, y: centerY, zoom }]);

    setCenterX(newCenterX);
    setCenterY(newCenterY);
    setZoom(prev => prev * 2);
  }, [centerX, centerY, zoom, isRendering]);

  // Zoom out function
  const zoomOut = () => {
    if (zoomHistory.length > 0) {
      const lastState = zoomHistory[zoomHistory.length - 1];
      setCenterX(lastState.x);
      setCenterY(lastState.y);
      setZoom(lastState.zoom);
      setZoomHistory(prev => prev.slice(0, -1));
    } else {
      setZoom(prev => Math.max(prev / 2, 0.1));
    }
  };

  // Reset view
  const resetView = () => {
    setCenterX(fractalType === 'mandelbrot' ? -0.5 : 0);
    setCenterY(0);
    setZoom(1);
    setZoomHistory([]);
  };

  // Load preset location
  const loadPreset = (preset) => {
    setCenterX(preset.x);
    setCenterY(preset.y);
    setZoom(preset.zoom);
    setZoomHistory([]);
  };

  // Animation effect
  useEffect(() => {
    if (isAnimating && fractalType === 'julia') {
      const animate = () => {
        const time = Date.now() * 0.001 * animationSpeed;
        setJuliaC({
          real: -0.7 + 0.3 * Math.cos(time),
          imag: 0.27015 + 0.2 * Math.sin(time * 1.3)
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animationSpeed, fractalType]);

  // Render when parameters change
  useEffect(() => {
    const timeoutId = setTimeout(renderFractal, 100);
    return () => clearTimeout(timeoutId);
  }, [renderFractal]);

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
  };

  return (
    <MathJaxContext config={config}>
      <div className="enhanced-fractal-container">
        <div className="fractal-header">
          <h2 className="fractal-title">Fractal Explorer</h2>
          <p className="fractal-subtitle">
            Interactive exploration of the Mandelbrot and Julia sets with mathematical insights
          </p>
        </div>

        <div className="fractal-main-layout">
          <div className="fractal-visualization-panel">
            <div className="canvas-container">
              <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onClick={handleCanvasClick}
                className={`fractal-canvas ${isRendering ? 'rendering' : ''}`}
              />
              
              {isRendering && (
                <div className="rendering-overlay">
                  <div className="rendering-spinner"></div>
                  <p>Rendering fractal...</p>
                </div>
              )}
              
              <div className="canvas-info">
                <div className="zoom-info">
                  Zoom: {zoom.toExponential(2)}x
                </div>
                <div className="coord-info">
                  Center: ({centerX.toFixed(6)}, {centerY.toFixed(6)})
                </div>
              </div>
            </div>

            <div className="canvas-controls">
              <button onClick={zoomOut} disabled={isRendering} className="control-btn secondary">
                Zoom Out
              </button>
              <button onClick={resetView} disabled={isRendering} className="control-btn secondary">
                Reset View
              </button>
              <span className="help-text">Click to zoom in</span>
            </div>
          </div>

          <div className="fractal-controls-panel">
            <div className="control-section">
              <h3>Fractal Type</h3>
              <div className="fractal-type-buttons">
                <button
                  onClick={() => setFractalType('mandelbrot')}
                  className={`control-btn ${fractalType === 'mandelbrot' ? 'active' : ''}`}
                >
                  Mandelbrot Set
                </button>
                <button
                  onClick={() => setFractalType('julia')}
                  className={`control-btn ${fractalType === 'julia' ? 'active' : ''}`}
                >
                  Julia Set
                </button>
              </div>
            </div>

            {fractalType === 'mandelbrot' && (
              <div className="control-section">
                <h3>Famous Locations</h3>
                <div className="preset-grid">
                  {mandelbrotLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => loadPreset(location)}
                      className="preset-btn"
                      disabled={isRendering}
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {fractalType === 'julia' && (
              <div className="control-section">
                <h3>Julia Set Parameters</h3>
                <div className="julia-controls">
                  <div className="julia-inputs">
                    <label>
                      Real (c): 
                      <input
                        type="number"
                        step="0.001"
                        value={juliaC.real}
                        onChange={(e) => setJuliaC(prev => ({ ...prev, real: parseFloat(e.target.value) }))}
                        disabled={isAnimating}
                      />
                    </label>
                    <label>
                      Imaginary (c): 
                      <input
                        type="number"
                        step="0.001"
                        value={juliaC.imag}
                        onChange={(e) => setJuliaC(prev => ({ ...prev, imag: parseFloat(e.target.value) }))}
                        disabled={isAnimating}
                      />
                    </label>
                  </div>
                  
                  <div className="preset-grid">
                    {juliaPresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => setJuliaC({ real: preset.real, imag: preset.imag })}
                        className="preset-btn"
                        disabled={isAnimating}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  <div className="animation-controls">
                    <button
                      onClick={() => setIsAnimating(!isAnimating)}
                      className={`control-btn ${isAnimating ? 'stop' : 'play'}`}
                    >
                      {isAnimating ? 'Stop Animation' : 'Animate Parameters'}
                    </button>
                    {isAnimating && (
                      <label>
                        Speed:
                        <input
                          type="range"
                          min="0.1"
                          max="3"
                          step="0.1"
                          value={animationSpeed}
                          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="control-section">
              <h3>Rendering Options</h3>
              <label>
                Max Iterations: {maxIterations}
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(parseInt(e.target.value))}
                  disabled={isRendering}
                />
              </label>
              
              <label>Color Scheme:</label>
              <div className="color-scheme-buttons">
                {Object.keys(colorSchemes).map(scheme => (
                  <button
                    key={scheme}
                    onClick={() => setColorScheme(scheme)}
                    className={`control-btn ${colorScheme === scheme ? 'active' : ''}`}
                  >
                    {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showEquations && (
          <div className="mathematical-explanation">
            <div className="explanation-header">
              <h3>Mathematical Foundation</h3>
              <button 
                className="toggle-equations"
                onClick={() => setShowEquations(!showEquations)}
              >
                Hide Equations
              </button>
            </div>
            
            <div className="math-content">
              {fractalType === 'mandelbrot' ? (
                <div className="mandelbrot-math">
                  <h4>The Mandelbrot Set</h4>
                  <MathJax>
                    {`The Mandelbrot set $M$ is defined as the set of complex numbers $c$ for which the iterative formula:
                    $$z_{n+1} = z_n^2 + c$$
                    with $z_0 = 0$, remains bounded as $n \\to \\infty$.`}
                  </MathJax>
                  
                  <h4>Escape Time Algorithm</h4>
                  <MathJax>
                    {`We iterate until either:
                    $$|z_n| > 2 \\quad \\text{(divergence)}$$
                    or we reach the maximum iteration count. The number of iterations determines the color.`}
                  </MathJax>

                  <h4>Key Properties</h4>
                  <ul>
                    <li><strong>Self-similarity:</strong> The set contains infinite copies of itself at different scales</li>
                    <li><strong>Fractal dimension:</strong> Approximately 2, indicating a complex boundary structure</li>
                    <li><strong>Connectedness:</strong> The Mandelbrot set is connected (proven by Douady and Hubbard)</li>
                    <li><strong>Universality:</strong> Many dynamical systems exhibit similar behavior</li>
                  </ul>
                </div>
              ) : (
                <div className="julia-math">
                  <h4>Julia Sets</h4>
                  <MathJax>
                    {`For a fixed complex parameter $c$, the Julia set $J_c$ consists of complex numbers $z_0$ where:
                    $$z_{n+1} = z_n^2 + c$$
                    exhibits chaotic behavior on the boundary between bounded and unbounded orbits.`}
                  </MathJax>

                  <h4>Relationship to Mandelbrot Set</h4>
                  <MathJax>
                    {`- If $c \\in M$ (Mandelbrot set), then $J_c$ is connected
                    - If $c \\notin M$, then $J_c$ is a Cantor dust (totally disconnected)
                    - Current parameters: $c = ${juliaC.real.toFixed(3)} + ${juliaC.imag.toFixed(3)}i$`}
                  </MathJax>

                  <h4>Dynamical Systems Theory</h4>
                  <ul>
                    <li><strong>Fixed points:</strong> Solutions to $z^2 + c = z$</li>
                    <li><strong>Periodic orbits:</strong> Points that return to themselves after $n$ iterations</li>
                    <li><strong>Chaos:</strong> Sensitive dependence on initial conditions</li>
                    <li><strong>Strange attractors:</strong> Complex geometric structures in phase space</li>
                  </ul>
                </div>
              )}

              <div className="computational-notes">
                <h4>Computational Considerations</h4>
                <MathJax>
                  {`- **Escape radius:** We use $|z| > 2$ as the escape condition
                  - **Smooth coloring:** $\\text{smooth\\_iter} = n + 1 - \\log_2(\\log_2(|z|))$
                  - **Precision:** Higher zoom levels require arbitrary precision arithmetic
                  - **Optimization:** Symmetry and periodicity checking can speed up computation`}
                </MathJax>
              </div>
            </div>
          </div>
        )}

        <div className="fractal-insights">
          <h3>Applications & Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Complex Analysis</h4>
              <p>Fractals provide geometric intuition for complex dynamical systems and holomorphic functions.</p>
            </div>
            <div className="insight-card">
              <h4>Chaos Theory</h4>
              <p>The boundary between order and chaos in the complex plane demonstrates sensitive dependence on initial conditions.</p>
            </div>
            <div className="insight-card">
              <h4>Computer Graphics</h4>
              <p>Real-time fractal rendering pushes the boundaries of parallel computing and GPU optimization.</p>
            </div>
            <div className="insight-card">
              <h4>Mathematical Art</h4>
              <p>The infinite detail and self-similarity create naturally beautiful patterns that bridge mathematics and aesthetics.</p>
            </div>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default EnhancedFractalExplorer;