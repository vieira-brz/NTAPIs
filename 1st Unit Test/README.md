### Instalação

1. Inicie o `package.json`:
    ```bash
    npm init -y
    ```

2. Instale as dependências:
    ```bash
    npm i --save-dev typescript         # TypeScript for type checking
    npm i express                       # Express framework for building the API
    npm i --save-dev @types/express     # Type definitions for Express
    npm i jest                          # Jest for testing
    npm i --save-dev ts-jest            # TypeScript preprocessor for Jest
    npm i --save-dev @types/jest        # Type definitions for Jest
    npm i supertest                     # Supertest for HTTP assertions
    npm i --save-dev @types/supertest   # Type definitions for Supertest
    ```

### Configuração do Projeto

1. Crie o arquivo `app.ts`.

2. Crie o arquivo `server.ts`.

3. Inicialize o TypeScript:
    ```bash
    npx tsc --init
    ```

4. No arquivo `tsconfig.json`, configure:
    ```json
    {
      "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
      }
    }
    ```

5. Adicione os seguintes scripts ao `package.json`:
    ```json
    "scripts": {
      "build": "tsc",
      "dev": "tsc-watch --onSuccess 'node dist/server.js'",
      "test": "jest"
    }
    ```

6. Compile o TypeScript:
    ```bash
    npm run build
    ```

7. Para desenvolvimento, use:
    ```bash
    npm run dev
    ```

### Configuração dos Testes

1. Crie o arquivo `jest.config.json`:
    ```json
    {
      "preset": "ts-jest",
      "testEnvironment": "node"
    }
    ```

2. Crie o arquivo `app.spec.ts` na pasta `src`.