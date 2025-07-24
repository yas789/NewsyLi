import React, { useEffect, useState } from 'react';
import './App.css';
import D4SymmetriesDemo from './D4SymmetriesDemo';
import FractalExplorer from './FractalExplorer';

const heroText = 'CS & Mathematics';

function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    setTypedText('');

    function typeWriter() {
      if (i < heroText.length) {
        setTypedText((prev) => {
          if (prev[prev.length - 1] !== heroText.charAt(i)) {
            return prev + heroText.charAt(i);
          }
          return prev;
        });
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="hero">
      {/* Animated SVG grid background */}
      <div className="hero-grid-bg" aria-hidden="true"></div>
      {/* Floating elements */}
      <div className="floating-element fe1"></div>
      <div className="floating-element fe2"></div>
      <div className="hero-content">
        <h1 className="hero-title gradient-text">
          {typedText}
          <span className="blinking-cursor">{showCursor ? '|' : ' '}</span>
        </h1>
        <p className="hero-tagline">Complexity Theory • Algorithm Design • Mathematical Innovation</p>
        <p className="hero-description">
          Passionate about solving complex computational problems through mathematical insights and algorithmic innovation. Specializing in parameterized complexity theory, fixed-parameter tractability, and cutting-edge algorithm design.
        </p>
        <a href="#projects" className="cta-button">Explore My Work</a>
      </div>
    </section>
  );
}

function FeaturedResearch() {
  return (
    <section className="section" id="featured-research">
      <h2 className="section-title fade-in-on-scroll">Featured Research</h2>
      <div className="featured-project fade-in-on-scroll">
        <h3 className="project-title">Pattern Backtracking Algorithm</h3>
        <p className="project-subtitle">Fixed-Parameter Tractable Solution for Workflow Satisfiability</p>
        <p className="project-description">
          Developed and implemented a novel FPT algorithm that solves the Workflow Satisfiability Problem by parameterizing on the number of steps in the workflow. The Pattern Backtracking Algorithm demonstrates significant theoretical and practical improvements over existing approaches, contributing to the field of parameterized complexity theory.
        </p>
        <div className="tech-tags">
          <span className="tag">Complexity Theory</span>
          <span className="tag">FPT Algorithms</span>
          <span className="tag">Pattern Recognition</span>
          <span className="tag">Workflow Analysis</span>
          <span className="tag">Computational Optimization</span>
        </div>
        <p className="project-description">
          <strong>Key Contributions:</strong> Novel parameterization strategy, efficient backtracking with pattern pruning, theoretical analysis of runtime complexity, and comprehensive experimental validation demonstrating practical applicability to real-world workflow systems.
        </p>
      </div>
    </section>
  );
}

