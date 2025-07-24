import React, { useState, useRef, useEffect, useCallback } from 'react';

function FractalExplorer() {
  const canvasRef = useRef(null);
  const [fractalType, setFractalType] = useState('mandelbrot');
  const [isRendering, setIsRendering] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [centerX, setCenterX] = useState(-0.5);
  const [centerY, setCenterY] = useState(0);
  const [maxIterations, setMaxIterations] = useState(100);
  const [juliaC, setJuliaC] = useState({ real: -0.7, imag: 0.27015 });
  const [colorScheme, setColorScheme] = useState('classic');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const animationRef = useRef(null);

  const width = 800;
  const height = 600;

  // Color schemes
  const colorSchemes = {
    classic: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 0];
      const hue = (iter / maxIter) * 360;
      return hslToRgb(hue, 100, 50);
    },
    fire: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 0];
      const t = iter / maxIter;
      return [
        Math.floor(255 * Math.min(1, t * 2)),
        Math.floor(255 * Math.max(0, Math.min(1, (t - 0.3) * 2))),
        Math.floor(255 * Math.max(0, Math.min(1, (t - 0.7) * 3)))
      ];
    },
    ocean: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 0];
      const t = iter / maxIter;
      return [
        Math.floor(255 * Math.max(0, Math.min(1, (t - 0.5) * 2))),
        Math.floor(255 * t),
        Math.floor(255 * Math.min(1, t * 1.5))
      ];
    },
    purple: (iter, maxIter) => {
      if (iter === maxIter) return [0, 0, 0];
      const t = iter / maxIter;
      return [
        Math.floor(255 * Math.min(1, t * 1.5)),
        Math.floor(255 * Math.max(0, Math.min(1, (t - 0.3) * 1.5))),
        Math.floor(255 * Math.min(1, t * 2))
      ];
    }
  };

  // HSL to RGB conversion
  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / (1/12)) % 12;
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return [Math.floor(f(0) * 255), Math.floor(f(8) * 255), Math.floor(f(4) * 255)];
  }

  // Mandelbrot iteration
  const mandelbrotIterations = (cx, cy, maxIter) => {
    let x = 0, y = 0;
    let iter = 0;
    
    while (x * x + y * y <= 4 && iter < maxIter) {
      const xtemp = x * x - y * y + cx;
      y = 2 * x * y + cy;
      x = xtemp;
      iter++;
    }
    
    return iter;
  };

  // Julia set iteration
  const juliaIterations = (zx, zy, cx, cy, maxIter) => {
    let x = zx, y = zy;
    let iter = 0;
    
    while (x * x + y * y <= 4 && iter < maxIter) {
      const xtemp = x * x - y * y + cx;
      y = 2 * x * y + cy;
      x = xtemp;
      iter++;
    }
    
    return iter;
  };

  // Render fractal
  const renderFractal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsRendering(true);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    
    const scale = 4 / zoom;
    const offsetX = centerX - scale / 2;
    const offsetY = centerY - scale / 2;
    
    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const x = offsetX + (px / width) * scale;
        const y = offsetY + (py / height) * scale;
        
        let iterations;
        if (fractalType === 'mandelbrot') {
          iterations = mandelbrotIterations(x, y, maxIterations);
        } else {
          iterations = juliaIterations(x, y, juliaC.real, juliaC.imag, maxIterations);
        }
        
        const [r, g, b] = colorSchemes[colorScheme](iterations, maxIterations);
        const index = (py * width + px) * 4;
        
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    setIsRendering(false);
  }, [fractalType, zoom, centerX, centerY, maxIterations, juliaC, colorScheme]);

  // Handle canvas click for zooming
  const handleCanvasClick = (event) => {
    if (isRendering || isAnimating) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const scale = 4 / zoom;
    const offsetX = centerX - scale / 2;
    const offsetY = centerY - scale / 2;
    
    const newCenterX = offsetX + (x / width) * scale;
    const newCenterY = offsetY + (y / height) * scale;
    
    setCenterX(newCenterX);
    setCenterY(newCenterY);
    setZoom(zoom * 2);
  };

  // Reset view
  const resetView = () => {
    setZoom(1);
    setCenterX(fractalType === 'mandelbrot' ? -0.5 : 0);
    setCenterY(0);
  };

  // Animation functions
  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let animationZoom = zoom;
    let direction = 1; // 1 for zoom in, -1 for zoom out
    const maxZoom = 100;
    const minZoom = 1;
    const zoomStep = 0.01 * animationSpeed;
    
    const animate = () => {
      // Check the state variable instead of closure
      const currentlyAnimating = document.querySelector('.animation-btn.stop') !== null;
      if (!currentlyAnimating) return;
      
      animationZoom *= (1 + zoomStep * direction);
      
      // Reverse direction at limits
      if (animationZoom >= maxZoom) {
        direction = -1;
        animationZoom = maxZoom;
      } else if (animationZoom <= minZoom) {
        direction = 1;
        animationZoom = minZoom;
      }
      
      setZoom(animationZoom);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const stopAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };
  
  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Stop animation when fractal type changes
  useEffect(() => {
    stopAnimation();
  }, [fractalType]);

  // Preset Julia set constants
  const juliaPresets = [
    { name: 'Dragon', real: -0.7, imag: 0.27015 },
    { name: 'Spiral', real: -0.75, imag: 0.11 },
    { name: 'Lightning', real: -0.1, imag: 0.651 },
    { name: 'Dendrite', real: -0.235, imag: 0.827 },
    { name: 'Airplane', real: -0.7269, imag: 0.1889 }
  ];

  useEffect(() => {
    renderFractal();
  }, [renderFractal]);

  return (
    <div className="fractal-explorer-container">
      <div className="fractal-header">
        <h2 className="fractal-title">Fractal Explorer</h2>
        <p className="fractal-description">
          Explore the infinite complexity of fractals. Click anywhere on the fractal to zoom in and discover self-similar patterns at every scale.
        </p>
      </div>

      <div className="fractal-main-content">
        <div className="fractal-canvas-container">
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
          <div className="zoom-info">
            Zoom: {zoom.toFixed(2)}x | Center: ({centerX.toFixed(6)}, {centerY.toFixed(6)})
          </div>
        </div>

        <div className="fractal-controls">
          <div className="control-section">
            <h3>Fractal Type</h3>
            <div className="fractal-type-buttons">
              <button
                className={`fractal-btn ${fractalType === 'mandelbrot' ? 'active' : ''}`}
                onClick={() => {
                  setFractalType('mandelbrot');
                  resetView();
                }}
              >
                Mandelbrot Set
              </button>
              <button
                className={`fractal-btn ${fractalType === 'julia' ? 'active' : ''}`}
                onClick={() => {
                  setFractalType('julia');
                  resetView();
                }}
              >
                Julia Set
              </button>
            </div>
          </div>

          {fractalType === 'julia' && (
            <div className="control-section">
              <h3>Julia Set Constants</h3>
              <div className="julia-controls">
                <div className="julia-inputs">
                  <label>
                    Real: 
                    <input
                      type="number"
                      step="0.01"
                      value={juliaC.real}
                      onChange={(e) => setJuliaC({...juliaC, real: parseFloat(e.target.value)})}
                    />
                  </label>
                  <label>
                    Imaginary: 
                    <input
                      type="number"
                      step="0.01"
                      value={juliaC.imag}
                      onChange={(e) => setJuliaC({...juliaC, imag: parseFloat(e.target.value)})}
                    />
                  </label>
                </div>
                <div className="julia-presets">
                  <h4>Presets:</h4>
                  <div className="preset-buttons">
                    {juliaPresets.map((preset, index) => (
                      <button
                        key={index}
                        className="preset-btn"
                        onClick={() => setJuliaC({ real: preset.real, imag: preset.imag })}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="control-section">
            <h3>Rendering Settings</h3>
            <label>
              Max Iterations: {maxIterations}
              <input
                type="range"
                min="50"
                max="500"
                value={maxIterations}
                onChange={(e) => setMaxIterations(parseInt(e.target.value))}
              />
            </label>
          </div>

          <div className="control-section">
            <h3>Color Scheme</h3>
            <div className="color-scheme-buttons">
              {Object.keys(colorSchemes).map((scheme) => (
                <button
                  key={scheme}
                  className={`color-btn ${colorScheme === scheme ? 'active' : ''}`}
                  onClick={() => setColorScheme(scheme)}
                >
                  {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section">
            <h3>Auto Zoom Animation</h3>
            <div className="animation-controls">
              <button 
                className={`animation-btn ${isAnimating ? 'stop' : 'play'}`}
                onClick={isAnimating ? stopAnimation : startAnimation}
              >
                {isAnimating ? '⏸️ Pause Animation' : '▶️ Start Animation'}
              </button>
              <label>
                Speed: {animationSpeed}x
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  disabled={isAnimating}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Navigation</h3>
            <div className="nav-buttons">
              <button className="nav-btn" onClick={resetView}>
                Reset View
              </button>
              <button 
                className="nav-btn" 
                onClick={() => setZoom(Math.max(1, zoom / 2))}
                disabled={zoom <= 1}
              >
                Zoom Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fractal-info">
        <h3>About Fractals</h3>
        <p>
          Fractals are infinitely complex patterns that are self-similar across different scales. 
          The Mandelbrot set, discovered by Benoit Mandelbrot, is defined by the iteration of the 
          complex function f(z) = z² + c. Julia sets are closely related but use a fixed complex 
          parameter c while varying the initial point z.
        </p>
        <div className="fractal-facts">
          <div className="fact">
            <strong>Mandelbrot Set:</strong> Points c where the orbit of 0 under z² + c remains bounded
          </div>
          <div className="fact">
            <strong>Julia Set:</strong> Points z where the orbit under z² + c remains bounded for fixed c
          </div>
          <div className="fact">
            <strong>Zoom Depth:</strong> Fractals maintain detail at infinite magnification levels
          </div>
        </div>
      </div>
    </div>
  );
}

export default FractalExplorer;
