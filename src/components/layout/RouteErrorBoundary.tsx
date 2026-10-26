import { Component, type ReactNode } from 'react'
/** Lazy-load failures leave navigation and the user's saved inputs recoverable. */
export class RouteErrorBoundary extends Component<{children: ReactNode; fallback: ReactNode}, {failed: boolean}> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}
