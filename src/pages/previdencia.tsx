import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PrevidenciaRedirect = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/calculadora-pgbl-vgbl');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecionando para a nova calculadora...</p>
    </div>
  );
};

export default PrevidenciaRedirect;
