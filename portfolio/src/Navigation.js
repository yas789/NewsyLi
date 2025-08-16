import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, setPage, isVisible = true, onToggleNavigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      action: () => setPage('main'),
      subsections: [
        { id: 'hero', label: 'About', scrollTo: 'hero' },
        { id: 'research', label: 'Featured Research', scrollTo: 'featured-research' },
        { id: 'projects', label: 'Projects', scrollTo: 'projects' },
        { id: 'skills', label: 'Technical Skills', scrollTo: 'skills' },
        { id: 'contact', label: 'Contact', scrollTo: 'contact' }
      ]
    },
    {
      id: 'research',
      label: 'Research & Theory',
      icon: '🔬',
      subsections: [
        { id: 'complexity', label: 'Complexity Theory', href: '#complexity' },
        { id: 'algorithms', label: 'Algorithm Design', href: '#algorithms' },
        { id: 'publications', label: 'Publications', href: '#publications' }
      ]
    },
    {
      id: 'demos',
      label: 'Interactive Demos',
      icon: '🎮',
      subsections: [
        { 
          id: 'prime-spiral', 
          label: 'Prime Spiral', 
          action: () => setPage('prime-spiral'),
          active: currentPage === 'prime-spiral'
        },
        { 
          id: 'fourier-epicycles', 
          label: 'Fourier Epicycles', 
          action: () => setPage('fourier-epicycles'),
          active: currentPage === 'fourier-epicycles'
        },
        { 
          id: 'd4-symmetries', 
          label: 'D4 Symmetries', 
          action: () => setPage('d4-symmetries'),
          active: currentPage === 'd4-symmetries'
        },
        { 
          id: 'fractal-explorer', 
          label: 'Fractal Explorer', 
          action: () => setPage('fractal-explorer'),
          active: currentPage === 'fractal-explorer'
        },
        { 
          id: 'modulo-matrix', 
          label: 'Modulo Matrix', 
          action: () => setPage('modulo-matrix'),
          active: currentPage === 'modulo-matrix'
        }
      ]
    },
    {
      id: 'algorithms',
      label: 'Algorithm Visualizations',
      icon: '📊',
      subsections: [
        { id: 'sorting', label: 'Sorting Algorithms', href: '#sorting' },
        { id: 'graph', label: 'Graph Algorithms', href: '#graph' },
        { id: 'dynamic', label: 'Dynamic Programming', href: '#dynamic' }
      ]
    },
    {
      id: 'code',
      label: 'Code & Projects',
      icon: '💻',
      subsections: [
        { id: 'github', label: 'GitHub Repositories', href: 'https://github.com/NewsyLi' },
        { id: 'snippets', label: 'Code Snippets', href: '#snippets' },
        { id: 'documentation', label: 'Technical Docs', href: '#docs' }
      ]
    }
  ];

  // Handle scroll to section
  const handleScrollTo = (sectionId) => {
    if (currentPage !== 'main') {
      setPage('main');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsOpen(false);
  };

  // Handle external links
  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
    setIsOpen(false);
  };

  // Handle section actions
  const handleSectionAction = (item) => {
    if (item.action) {
      item.action();
    } else if (item.scrollTo) {
      handleScrollTo(item.scrollTo);
    } else if (item.href) {
      if (item.href.startsWith('http')) {
        handleExternalLink(item.href);
      } else {
        handleScrollTo(item.href.replace('#', ''));
      }
    }
    setIsOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    if (currentPage !== 'main') return;

    const handleScroll = () => {
      const sections = ['hero', 'featured-research', 'projects', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className={`nav-mobile-toggle ${isOpen ? 'nav-mobile-toggle-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Sidebar */}
      <nav className={`navigation-sidebar ${isOpen ? 'navigation-sidebar-open' : ''}`}>
        <div className="nav-header">
          <div className="nav-brand">
            <span className="nav-brand-icon">📐</span>
            <span className="nav-brand-text">Portfolio</span>
          </div>
        </div>

        <div className="nav-content">
          {navigationItems.map((section) => (
            <div key={section.id} className="nav-section">
              <div 
                className={`nav-section-header ${activeSection === section.id ? 'nav-section-active' : ''}`}
                onClick={() => section.action && section.action()}
              >
                <span className="nav-section-icon">{section.icon}</span>
                <span className="nav-section-label">{section.label}</span>
                {section.subsections && (
                  <span className="nav-section-arrow">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </div>

              {section.subsections && (
                <div className="nav-subsections">
                  {section.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      className={`nav-subsection ${subsection.active || activeSection === subsection.id ? 'nav-subsection-active' : ''}`}
                      onClick={() => handleSectionAction(subsection)}
                    >
                      <span className="nav-subsection-label">{subsection.label}</span>
                      {subsection.href && subsection.href.startsWith('http') && (
                        <span className="nav-external-icon">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                            <path d="M8 2L2 8M8 2H5M8 2V5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="nav-footer">
          <div className="nav-footer-content">
          {onToggleNavigation && (
            <button 
              className="nav-toggle-width"
              onClick={onToggleNavigation}
              title="Toggle navigation"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
              <span>Toggle Nav</span>
            </button>
          )}
          
          <div className="nav-social-links">
            <a href="mailto:zjac270@live.rhul.ac.uk" className="nav-social-link" title="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/yassir-maknaoui" className="nav-social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/NewsyLi" className="nav-social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navigation;