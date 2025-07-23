import React, { useEffect, useState } from 'react';
import './App.css';

const heroText = 'CS & Mathematics';

function HeroSection() {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let i = 0;
    function typeWriter() {
      if (i < heroText.length) {
        setTypedText((prev) => prev + heroText.charAt(i));
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTypedText('');
    setTimeout(typeWriter, 500);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="hero">
      {/* Animated SVG grid background */}
      <div className="hero-grid-bg" aria-hidden="true"></div>
      {/* Floating elements */}
      <div className="floating-element fe1"></div>
      <div className="floating-element fe2"></div>
      <div className="hero-content">
        <h1 className="hero-title gradient-text">{typedText}</h1>
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
      <h2 className="section-title">Featured Research</h2>
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

function ProjectPortfolio() {
  const projects = [
    {
      title: 'Advanced Data Structures',
      desc: 'Implementation and analysis of complex data structures including advanced tree variants, graph algorithms, and probabilistic data structures with theoretical performance analysis.',
      tags: ['C++', 'Algorithm Analysis', 'Memory Optimization']
    },
    {
      title: 'Mathematical Modeling Suite',
      desc: 'Collection of mathematical modeling projects including differential equation solvers, optimization algorithms, and statistical analysis tools with real-world applications.',
      tags: ['Python', 'NumPy', 'Mathematical Analysis']
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
      <h2 className="section-title">Project Portfolio</h2>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div className="project-card fade-in-on-scroll" key={i}>
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
            <div className="tech-tags">
              {proj.tags.map((tag, j) => (
                <span className="tag" key={j}>{tag}</span>
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
      <h2 className="section-title">Technical Expertise</h2>
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

function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <h2 className="section-title">Let's Connect</h2>
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

function App() {
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
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // trigger on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <HeroSection />
      <FeaturedResearch />
      <ProjectPortfolio />
      <TechnicalExpertise />
      <ContactSection />
      {/* Other sections will go here */}
    </div>
  );
}

export default App;
