# projeto-final-backend
Projeto em grupo para nossas aulas de Backend, será entregue como nosso trabalho final.

## Integrantes
- Aluno 1 - Ana Carolina
- Aluno 2 - Fábio Bernardes
- Aluno 3 - Jean Lemos

## Descrição
API RESTful para gerenciar produtos com autenticação JWT, validações, documentação Swagger e testes automatizados.

## Requisitos
- Node.js >= 18
- NPM
- MongoDB Atlas (ou local)

## Instalação
1. Clone:
   git clone https://github.com/jeanfreitass/projeto-final-backend
2. Acesse a pasta:
   cd pratica10
3. Instale dependências:
   npm install
4. Crie `.env` com as variáveis MONGODB_* e JWT_*
5. Execute em desenvolvimento:
   npm run dev
6. Acesse documentação:
   http://localhost:3000/api-docs

## Testes
- Para rodar os testes:
  npm test

## Endpoints (resumo)
- POST /usuarios        -> cria usuário (201 / 422)
- POST /usuarios/login  -> login retorna token (200 / 401)
- POST /usuarios/renovar -> renovar token (200 / 401) [precisa Authorization: Bearer <token>]
- GET /usuarios         -> listar usuários (200)
- GET /usuarios/:id     -> obter por id (200 / 404)
- PUT /usuarios/:id     -> atualizar (200 / 401) [Bearer token]
- DELETE /usuarios/:id  -> deletar (204 / 401) [Bearer token]

## Observações
- Divisão de tarefas e histórico de issues: veja a aba Issues do repositório.
