# viagememdia-api

Base inicial de API **somente backend** com **NestJS + TypeScript**, incluindo autenticação simples por **Bearer Token** e endpoint de health check.

## Requisitos

- Node.js 20+
- npm 10+

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Crie seu arquivo de ambiente:

```bash
cp .env.example .env
```

3. Ajuste as variáveis no `.env`:

```env
PORT=3000
API_TOKEN=meu-token-super-seguro
```

## Rodando o projeto

### Desenvolvimento

```bash
npm run start:dev
```

### Produção (build + start)

```bash
npm run build
npm run start:prod
```

## Endpoint inicial

### `GET /health`

Retorna:

```json
{
  "status": "ok",
  "service": "viagememdia-api",
  "version": "0.0.1",
  "timestamp": "<ISO timestamp>"
}
```

## Autenticação

A API utiliza autenticação global por Bearer Token:

- Header esperado: `Authorization: Bearer <token>`
- Token lido de `API_TOKEN` no `.env`
- Se ausente/inválido: `401` com JSON `{ "message": "Unauthorized" }`

> O endpoint `/health` está protegido por padrão.  
> Se quiser torná-lo público depois, basta usar o decorator `@Public()` no método/controlador.

## Exemplo de teste com `curl`

```bash
curl --request GET 'http://localhost:3000/health' \
  --header 'Authorization: Bearer meu-token-super-seguro'
```

Exemplo de resposta:

```json
{
  "status": "ok",
  "service": "viagememdia-api",
  "version": "0.0.1",
  "timestamp": "2026-04-12T12:00:00.000Z"
}
```
