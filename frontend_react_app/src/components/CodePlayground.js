import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Allotment } from 'allotment';
import { ErrorBoundary } from 'react-error-boundary';
import MonacoEditor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import { templates } from './ExampleTemplates';
import 'allotment/dist/style.css';
import './CodePlayground.css';

// PUBLIC_INTERFACE
const CodePlayground = ({ theme, templateKey }) => {
  // Initialize state with template code and props if provided, otherwise use default
  const [code, setCode] = useState(templateKey ? templates[templateKey]?.code : templates.default.code);
  const [props, setProps] = useState(templateKey ? templates[templateKey]?.props : templates.default.props);
  const [error, setError] = useState(null);

  // Update code and props when template changes
  useEffect(() => {
    if (templateKey && templates[templateKey]) {
      setCode(templates[templateKey].code);
      setProps(templates[templateKey].props);
      setError(null);
    }
  }, [templateKey]);

  // PUBLIC_INTERFACE
  const handleCodeChange = useCallback((value) => {
    setCode(value || '');
    setError(null);
  }, []);

  // PUBLIC_INTERFACE
  const handlePropChange = useCallback((key, value) => {
    setProps(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // PUBLIC_INTERFACE
  const compiledComponent = useMemo(() => {
    try {
      const transformed = Babel.transform(code, {
        presets: ['react'],
        plugins: ['transform-modules-umd']
      }).code;

      // Extract component name from the code using regex
      const componentNameMatch = code.match(/function\s+(\w+)\s*\(/);
      const componentName = componentNameMatch ? componentNameMatch[1] : 'MyComponent';

      // Create a function that returns the component
      // eslint-disable-next-line no-new-func
      const componentFunction = new Function(
        'React', 
        'useState', 
        'useEffect', 
        'useCallback', 
        'useMemo',
        `
        ${transformed}
        return typeof ${componentName} !== 'undefined' ? ${componentName} : null;
        `
      );

      const component = componentFunction(
        React,
        React.useState,
        React.useEffect,
        React.useCallback,
        React.useMemo
      );

      if (!component) {
        throw new Error(`Component '${componentName}' is not defined. Make sure your component function is properly declared.`);
      }

      return component;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [code]);

  // PUBLIC_INTERFACE
  const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div className="error-container">
      <h2>Something went wrong:</h2>
      <pre className="error-message">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="retry-button">
        Try again
      </button>
    </div>
  );

  // PUBLIC_INTERFACE
  const PreviewComponent = () => {
    if (error) {
      return (
        <div className="error-container">
          <h2>Compilation Error:</h2>
          <pre className="error-message">{error}</pre>
        </div>
      );
    }

    if (!compiledComponent) {
      return <div className="loading">Compiling...</div>;
    }

    const Component = compiledComponent;
    return <Component {...props} />;
  };

  return (
    <div className="code-playground">
      <Allotment>
        <Allotment.Pane minSize={300}>
          <div className="editor-section">
            <div className="section-header">
              <h3>Code Editor</h3>
            </div>
            <div className="editor-container">
              <MonacoEditor
                height="60vh"
                defaultLanguage="javascript"
                theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                value={code}
                onChange={handleCodeChange}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible'
                  },
                  automaticLayout: true
                }}
              />
            </div>
            <div className="props-panel">
              <div className="section-header">
                <h3>Props Panel</h3>
              </div>
              <div className="props-container">
                {Object.entries(props).map(([key, value]) => (
                  <div key={key} className="prop-item">
                    <label htmlFor={key}>{key}:</label>
                    <input
                      id={key}
                      type={typeof value === 'number' ? 'number' : 'text'}
                      value={value}
                      onChange={(e) => {
                        const newValue = typeof value === 'number' 
                          ? parseInt(e.target.value) || 0 
                          : e.target.value;
                        handlePropChange(key, newValue);
                      }}
                    />
                  </div>
                ))}
                <button 
                  className="add-prop-btn"
                  onClick={() => {
                    const key = prompt('Enter prop name:');
                    if (key && !props.hasOwnProperty(key)) {
                      handlePropChange(key, '');
                    }
                  }}
                >
                  Add Prop
                </button>
              </div>
            </div>
          </div>
        </Allotment.Pane>
        
        <Allotment.Pane minSize={300}>
          <div className="preview-section">
            <div className="section-header">
              <h3>Live Preview</h3>
            </div>
            <div className="preview-container">
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => setError(null)}
              >
                <PreviewComponent />
              </ErrorBoundary>
            </div>
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default CodePlayground;
