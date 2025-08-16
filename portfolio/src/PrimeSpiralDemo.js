import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import './PrimeSpiralDemo.css';

const PrimeSpiralDemo = () => {
  const [numPoints, setNumPoints] = useState(100);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [spiralConstant, setSpiralConstant] = useState(0.32);

  const size = 400;
  const center = size / 2;

  // Enhanced prime checking function
  const isPrime = useCallback((n) => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }, []);

  // Generate prime positions
  const { primes, maxPrime } = useMemo(() => {
    const primes = [];
    let n = 2, count = 0;
    let maxPrime = 2;
    
    while (count < numPoints) {
      if (isPrime(n)) {
        const scale = size / 2.4 / Math.sqrt(numPoints);
        const angle = count * spiralConstant;
        const r = scale * Math.sqrt(count + 1);
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        
        primes.push({
          number: n,
          x,
          y,
          angle,
          radius: r,
          index: count
        });
        
        maxPrime = n;
        count++;
      }
      n++;
    }
    
    return { primes, maxPrime };
  }, [numPoints, spiralConstant, center, size, isPrime]);

  // Animation effect
  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev >= primes.length - 1) {
            setIsAnimating(false);
            return primes.length - 1;
          }
          return prev + 1;
        });
      }, 101 - animationSpeed);
    }
    return () => clearInterval(interval);
  }, [isAnimating, animationSpeed, primes.length]);

  const handleStartAnimation = () => {
    setCurrentFrame(0);
    setIsAnimating(true);
  };

  const handleStopAnimation = () => {
    setIsAnimating(false);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentFrame(primes.length - 1);
  };

  // Generate grid lines
  const gridLines = useMemo(() => {
    if (!showGrid) return [];
    const lines = [];
    const gridSpacing = 40;
    
    // Vertical lines
    for (let x = gridSpacing; x < size; x += gridSpacing) {
      lines.push(
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={size} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      );
    }
    
    // Horizontal lines
    for (let y = gridSpacing; y < size; y += gridSpacing) {
      lines.push(
        <line key={`h${y}`} x1={0} y1={y} x2={size} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      );
    }
    
    // Center cross
    lines.push(
      <g key="center">
        <line x1={center} y1={0} x2={center} y2={size} stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
        <line x1={0} y1={center} x2={size} y2={center} stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
      </g>
    );
    
    return lines;
  }, [showGrid, size, center]);

  // Render primes (animated or static)
  const visiblePrimes = isAnimating ? primes.slice(0, currentFrame + 1) : primes;

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
      <div className="prime-spiral-container">
        <div className="spiral-header">
          <h2 className="spiral-title">Prime Number Spiral</h2>
          <p className="spiral-subtitle">
            Visualizing the distribution of prime numbers in polar coordinates
          </p>
        </div>

        <div className="spiral-main-content">
          <div className="spiral-visualization">
            <div className="spiral-svg-container">
              <svg width={size} height={size} className="spiral-svg">
                {gridLines}
                
                {/* Spiral path for reference */}
                <path
                  d={`M ${center} ${center} ${primes.map((p, i) => 
                    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="rgba(168,85,247,0.2)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity={showGrid ? 1 : 0}
                />
                
                {/* Prime points */}
                {visiblePrimes.map((prime, i) => (
                  <g key={prime.number}>
                    <circle
                      cx={prime.x}
                      cy={prime.y}
                      r={isAnimating && i === currentFrame ? 6 : 4}
                      fill={isAnimating && i === currentFrame ? "#ec4899" : "#a855f7"}
                      stroke="#fff"
                      strokeWidth={isAnimating && i === currentFrame ? 2 : 1}
                      opacity={0.9}
                      className="prime-point"
                    />
                    {isAnimating && i === currentFrame && (
                      <text
                        x={prime.x}
                        y={prime.y - 12}
                        textAnchor="middle"
                        fill="#ec4899"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {prime.number}
                      </text>
                    )}
                  </g>
                ))}
                
                {/* Center point */}
                <circle cx={center} cy={center} r="3" fill="#fff" opacity="0.8" />
              </svg>
              
              <div className="spiral-info-overlay">
                <div className="info-item">
                  <span className="info-label">Primes shown:</span>
                  <span className="info-value">{isAnimating ? currentFrame + 1 : primes.length}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Largest prime:</span>
                  <span className="info-value">
                    {isAnimating && currentFrame < primes.length 
                      ? primes[currentFrame]?.number || 2
                      : maxPrime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="spiral-controls">
            <div className="control-section">
              <h3>Animation Controls</h3>
              <div className="animation-buttons">
                <button 
                  onClick={handleStartAnimation} 
                  disabled={isAnimating}
                  className="control-btn primary"
                >
                  {isAnimating ? "Playing..." : "Start Animation"}
                </button>
                <button 
                  onClick={handleStopAnimation} 
                  disabled={!isAnimating}
                  className="control-btn secondary"
                >
                  Stop
                </button>
                <button 
                  onClick={handleReset}
                  className="control-btn secondary"
                >
                  Reset
                </button>
              </div>
              
              <div className="control-group">
                <label>Animation Speed</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="control-slider"
                />
                <span className="control-value">{animationSpeed}%</span>
              </div>
            </div>

            <div className="control-section">
              <h3>Spiral Parameters</h3>
              <div className="control-group">
                <label>Number of Primes</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={numPoints}
                  onChange={(e) => setNumPoints(Number(e.target.value))}
                  className="control-slider"
                  disabled={isAnimating}
                />
                <span className="control-value">{numPoints}</span>
              </div>
              
              <div className="control-group">
                <label>Spiral Constant (θ step)</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.01"
                  value={spiralConstant}
                  onChange={(e) => setSpiralConstant(Number(e.target.value))}
                  className="control-slider"
                  disabled={isAnimating}
                />
                <span className="control-value">{spiralConstant.toFixed(2)}</span>
              </div>
              
              <div className="control-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="control-checkbox"
                  />
                  Show Grid & Spiral Path
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mathematical-explanation">
          <h3>Mathematical Foundation</h3>
          
          <div className="math-sections">
            <div className="math-section">
              <h4>Prime Number Theorem</h4>
              <div className="math-content">
                <MathJax>
                  {`The prime counting function $\\pi(x)$ approximates the number of primes less than or equal to $x$:
                  $$\\pi(x) \\sim \\frac{x}{\\ln x}$$
                  This means the density of primes decreases logarithmically.`}
                </MathJax>
              </div>
            </div>

            <div className="math-section">
              <h4>Spiral Coordinates</h4>
              <div className="math-content">
                <MathJax>
                  {`Each prime $p_n$ (the $n$-th prime) is positioned using polar coordinates:
                  $$r_n = k\\sqrt{n}, \\quad \\theta_n = n \\cdot c$$
                  where $k$ is a scaling factor and $c$ is the spiral constant.`}
                </MathJax>
              </div>
            </div>

            <div className="math-section">
              <h4>Cartesian Transformation</h4>
              <div className="math-content">
                <MathJax>
                  {`The polar coordinates are converted to Cartesian coordinates for display:
                  $$x_n = x_0 + r_n \\cos(\\theta_n)$$
                  $$y_n = y_0 + r_n \\sin(\\theta_n)$$
                  where $(x_0, y_0)$ is the center of the spiral.`}
                </MathJax>
              </div>
            </div>

            <div className="math-section">
              <h4>Pattern Analysis</h4>
              <div className="math-content">
                <MathJax>
                  {`The spiral reveals interesting patterns in prime distribution:
                  - **Galactic Structure**: Primes tend to form curved rays
                  - **Gaps**: Composite numbers create visible gaps
                  - **Density Variations**: Prime density decreases with distance from center
                  
                  The spiral constant $c = ${spiralConstant.toFixed(2)}$ affects the tightness of the spiral.`}
                </MathJax>
              </div>
            </div>
          </div>
        </div>

        <div className="insights-section">
          <h3>Key Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Prime Gaps</h4>
              <p>The spacing between consecutive primes increases on average, creating visible gaps in the spiral that grow larger as we move outward.</p>
            </div>
            <div className="insight-card">
              <h4>Galactic Arms</h4>
              <p>Primes appear to form curved "galactic arms" in the spiral, though this is partly due to the way our visual system perceives patterns.</p>
            </div>
            <div className="insight-card">
              <h4>Density Decline</h4>
              <p>The decreasing density of primes becomes visually apparent as the spiral expands, demonstrating the Prime Number Theorem.</p>
            </div>
            <div className="insight-card">
              <h4>No Simple Pattern</h4>
              <p>Despite the beautiful structure, there's no simple formula for predicting where the next prime will appear in the spiral.</p>
            </div>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default PrimeSpiralDemo;