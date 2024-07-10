### Instalação

1. Inicie o `package.json`:
    ```bash
    npm init -y
    ```

2. Instale as dependências:
    ```bash
    npm i typescript -D
    npm i express
    npm i jest -D
    npm i supertest
    npm i @types/express -D
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
      "dev": "tsc-watch --onSuccess 'node dist/server.js'"
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