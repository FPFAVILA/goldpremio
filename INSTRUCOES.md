# Instruções de Uso

## Estrutura de Rotas

### `/` - Página de Manutenção
- Exibe apenas uma tela de "Site Fora do Ar"
- SEM botões, SEM links, SEM acesso
- Página estática e morta

### `/cadastro` - Verificação Automática
- Inicia verificação automática ao acessar (2-3 segundos)
- 100% client-side (sem backend/database)
- Verifica:
  - User Agent
  - Performance timing
  - LocalStorage disponível
- Após verificação:
  - Salva `app_verified_user = true` no localStorage
  - Redireciona automaticamente para `/dashboard`
- Se já estiver verificado → redireciona direto para `/dashboard`

### `/dashboard` - Site Protegido
- Verifica localStorage antes de exibir
- Se NÃO verificado → mostra "Acesso Negado"
- Se verificado → carrega o site original (original-index.html)

## Como Instalar e Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em desenvolvimento
```bash
npm run dev
```

### 3. Build para produção
```bash
npm run build
```

### 4. Deploy na Vercel
```bash
npm run deploy
```

Ou conecte seu repositório Git na Vercel e o deploy será automático.

## Arquivos Importantes

- `src/main.tsx` - Ponto de entrada React
- `src/App.tsx` - Configuração de rotas
- `src/components/MaintenancePage.tsx` - Página de manutenção
- `src/components/AutoVerificationPage.tsx` - Verificação automática
- `src/components/Dashboard.tsx` - Dashboard protegido
- `vercel.json` - Configuração Vercel (rewrites para SPA)
- `original-index.html` - Site original (carregado no dashboard)

## Fluxo de Uso

1. Usuário acessa `/` → vê página de manutenção (sem ação possível)
2. Usuário acessa `/cadastro` → verificação automática inicia
3. Após 2-3s → salva no localStorage e redireciona para `/dashboard`
4. Dashboard valida localStorage → se OK, carrega site original

## LocalStorage

- Chave: `app_verified_user`
- Valor: `"true"` (string)
- Usado para: controlar acesso ao dashboard

## Notas Importantes

- NÃO usa banco de dados
- NÃO usa backend para verificação
- Tudo é client-side
- API PIX continua funcionando normalmente (serverless functions)
- Assets originais são copiados para `public/`
