import React, { useState, useRef, useEffect } from 'react';

function D4SymmetriesDemo() {
  const [currentTransform, setCurrentTransform] = useState('identity');
  const [isAnimating, setIsAnimating] = useState(false);
  const squareRef = useRef(null);

  const symmetries = [
    { id: 'identity', name: 'Identity', transform: 'rotate(0deg)', description: 'Original position' },
    { id: 'rotate90', name: 'Rotate 90°', transform: 'rotate(90deg)', description: 'Clockwise 90° rotation' },
    { id: 'rotate180', name: 'Rotate 180°', transform: 'rotate(180deg)', description: 'Half turn rotation' },
    { id: 'rotate270', name: 'Rotate 270°', transform: 'rotate(270deg)', description: 'Clockwise 270° rotation' },
    { id: 'reflectH', name: 'Reflect Horizontal', transform: 'scaleY(-1)', description: 'Reflection across horizontal axis' },
    { id: 'reflectV', name: 'Reflect Vertical', transform: 'scaleX(-1)', description: 'Reflection across vertical axis' },
    { id: 'reflectD1', name: 'Reflect Diagonal ↗', transform: 'rotate(90deg) scaleY(-1)', description: 'Reflection across main diagonal' },
    { id: 'reflectD2', name: 'Reflect Diagonal ↖', transform: 'rotate(-90deg) scaleY(-1)', description: 'Reflection across anti-diagonal' }
  ];

  const handleSymmetryClick = (symmetry) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentTransform(symmetry.id);
    
    // Reset animation after completion
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const getCurrentSymmetry = () => {
    return symmetries.find(s => s.id === currentTransform) || symmetries[0];
  };

  return (
    <div className="d4-demo-container">
      <div className="demo-header">
        <h2 className="demo-title">D4 Square Symmetries</h2>
        <p className="demo-description">
          Explore the 8 symmetries of a square: 4 rotations and 4 reflections. 
          Click any symmetry to see the smooth transformation animation.
        </p>
      </div>

      <div className="d4-main-content">
        <div className="square-container">
          <div className="coordinate-system">
            {/* Coordinate axes */}
            <div className="axis horizontal-axis"></div>
            <div className="axis vertical-axis"></div>
            <div className="axis diagonal-axis-1"></div>
            <div className="axis diagonal-axis-2"></div>
          </div>
          
          <div 
            ref={squareRef}
            className={`animated-square ${isAnimating ? 'animating' : ''}`}
            style={{
              transform: getCurrentSymmetry().transform,
              transition: isAnimating ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          >
            {/* Square with labeled corners */}
            <div className="square-face">
              <div className="corner corner-tl">A</div>
              <div className="corner corner-tr">B</div>
              <div className="corner corner-bl">D</div>
              <div className="corner corner-br">C</div>
              <div className="square-center">
                <div className="center-dot"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="controls-panel">
          <div className="current-symmetry-info">
            <h3>{getCurrentSymmetry().name}</h3>
            <p>{getCurrentSymmetry().description}</p>
          </div>

          <div className="symmetry-grid">
            <div className="symmetry-section">
              <h4>Rotations</h4>
              <div className="symmetry-buttons">
                {symmetries.slice(0, 4).map((symmetry) => (
                  <button
                    key={symmetry.id}
                    className={`symmetry-btn ${currentTransform === symmetry.id ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                    onClick={() => handleSymmetryClick(symmetry)}
                    disabled={isAnimating}
                  >
                    {symmetry.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="symmetry-section">
              <h4>Reflections</h4>
              <div className="symmetry-buttons">
                {symmetries.slice(4).map((symmetry) => (
                  <button
                    key={symmetry.id}
                    className={`symmetry-btn ${currentTransform === symmetry.id ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                    onClick={() => handleSymmetryClick(symmetry)}
                    disabled={isAnimating}
                  >
                    {symmetry.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mathematical-info">
        <h3>About D4 Group</h3>
        <p>
          The dihedral group D4 is the group of symmetries of a square. It contains 8 elements:
          4 rotations (including the identity) and 4 reflections. This group is fundamental in 
          abstract algebra and has applications in crystallography, art, and computer graphics.
        </p>
        <div className="group-properties">
          <div className="property">
            <strong>Order:</strong> 8 elements
          </div>
          <div className="property">
            <strong>Generators:</strong> 90° rotation and any reflection
          </div>
          <div className="property">
            <strong>Structure:</strong> Non-abelian (operations don't commute)
          </div>
        </div>
      </div>
    </div>
  );
}

export default D4SymmetriesDemo;
