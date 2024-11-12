import { Routes, Route } from '@solidjs/router';
import App from './App';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" component={App} />
    </Routes>
  );
}

export default AppRoutes;