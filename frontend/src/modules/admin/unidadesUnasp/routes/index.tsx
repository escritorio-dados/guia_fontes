import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '#shared/routes/private';

import { ListUnidadeUnasp } from '../pages/ListUnidadesUnasp';

export function UnidadesUnaspRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ListUnidadeUnasp />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
