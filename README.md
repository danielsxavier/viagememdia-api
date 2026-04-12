# viagememdia-api

API base construída com **Next.js (App Router)** focada em backend usando **API Routes** em `/app/api`.

## Requisitos

- Node.js 20+
- npm 10+

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Crie seu arquivo de ambiente a partir do exemplo:

```bash
cp .env.local.example .env.local
```

3. Defina um token no `.env.local`:

```env
API_TOKEN=seu-token-secreto-aqui
```

## Rodando o projeto

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

## Autenticação Bearer Token

O `middleware.ts` intercepta todas as rotas em `/api/*` e valida o header:

```http
Authorization: Bearer <token>
```

- Ausente/inválido: `401 Unauthorized`
- Válido: segue para a rota

### Tornar `/api/health` pública (opcional)

No arquivo `lib/auth.ts`, adicione o path na constante `PUBLIC_API_PATHS`:

```ts
export const PUBLIC_API_PATHS = new Set<string>(['/api/health']);
```

## Endpoint disponível

### `GET /api/health`

Resposta:

```json
{
  "status": "ok",
  "service": "viagememdia-api",
  "version": "0.0.1",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```
