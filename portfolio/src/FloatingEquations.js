import React, { useRef, useEffect } from 'react';
import './FloatingEquations.css';

const equations = [
  { id: 1, text: 'e^{iπ} + 1 = 0', top: '10%', left: '15%' },
  { id: 2, text: '∇ × B = μ₀(J + ε₀∂E/∂t)', top: '20%', left: '70%' },
  { id: 3, text: '∫_a^b f(x)dx = F(b) - F(a)', top: '40%', left: '20%' },
  { id: 4, text: 'F = G(m₁m₂)/r²', top: '60%', left: '75%' },
  { id: 5, text: 'E = mc²', top: '80%', left: '25%' },
  { id: 6, text: 'H = -Σp(x)log p(x)', top: '30%', left: '50%' },
  { id: 7, text: '∇ · E = ρ/ε₀', top: '70%', left: '45%' },
  { id: 8, text: 'a² + b² = c²', top: '50%', left: '85%' },
];

const FloatingEquations = () => {
  const elements = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      elements.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        // Calculate distance from cursor
        const distanceX = elementX - clientX;
        const distanceY = elementY - clientY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Calculate distance from center
        const centerDistanceX = elementX - centerX;
        const centerDistanceY = elementY - centerY;
        const centerDistance = Math.sqrt(centerDistanceX * centerDistanceX + centerDistanceY * centerDistanceY);
        
        // Apply transform based on mouse position
        const moveX = (clientX - elementX) * 0.01;
        const moveY = (clientY - elementY) * 0.01;
        
        // Apply subtle rotation based on position
        const rotationX = (elementY - centerY) / 50;
        const rotationY = (elementX - centerX) / 50;
        
        // Apply the transform with smooth transition
        el.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        
        // Adjust opacity based on distance from center
        const opacity = 0.1 + (1 - Math.min(centerDistance / (Math.max(window.innerWidth, window.innerHeight) * 0.6), 1)) * 0.9;
        el.style.opacity = opacity;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="floating-equations">
      {equations.map((eq, index) => (
        <div
          key={eq.id}
          ref={el => elements.current[index] = el}
          className="equation"
          style={{
            top: eq.top,
            left: eq.left,
            fontSize: `${Math.random() * 10 + 14}px`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.7,
          }}
        >
          {eq.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingEquations;
