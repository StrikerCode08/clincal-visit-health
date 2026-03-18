import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 px-6 py-10">
          <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Please refresh the page or try again later.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
