# projeto-final-backend

API RESTful para gerenciamento de produtos com autenticação JWT, validação, documentação com Swagger e testes automatizados com Jest.

## Integrantes 👨‍💻
- Ana Carolina
- Fábio Bernardes
- Jean Lemos


## 🛠 Tecnologias
- Node.js
- JWT (JSON Web Token)
- Jest
- Swagger
- MongoDB

## ⚙️ Requisitos
- Node.js >= 18
- NPM
- MongoDB
- Arquivo `.env` configurado


## Instalação e Uso 📩
1. Clone o repositório:
    ```sh
    git clone https://github.com/jeanfreitass/projeto-final-backend
    cd projeto-final-backend/projeto-backend
    ```
2. Instale as dependências:
    ```sh
    npm install
    npm install --save-dev jest
    npm install mongoose
    npm install jsonwebtoken
    npm install dotenv
    npm install --save-dev nodemon
    ```
3. Crie um arquivo `.env` na raiz de `projeto-backend` (veja exemplo abaixo).
4. Execute em modo desenvolvimento:
    ```sh
    npm run dev
    ```
5. Acesse a documentação Swagger:
    - http://localhost:3000/api-docs

## Exemplo de .env
```env
MONGO_DB_USER=seu_usuario
MONGO_DB_PSSWD=sua_senha
MONGO_DB_HOST=seu_host.mongodb.net
MONGO_DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_jwt
JWT_EXPIRES=1d
```

## Testes
Para rodar os testes automatizados:
```sh
npm test
```

## Endpoints da API de Produtos

### Autenticação
- As rotas de criação, alteração e exclusão de produtos exigem o header:
   `Authorization: Bearer <seu_token_jwt>`

### Modelo Produto
```json
{
   "_id": "...",
   "nome": "Camiseta",
   "valor": 49.9,
   "esgotado": false,
   "createdAt": "...",
   "updatedAt": "..."
}
```

### Rotas

#### Listar produtos
- **GET /produtos**
- Resposta: 200 OK, array de produtos

#### Criar produto
- **POST /produtos** (protegido)
- Body:
   ```json
   { "nome": "Camiseta", "valor": 49.9, "esgotado": false }
   ```
- Respostas:
   - 201 Created: produto criado
   - 400: campos obrigatórios ausentes ou valor inválido

#### Buscar produto por ID
- **GET /produtos/:id**
- Respostas:
   - 200 OK: produto encontrado
   - 400: ID inválido
   - 404: não encontrado

#### Atualizar produto
- **PUT /produtos/:id** (protegido)
- Body (qualquer campo):
   ```json
   { "nome": "Novo nome", "valor": 59.9, "esgotado": true }
   ```
- Respostas:
   - 200 OK: produto atualizado
   - 400: ID inválido ou valor inválido
   - 404: não encontrado

#### Deletar produto
- **DELETE /produtos/:id** (protegido)
- Respostas:
   - 204 No Content: deletado
   - 400: ID inválido
   - 404: não encontrado

## Observações
- Para autenticação, gere um token JWT usando as rotas de usuário (não incluídas neste exemplo).
- Para mais detalhes, consulte a documentação Swagger em `/api-docs` após rodar o projeto.
>>>>>>> develop
