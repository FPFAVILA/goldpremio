import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AutoVerificationPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Iniciando verificação...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const isVerified = localStorage.getItem('app_verified_user') === 'true';

    if (isVerified) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const runVerification = async () => {
      setStatus('Verificando navegador...');
      setProgress(20);
      await delay(400);

      const userAgent = navigator.userAgent;
      if (!userAgent || userAgent.length < 10) {
        setStatus('Verificação falhou');
        await delay(1500);
        navigate('/', { replace: true });
        return;
      }

      setStatus('Analisando conexão...');
      setProgress(45);
      await delay(500);

      const perfStart = performance.now();
      await delay(100);
      const perfEnd = performance.now();

      if (perfEnd - perfStart < 50) {
        setStatus('Verificação falhou');
        await delay(1500);
        navigate('/', { replace: true });
        return;
      }

      setStatus('Validando dispositivo...');
      setProgress(70);
      await delay(600);

      const hasLocalStorage = typeof Storage !== 'undefined';
      if (!hasLocalStorage) {
        setStatus('Verificação falhou');
        await delay(1500);
        navigate('/', { replace: true });
        return;
      }

      setStatus('Finalizando verificação...');
      setProgress(90);
      await delay(400);

      setStatus('Verificação concluída!');
      setProgress(100);
      await delay(500);

      localStorage.setItem('app_verified_user', 'true');

      navigate('/dashboard', { replace: true });
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    runVerification();
  }, [navigate]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px 30px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 30px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid #ffffff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />

        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 20px 0',
          letterSpacing: '-0.3px'
        }}>
          Verificação de Segurança
        </h2>

        <p style={{
          fontSize: '16px',
          margin: '0 0 30px 0',
          opacity: '0.9',
          fontWeight: '400'
        }}>
          {status}
        </p>

        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
            borderRadius: '50px',
            transition: 'width 0.3s ease-out'
          }} />
        </div>

        <p style={{
          fontSize: '13px',
          margin: '20px 0 0 0',
          opacity: '0.7',
          fontWeight: '400'
        }}>
          Aguarde enquanto validamos seu acesso...
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
