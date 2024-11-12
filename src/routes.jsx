import { Routes, Route } from '@solidjs/router';
import App from './App';
import Packages from './Packages';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" component={App} />
      <Route path="/packages" component={Packages} />
    </Routes>
  );
}

export default AppRoutes;