import { useEffect } from 'react';

export default function MaintenancePage() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        animation: 'fadeIn 1s ease-in-out'
      }}>
        <div style={{
          fontSize: '80px',
          marginBottom: '20px',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          🔧
        </div>

        <h1 style={{
          fontSize: '42px',
          fontWeight: '700',
          margin: '0 0 20px 0',
          letterSpacing: '-0.5px'
        }}>
          Site em Manutenção
        </h1>

        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          margin: '0 0 30px 0',
          opacity: '0.95',
          fontWeight: '400'
        }}>
          Estamos realizando melhorias no sistema.
          <br />
          Em breve estaremos de volta.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50px',
          backdropFilter: 'blur(10px)',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#4ade80',
            animation: 'blink 1.5s ease-in-out infinite'
          }} />
          Voltamos em breve
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
