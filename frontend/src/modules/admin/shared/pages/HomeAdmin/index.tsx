import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomeAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/docentes');
  }, [navigate]);

  return <></>;
}
