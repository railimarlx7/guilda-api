# Guild Registry API

API de registro de um reino RPG construída com NestJS e TypeScript.

Projeto educacional da **Guilda de QA** — usado para ensinar design de APIs REST,
validação, regras de negócio e testes automatizados.

---

## Stack

- NestJS + TypeScript
- class-validator / class-transformer
- Swagger (documentação interativa)
- Armazenamento em memória (sem banco de dados)

---

## Pré-requisitos

- Node.js LTS (`node -v`)
- npm (`npm -v`)

---

## Como executar

```bash
# 1. Instalar dependências
npm install

# 2. Subir em modo desenvolvimento (hot reload)
npm run start:dev

# 3. Acessar a API
http://localhost:3000

# 4. Acessar a documentação Swagger
http://localhost:3000/docs
```

---

## Endpoints disponíveis

### Guilds

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/guilds` | Criar uma guild |
| `GET` | `/guilds` | Listar todas as guilds |
| `GET` | `/guilds/:id` | Buscar guild por id |

### Players

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/players` | Criar um player |
| `GET` | `/players` | Listar todos os players |
| `GET` | `/players/:id` | Buscar player por id |

### Characters

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/characters` | Criar um character |
| `GET` | `/characters` | Listar todos os characters |
| `GET` | `/characters/:id` | Buscar character por id |

---

## Exemplos de payload

### POST /guilds

```json
{
  "name": "Shadow Wolves",
  "realm": "Valoria"
}
```

### POST /players

```json
{
  "name": "Junior",
  "email": "junior@guild.com",
  "guildId": "<id retornado pelo POST /guilds>"
}
```

### POST /characters

```json
{
  "playerId": "<id retornado pelo POST /players>",
  "name": "Arthos",
  "class": "warrior",
  "attributes": {
    "strength": 10,
    "dexterity": 8,
    "intelligence": 5,
    "vitality": 12,
    "luck": 5
  }
}
```

Classes disponíveis: `warrior`, `mage`, `archer`, `rogue`, `paladin`, `healer`

---

## Desafio

Esta API foi entregue com **bugs propositais** para prática de testes.

O desafio tem duas etapas:

### Etapa 1 — Mapear os cenários

Explore a API com Postman, Bruno ou curl e levante os cenários de teste.
Para cada endpoint, pense em:

- Qual é o caminho feliz? O que a API deve retornar quando tudo está certo?
- Quais campos são obrigatórios? O que acontece se estiverem ausentes ou inválidos?
- Quais são as regras de negócio? Duplicidade, relacionamentos, limites?
- O que acontece com ids inexistentes?

Use a tabela abaixo como ponto de partida:

| # | Endpoint | Cenário | Status esperado |
|---|----------|---------|-----------------|
| 1 | `POST /guilds` | Criar guild com payload válido | 201 |
| 2 | `POST /guilds` | Criar guild sem `name` | 400 |
| 3 | `POST /guilds` | Criar guild com `name` duplicado | 409 |
| 4 | `GET /guilds` | Listar guilds em ordem de criação | 200 |
| 5 | `GET /guilds/:id` | Buscar guild existente | 200 |
| 6 | `GET /guilds/:id` | Buscar guild inexistente | 404 |
| … | … | _continue mapeando_ | … |

### Etapa 2 — Automatizar e encontrar os bugs

Com os cenários mapeados, escreva testes automatizados.
A API contém bugs em diferentes níveis de dificuldade:

- **Fácil** — aparecem nos primeiros testes, falha imediata e mensagem clara
- **Difícil** — passam no caminho feliz, só aparecem em casos específicos
- **Intermitente** — falham de forma imprevisível, exigem múltiplas execuções

Critério de conclusão do desafio: todos os bugs encontrados, documentados e corrigidos.

---

## Dica para os testes

A API usa armazenamento em memória — cada vez que o servidor reinicia, os dados são apagados.
Use `beforeEach` / `afterEach` nos testes para garantir estado limpo entre os cenários.

```ts
beforeEach(async () => {
  // sobe a aplicação com ValidationPipe
  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.init();
});

afterEach(async () => {
  await app.close(); // derruba e limpa o estado
});
```
