import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import CodePlayground from './components/CodePlayground';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    // This will be handled by the CodePlayground component
    window.location.reload();
  };

  // PUBLIC_INTERFACE
  const handleExport = () => {
    // Get the code from localStorage or state and create a downloadable file
    const codeElement = document.querySelector('.monaco-editor textarea');
    const code = codeElement ? codeElement.value : 'No code to export';
    
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'component.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // PUBLIC_INTERFACE
  const handleTemplateSelect = (templateKey) => {
    setSelectedTemplate(templateKey);
  };

  return (
    <div className="App">
      <NavigationBar 
        theme={theme}
        onThemeToggle={toggleTheme}
        onReset={handleReset}
        onExport={handleExport}
        onTemplateSelect={handleTemplateSelect}
      />
      <CodePlayground theme={theme} templateKey={selectedTemplate} />
    </div>
  );
}

export default App;
