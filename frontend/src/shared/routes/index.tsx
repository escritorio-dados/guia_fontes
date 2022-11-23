import { Routes, Route } from 'react-router-dom';

import { Auth } from '#modules/admin/users/pages/Auth';
import { ComoUtilizar } from '#modules/home/pages/ComoUtilizar';
import { Contato } from '#modules/home/pages/Contato';
import { Faq } from '#modules/home/pages/FAQ';
import { Home } from '#modules/home/pages/Home';
import { UsoResponsavel } from '#modules/home/pages/UsoResponsavel';
import { SearchDocentesImprensa } from '#modules/search/pages/Imprensa';
import { SearchDocentesPesquisa } from '#modules/search/pages/Pesquisa';

import { AdminRoutes } from './admin';
import { PrivateRoute } from './private';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/como_utilizar" element={<ComoUtilizar />} />

      <Route path="/uso_responsavel" element={<UsoResponsavel />} />

      <Route path="/contato" element={<Contato />} />

      <Route path="/faq" element={<Faq />} />

      <Route path="/auth" element={<Auth />} />

      <Route path="/docentes/imprensa" element={<SearchDocentesImprensa />} />

      <Route path="/docentes/pesquisa" element={<SearchDocentesPesquisa />} />

      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