function ProjectPortfolio({ setPage }) {
  const projects = [
    {
      title: 'Advanced Data Structures',
      desc: 'Implementation and analysis of complex data structures including advanced tree variants, graph algorithms, and probabilistic data structures with theoretical performance analysis.',
      tags: ['C++', 'Algorithm Analysis', 'Memory Optimization']
    },
    {
      title: 'Mathematical Modeling Suite',
      desc: 'Collection of mathematical modeling projects including differential equation solvers, optimization algorithms, and statistical analysis tools with real-world applications.',
      tags: [
        { label: 'Prime Spiral Demo', onClick: () => setPage('prime-spiral'), isDemo: true },
        { label: 'Fourier Epicycles Demo', onClick: () => setPage('fourier-epicycles'), isDemo: true },
        { label: 'D4 Symmetries Demo', onClick: () => setPage('d4-symmetries'), isDemo: true },
        { label: 'Fractal Explorer Demo', onClick: () => setPage('fractal-explorer'), isDemo: true },
        { label: 'Python' },
        { label: 'NumPy' },
        { label: 'Mathematical Analysis' }
      ]
    },
    {
      title: 'Graph Theory Applications',
      desc: 'Exploration of graph algorithms including network flow optimization, shortest path variants, and graph coloring problems with applications to scheduling and resource allocation.',
      tags: ['Graph Theory', 'Optimization', 'Network Analysis']
    },
    {
      title: 'Cryptographic Protocols',
      desc: 'Implementation of modern cryptographic systems including elliptic curve cryptography, zero-knowledge proofs, and secure multi-party computation protocols.',
      tags: ['Cryptography', 'Number Theory', 'Security Protocols']
    },
    {
      title: 'Machine Learning Theory',
      desc: 'Mathematical foundations of machine learning including optimization theory, statistical learning theory, and information-theoretic approaches to learning algorithms.',
      tags: ['ML Theory', 'Statistics', 'Optimization Theory']
    },
    {
      title: 'Computational Geometry',
      desc: 'Algorithms for geometric problems including convex hull computation, Voronoi diagrams, and spatial data structures with applications to computer graphics and GIS.',
      tags: ['Geometry', 'Spatial Algorithms', 'Visualization']
    }
  ];
  return (
    <section className="section" id="projects">
      <h2 className="section-title fade-in-on-scroll">Project Portfolio</h2>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div className="project-card fade-in-on-scroll" key={i}>
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
            <div className="tech-tags">
              {proj.tags.map((tag, j) => (
                tag.isDemo ? (
                  <span
                    className="tag demo-tag"
                    key={j}
                    onClick={tag.onClick}
                    style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', color: '#fff', fontWeight: 600, border: '2px solid #a855f7', boxShadow: '0 2px 8px rgba(168,85,247,0.10)', transition: 'background 0.2s' }}
                  >
                    {tag.label}
                  </span>
                ) : (
                  <span className="tag" key={j}>{tag.label || tag}</span>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechnicalExpertise() {
  const skills = [
    {
      title: 'Mathematics & Theory',
      items: [
        'Complexity Theory', 'Algorithm Analysis', 'Graph Theory', 'Number Theory',
        'Discrete Mathematics', 'Linear Algebra', 'Probability Theory', 'Optimization'
      ]
    },
    {
      title: 'Programming & Development',
      items: [
        'Python', 'C++', 'Java', 'JavaScript', 'R', 'MATLAB', 'Git', 'LaTeX'
      ]
    },
    {
      title: 'Specialized Areas',
      items: [
        'FPT Algorithms', 'Parameterized Complexity', 'Computational Geometry',
        'Cryptography', 'Machine Learning Theory', 'Network Algorithms', 'Approximation Algorithms'
      ]
    }
  ];
  return (
    <section className="section" id="skills">
      <h2 className="section-title fade-in-on-scroll">Technical Expertise</h2>
      <div className="skills-grid">
        {skills.map((cat, i) => (
          <div className="skill-category fade-in-on-scroll" key={i}>
            <h3>{cat.title}</h3>
            <div className="skill-list">
              {cat.items.map((item, j) => (
                <span className="skill-item" key={j}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PrimeSpiralDemo() {
  const [numPoints, setNumPoints] = useState(100);
  const points = [];
  const size = 320;
  const center = size / 2;
  const scale = size / 2.2 / Math.sqrt(numPoints);
  let n = 1, count = 0;
  function isPrime(x) {
    if (x < 2) return false;
    for (let i = 2; i <= Math.sqrt(x); i++) if (x % i === 0) return false;
    return true;
  }
  while (count < numPoints) {
    if (isPrime(n)) {
      const angle = count * 0.32;
      const r = scale * Math.sqrt(count);
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      points.push(<circle key={n} cx={x} cy={y} r={3.5} fill="#a855f7" stroke="#fff" strokeWidth="1" />);
      count++;
    }
    n++;
  }
  return (
    <div className="prime-spiral-demo fade-in-on-scroll">
      <h3>Prime Number Spiral</h3>
      <svg width={size} height={size} style={{background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '1rem'}}>
        {points}
      </svg>
      <div style={{marginTop: '0.5rem'}}>
        <label htmlFor="numPoints">Number of Primes: </label>
        <input
          id="numPoints"
          type="range"
          min="20"
          max="300"
          value={numPoints}
          onChange={e => setNumPoints(Number(e.target.value))}
          style={{margin: '0 10px'}}
        />
        <span style={{color: '#a855f7', fontWeight: 600}}>{numPoints}</span>
      </div>
    </div>
  );
}

function FourierEpicyclesDemo() {
  const [N, setN] = useState(10);
  const [t, setT] = useState(0);
  const size = 400;
  const centerY = size / 2;
  const centerX = 120;
  const wave = [];
  const dt = 0.01;
  const maxWaveLength = 220;

  // Animate t
  useEffect(() => {
    let anim;
    function animate() {
      setT((prev) => prev + dt);
      anim = requestAnimationFrame(animate);
    }
    anim = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(anim);
  }, []);

  // Calculate epicycles and wave
  let x = centerX;
  let y = centerY;
  const circles = [];
  for (let k = 0; k < N; k++) {
    const n = 2 * k + 1;
    const radius = 50 * (4 / (n * Math.PI));
    const prevX = x;
    const prevY = y;
    x += radius * Math.cos(n * t);
    y += radius * Math.sin(n * t);
    circles.push(
      <g key={k}>
        <circle cx={prevX} cy={prevY} r={Math.abs(radius)} fill="none" stroke="#a855f7" strokeWidth="1.2" opacity="0.7" />
        <line x1={prevX} y1={prevY} x2={x} y2={y} stroke="#ec4899" strokeWidth="2" />
      </g>
    );
  }

  // Build the wave
  wave.unshift(y);
  if (wave.length > maxWaveLength) wave.pop();

  return (
    <div className="fade-in-on-scroll" style={{ background: '#1a1a2e', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>Mathematical Visualizations</h1>
        
        {/* Fourier Epicycles */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#fff', marginBottom: '1rem' }}>Fourier Series Epicycles</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#fff', marginRight: '1rem' }}>
              Terms: {N}
              <input
                type="range"
                min="1"
                max="20"
                value={N}
                onChange={(e) => setN(parseInt(e.target.value))}
                style={{ marginLeft: '0.5rem' }}
              />
            </label>
          </div>
          
          <svg width={size + 250} height={size} style={{ background: '#2a2a3e', borderRadius: '8px' }}>
            {circles}
            <circle cx={x} cy={y} r="3" fill="#10b981" />
            <line x1={x} y1={y} x2={centerX + 250} y2={y} stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
            
            <polyline
              points={wave.map((py, i) => `${centerX + 250 - i},${py}`).join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Modular Circle Visualization */}
        <ModularCircleDemo t={t} />
      </div>
    </div>
  );
}

function ModularCircleDemo({ t }) {
  const circleRadius = 150;
  const centerX = 200;
  const centerY = 200;
  const speeds = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]; // Slower, more varied speeds
  const vectorLength = 60;
  
  // Check if any vector is near the starting position (0 degrees)
  const threshold = 0.15; // Small threshold for "at beginning"
  const isAnyAtStart = speeds.some(speed => {
    const angle = (speed * t) % (2 * Math.PI);
    return Math.abs(angle) < threshold || Math.abs(angle - 2 * Math.PI) < threshold;
  });
  
  const circleColor = isAnyAtStart ? "#ef4444" : "#3b82f6"; // Red if any at start, blue otherwise
  
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#fff', marginBottom: '1rem' }}>Modular Rotation Circle</h2>
      <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
        Circle turns red when any vector points to the starting position (0°). 
        Each vector rotates at a different speed from the center.
      </p>
      
      <svg width={400} height={400} style={{ background: '#2a2a3e', borderRadius: '8px' }}>
        {/* Main circle */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={circleRadius} 
          fill="none" 
          stroke={circleColor} 
          strokeWidth="4"
          style={{ transition: 'stroke 0.2s' }}
        />
        
        {/* Starting position marker */}
        <line 
          x1={centerX + circleRadius - 15} 
          y1={centerY} 
          x2={centerX + circleRadius + 15} 
          y2={centerY} 
          stroke="#ffffff" 
          strokeWidth="4"
        />
        <text x={centerX + circleRadius + 25} y={centerY + 5} fill="#ffffff" fontSize="14">0°</text>
        
        {/* Rotating vector sticks */}
        {speeds.map((speed, i) => {
          const angle = speed * t;
          const endX = centerX + vectorLength * Math.cos(angle);
          const endY = centerY + vectorLength * Math.sin(angle);
          
          // Color based on proximity to start
          const normalizedAngle = angle % (2 * Math.PI);
          const isNearStart = Math.abs(normalizedAngle) < threshold || Math.abs(normalizedAngle - 2 * Math.PI) < threshold;
          const vectorColor = isNearStart ? "#fbbf24" : `hsl(${i * 45}, 70%, 60%)`;
          
          return (
            <g key={i}>
              {/* Vector stick from center */}
              <line 
                x1={centerX} 
                y1={centerY} 
                x2={endX} 
                y2={endY} 
                stroke={vectorColor} 
                strokeWidth="3"
                style={{ transition: 'stroke 0.2s' }}
              />
              
              {/* Arrowhead */}
              <polygon
                points={`${endX},${endY} ${endX - 8 * Math.cos(angle - 0.3)},${endY - 8 * Math.sin(angle - 0.3)} ${endX - 8 * Math.cos(angle + 0.3)},${endY - 8 * Math.sin(angle + 0.3)}`}
                fill={vectorColor}
                style={{ transition: 'fill 0.2s' }}
              />
              
              {/* Speed labels near the tips */}
              <text 
                x={centerX + (vectorLength + 20) * Math.cos(angle)} 
                y={centerY + (vectorLength + 20) * Math.sin(angle) + 4} 
                fill="#9ca3af" 
                fontSize="12" 
                textAnchor="middle"
              >
                {speed}×
              </text>
            </g>
          );
        })}
        
        {/* Center dot */}
        <circle cx={centerX} cy={centerY} r="4" fill="#ffffff" />
        
        {/* Status indicator */}
        <rect x={10} y={10} width={120} height={30} fill="rgba(0,0,0,0.7)" rx="5" />
        <text x={70} y={30} fill={isAnyAtStart ? "#ef4444" : "#10b981"} fontSize="14" textAnchor="middle">
          {isAnyAtStart ? "ALIGNED" : "ROTATING"}
        </text>
      </svg>
      
      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#9ca3af' }}>
        <p>Each vector rotates from the center at different speeds (shown as multipliers).</p>
        <p>The circle turns red when any vector aligns with the 0° starting position.</p>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <h2 className="section-title fade-in-on-scroll">Let's Connect</h2>
      <p style={{fontSize: '1.1rem', opacity: 0.8, marginBottom: '2rem'}}>
        Interested in collaboration, research opportunities, or discussing computational complexity theory?
      </p>
      <div className="contact-links">
        <a href="mailto:your.email@example.com" className="contact-link fade-in-on-scroll">📧 Email</a>
        <a href="https://linkedin.com/in/yourprofile" className="contact-link fade-in-on-scroll">💼 LinkedIn</a>
        <a href="https://github.com/yourusername" className="contact-link fade-in-on-scroll">🔗 GitHub</a>
        <a href="/resume.pdf" className="contact-link fade-in-on-scroll">📄 Resume</a>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width: '100%', height: '60px', display: 'block'}}>
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="url(#waveGradient)"/>
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a855f7" stopOpacity="0.18" />
            <stop offset="1" stopColor="#ec4899" stopOpacity="0.18" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('main');

  // Scroll-triggered fade-in for .fade-in-on-scroll elements
  useEffect(() => {
    function handleScroll() {
      const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
      fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('visible');
        }
      });
      // Parallax effect for floating elements
      const scrolled = window.pageYOffset;
      document.querySelectorAll('.floating-element').forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // trigger on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll for navigation links
  useEffect(() => {
    function handleNavClick(e) {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        const targetId = e.target.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  if (page === 'prime-spiral') {
    return (
      <div className="App">
        <div style={{margin: '2rem 0'}}>
          <button
            className="demo-toggle-btn"
            onClick={() => setPage('main')}
            style={{marginBottom: '2rem', padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', background: '#a855f7', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(168,85,247,0.10)', transition: 'background 0.2s'}}>
            ← Back to Portfolio
          </button>
        </div>
        <PrimeSpiralDemo />
      </div>
    );
  }
  if (page === 'fourier-epicycles') {
    return (
      <div className="App">
        <div style={{margin: '2rem 0'}}>
          <button
            className="demo-toggle-btn"
            onClick={() => setPage('main')}
            style={{marginBottom: '2rem', padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', background: '#a855f7', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(168,85,247,0.10)', transition: 'background 0.2s'}}>
            ← Back to Portfolio
          </button>
        </div>
        <FourierEpicyclesDemo />
      </div>
    );
  }
  if (page === 'd4-symmetries') {
    return (
      <div className="App">
        <div style={{margin: '2rem 0'}}>
          <button
            className="demo-toggle-btn"
            onClick={() => setPage('main')}
            style={{marginBottom: '2rem', padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', background: '#a855f7', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(168,85,247,0.10)', transition: 'background 0.2s'}}>
            ← Back to Portfolio
          </button>
        </div>
        <D4SymmetriesDemo />
      </div>
    );
  }
  if (page === 'fractal-explorer') {
    return (
      <div className="App">
        <div style={{margin: '2rem 0'}}>
          <button
            className="demo-toggle-btn"
            onClick={() => setPage('main')}
            style={{marginBottom: '2rem', padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', background: '#a855f7', color: '#fff', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(168,85,247,0.10)', transition: 'background 0.2s'}}>
            ← Back to Portfolio
          </button>
        </div>
        <FractalExplorer />
      </div>
    );
  }

  return (
    <div className="App">
      <HeroSection />
      <SectionDivider />
      <FeaturedResearch />
      <SectionDivider />
      <ProjectPortfolio setPage={setPage} />
      <SectionDivider />
      <TechnicalExpertise />
      <SectionDivider />
      <ContactSection />
    </div>
  );
}

export default App;