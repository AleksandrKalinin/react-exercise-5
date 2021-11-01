import { Component } from 'react';
import ErrorTemplate from './ErrorTemplate';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorTemplate />;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;