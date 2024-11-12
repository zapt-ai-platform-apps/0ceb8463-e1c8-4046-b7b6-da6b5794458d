import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import App from './App';

const AIAppBuilder = lazy(() => import('./pages/AIAppBuilder.jsx'));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" component={App} />
      <Route path="/ai-app-builder" component={AIAppBuilder} />
    </Routes>
  );
}

export default AppRoutes;