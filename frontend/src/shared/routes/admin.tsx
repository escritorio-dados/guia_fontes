import { Routes, Route } from 'react-router-dom';

import { Home } from '#modules/home/pages/Home';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
