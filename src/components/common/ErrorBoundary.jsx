// src/components/common/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message || 'Unexpected app error' };
  }
  componentDidCatch(error, info) {
    // You can log error to service here
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            margin: '2em auto',
            maxWidth: '500px',
            background: '#ffe8e8',
            borderRadius: '8px',
            boxShadow: '0 4px 20px #fccfcf33',
            padding: '2.2em 1.2em',
            textAlign: 'center',
            color: '#a1222b',
            fontWeight: '600'
          }}
        >
          <h2>⚠️ Something went wrong</h2>
          <pre style={{ marginTop: '1.2em', color: '#b14c50', fontSize: '1em' }}>
            {this.state.errorMsg}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
