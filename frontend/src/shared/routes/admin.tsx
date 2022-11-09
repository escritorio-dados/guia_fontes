import { Routes, Route } from 'react-router-dom';

import { HomeAdmin } from '#modules/admin/shared/pages/HomeAdmin';
import { UnidadesUnaspRoutes } from '#modules/admin/unidadesUnasp/routes';
import { UsersRoutes } from '#modules/admin/users/routes';

import { PrivateRoute } from './private';

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomeAdmin />
          </PrivateRoute>
        }
      />

      <Route
        path="/users/*"
        element={
          <PrivateRoute>
            <UsersRoutes />
          </PrivateRoute>
        }
      />

      <Route
        path="/unidades_unasp/*"
        element={
          <PrivateRoute>
            <UnidadesUnaspRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
