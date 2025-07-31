import React from 'react';
import './NavigationBar.css';

// PUBLIC_INTERFACE
const NavigationBar = ({ theme, onThemeToggle, onReset, onExport, onTemplateSelect }) => {
  return (
    <nav className="navigation-bar">
      <div className="nav-left">
        <div className="nav-logo">
          <span className="logo-icon">⚛️</span>
          <span className="logo-text">React Playground</span>
        </div>
      </div>
      
      <div className="nav-center">
        <div className="nav-title">Component Playground</div>
        <select 
          className="template-selector"
          onChange={(e) => onTemplateSelect(e.target.value)}
          title="Select a template"
        >
          <option value="">Select Template</option>
          <option value="default">Basic Component</option>
          <option value="hooks">Hooks Example</option>
          <option value="form">Form Component</option>
        </select>
      </div>
      
      <div className="nav-right">
        <button 
          className="nav-button"
          onClick={onReset}
          title="Reset to default component"
        >
          🔄 Reset
        </button>
        <button 
          className="nav-button"
          onClick={onExport}
          title="Export component code"
        >
          📁 Export
        </button>
        <button 
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
