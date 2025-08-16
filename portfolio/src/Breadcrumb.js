import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ currentPage, setPage }) => {
  const getBreadcrumbItems = () => {
    const items = [
      { label: 'Home', page: 'main', icon: '🏠' }
    ];

    switch (currentPage) {
      case 'prime-spiral':
        items.push(
          { label: 'Interactive Demos', page: 'main', section: 'projects' },
          { label: 'Prime Spiral', page: 'prime-spiral', icon: '🌀' }
        );
        break;
      case 'fourier-epicycles':
        items.push(
          { label: 'Interactive Demos', page: 'main', section: 'projects' },
          { label: 'Fourier Epicycles', page: 'fourier-epicycles', icon: '〰️' }
        );
        break;
      case 'd4-symmetries':
        items.push(
          { label: 'Interactive Demos', page: 'main', section: 'projects' },
          { label: 'D4 Symmetries', page: 'd4-symmetries', icon: '🔄' }
        );
        break;
      case 'fractal-explorer':
        items.push(
          { label: 'Interactive Demos', page: 'main', section: 'projects' },
          { label: 'Fractal Explorer', page: 'fractal-explorer', icon: '🌿' }
        );
        break;
      case 'modulo-matrix':
        items.push(
          { label: 'Interactive Demos', page: 'main', section: 'projects' },
          { label: 'Modulo Matrix', page: 'modulo-matrix', icon: '🔢' }
        );
        break;
      default:
        // For main page, show current section if scrolled
        return items;
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  const handleBreadcrumbClick = (item, index) => {
    if (item.page === 'main' && item.section) {
      setPage('main');
      setTimeout(() => {
        const element = document.getElementById(item.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setPage(item.page);
    }
  };

  // Don't show breadcrumb if only home item
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <div className="breadcrumb-container">
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <ol className="breadcrumb-list">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              {index < breadcrumbItems.length - 1 ? (
                <button
                  className="breadcrumb-link"
                  onClick={() => handleBreadcrumbClick(item, index)}
                  type="button"
                >
                  {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                  <span className="breadcrumb-text">{item.label}</span>
                </button>
              ) : (
                <span className="breadcrumb-current">
                  {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                  <span className="breadcrumb-text">{item.label}</span>
                </span>
              )}
              
              {index < breadcrumbItems.length - 1 && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;