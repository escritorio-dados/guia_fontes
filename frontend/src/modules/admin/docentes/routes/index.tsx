import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '#shared/routes/private';

import { ListDocente } from '../pages/ListDocentes';

export function DocentesRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ListDocente />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
