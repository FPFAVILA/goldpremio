# Estrutura de Rotas (HTML Puro - SEM REACT)

## Arquivos

### Rotas Principais

- **`index.html`** → Rota `/`
  - Página de manutenção (site fora do ar)
  - Sem botões, sem links
  - Apenas exibição estática

- **`cadastro.html`** → Rota `/cadastro`
  - Verificação automática client-side
  - Valida navegador, conexão e dispositivo
  - Salva `app_verified_user = true` no localStorage
  - Redireciona para `/dashboard` após verificação

- **`dashboard.html`** → Rota `/dashboard`
  - **SEU SITE ORIGINAL** (era o original-index.html)
  - Verifica localStorage no início
  - Se não verificado → mostra "Acesso Negado"
  - Se verificado → carrega o site completo
  - TODOS os assets, scripts e funcionalidades preservados

### API (Serverless Functions)

- `/api/create-pix.js` - Cria PIX na PushinPay
- `/api/check-pix.js` - Verifica status do pagamento
- `/api/webhook.js` - Recebe notificações

## Como Funciona

1. Usuário acessa `/` → vê página de manutenção
2. Usuário acessa `/cadastro` → verificação automática (2-3s)
3. Após verificação → redireciona para `/dashboard`
4. Dashboard valida localStorage → se OK, carrega site original

## LocalStorage

- **Chave:** `app_verified_user`
- **Valor:** `"true"` (string)
- **Função:** Controlar acesso ao dashboard

## Resetar Verificação (para testar)

```javascript
localStorage.removeItem('app_verified_user');
```

## Deploy

```bash
# Deploy na Vercel
npm run deploy

# Ou via Git
git add .
git commit -m "Sistema de rotas em HTML puro"
git push
```

## Importante

- **SEM REACT** - Tudo em HTML/CSS/JS vanilla
- **SEM BUILD** - Arquivos estáticos diretos
- **SEM NODE_MODULES** - Não precisa instalar nada
- Site original 100% preservado e funcional

## Estrutura de Arquivos

```
/
├── index.html              # Manutenção (/)
├── cadastro.html           # Verificação (/cadastro)
├── dashboard.html          # Site original (/dashboard)
├── api/                    # Serverless functions
│   ├── create-pix.js
│   ├── check-pix.js
│   └── webhook.js
├── assets/                 # CSS, JS, imagens do site original
│   ├── css/
│   ├── js/
│   └── img/
├── vercel.json             # Config rewrites
└── package.json            # Apenas scripts básicos
```

## URLs na Produção

- `https://seu-dominio.com/` → Manutenção
- `https://seu-dominio.com/cadastro` → Verificação
- `https://seu-dominio.com/dashboard` → Site original

Tudo funcionando 100% em HTML puro, sem React!
