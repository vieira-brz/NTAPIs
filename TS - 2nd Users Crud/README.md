# Projeto CRUD de Usuários

Este é um projeto de API RESTful simples para gerenciar um CRUD de usuários usando Node.js, TypeScript, Express e MongoDB.

## Pré-requisitos

- Node.js e npm instalados
- MongoDB instalado e em execução

## Passos para Configuração do Projeto

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd nome-do-projeto
```

### 2. Inicializar o Projeto

```bash
npm init -y
```

### 3. Instalar Dependências

```bash
npm install express mongoose
npm install --save-dev typescript @types/node @types/express @types/mongoose ts-node nodemon jest ts-jest @types/jest @types/supertest supertest
```

### 4. Configurar TypeScript

Crie um arquivo `tsconfig.json` na raiz do projeto:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

### 5. Estrutura de Diretórios

Crie a seguinte estrutura de diretórios e arquivos:

```
project/
├── src/
│   ├── controllers/
│   │   └── userController.ts
│   ├── models/
│   │   └── userModel.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── tests/
│   │   └── userController.test.ts
│   ├── app.ts
│   └── server.ts
├── tsconfig.json
├── package.json
└── jest.config.js
```

### 6. Definir o Modelo de Usuário

`src/models/userModel.ts`

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = model<IUser>('User', userSchema);

export default User;
```

### 7. Definir o Controlador de Usuário

`src/controllers/userController.ts`

```typescript
import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const updatedData: Partial<IUser> = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

### 8. Definir as Rotas de Usuário

`src/routes/userRoutes.ts`

```typescript
import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
```

### 9. Configurar o Aplicativo Express

`src/app.ts`

```typescript
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

export default app;
```

### 10. Iniciar o Servidor

`src/server.ts`

```typescript
import app from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 11. Configurar Scripts de Inicialização

Adicione os seguintes scripts ao `package.json`:

```json
"scripts": {
  "start": "ts-node src/server.ts",
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "test": "jest"
}
```

### 12. Configurar Testes com Jest

Crie um arquivo `jest.config.js` na raiz do projeto:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
```

### 13. Criar Testes para o Controlador de Usuário

`src/tests/userController.test.ts`

```typescript
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User, { IUser } from '../models/userModel';

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET /users should return an empty array', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /users should create a new user', async () => {
    const newUser: Partial<IUser> = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  it('GET /users/:id should return a user', async () => {
    const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    await newUser.save();
    const response = await request(app).get(`/users/${newUser._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  it('PUT /users/:id should update a user', async () => {
    const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    await newUser.save();
    const updatedUser: Partial<IUser> = { name: 'Jane Doe', email: 'jane@example.com' };
    const response = await request(app).put(`/users/${newUser._id}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updated

User.email);
  });

  it('DELETE /users/:id should delete a user', async () => {
    const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    await newUser.save();
    const response = await request(app).delete(`/users/${newUser._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted');
  });
});
```

### 14. Executar o Projeto

Para compilar e iniciar o servidor:
```bash
npm run dev
```

Para compilar o TypeScript e rodar o servidor:
```bash
npm run build
node dist/server.js
```

Para rodar os testes:
```bash
npm test
```