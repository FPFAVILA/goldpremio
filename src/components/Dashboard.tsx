import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('app_verified_user') === 'true';

    if (!verified) {
      setIsLoading(false);
      setIsVerified(false);
      return;
    }

    setIsVerified(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && isVerified) {
      const originalContent = document.getElementById('original-html-content');
      if (!originalContent) {
        fetch('/original-index.html')
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const main = doc.querySelector('main');

            if (main) {
              const container = document.getElementById('dashboard-content');
              if (container) {
                container.innerHTML = main.innerHTML;

                const scripts = doc.querySelectorAll('script');
                scripts.forEach(script => {
                  const newScript = document.createElement('script');
                  if (script.src) {
                    newScript.src = script.src;
                  } else {
                    newScript.textContent = script.textContent;
                  }
                  document.body.appendChild(newScript);
                });
              }
            }
          })
          .catch(err => console.error('Erro ao carregar conteúdo:', err));
      }
    }
  }, [isLoading, isVerified]);

  if (isLoading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ffffff'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #fe2c55',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: '#ffffff',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '50px 30px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '20px'
          }}>
            🚫
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 15px 0',
            letterSpacing: '-0.5px'
          }}>
            Acesso Negado
          </h1>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '0',
            opacity: '0.95',
            fontWeight: '400'
          }}>
            Você precisa ser verificado para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src="/original-index.html"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
      title="Dashboard"
    />
  );
}
