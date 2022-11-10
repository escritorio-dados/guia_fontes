import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '#shared/routes/private';

import { ListPeriodo } from '../pages/ListPeriodos';

export function PeriodosRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ListPeriodo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
