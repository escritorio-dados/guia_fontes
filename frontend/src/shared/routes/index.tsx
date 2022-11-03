import { Routes, Route } from 'react-router-dom';

import { ComoUtilizar } from '#modules/home/pages/ComoUtilizar';
import { Contato } from '#modules/home/pages/Contato';
import { Faq } from '#modules/home/pages/FAQ';
import { Home } from '#modules/home/pages/Home';
import { UsoResponsavel } from '#modules/home/pages/UsoResponsavel';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/como_utilizar" element={<ComoUtilizar />} />

      <Route path="/uso_responsavel" element={<UsoResponsavel />} />

      <Route path="/contato" element={<Contato />} />

      <Route path="/faq" element={<Faq />} />
    </Routes>
  );
}
