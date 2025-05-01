# Teste de Conhecimento DevOps - Ambiente Air Quality (xdeivison)

Este repositório contém a solução para o teste de conhecimento DevOps, configurando um ambiente containerizado com Frontend, Backend e Banco de Dados MySQL para a aplicação Air Quality utilizando Docker e Docker Compose.

**Autor:** xdeivison

## Tecnologias Utilizadas

* Docker / Docker Compose
* Backend: Python (Inferido do vídeo e `requirements.txt`)
* Frontend: Node.js/Vite (Inferido de `package.json`, `vite.config.js`)
* Banco de Dados: MySQL 8.0

## Pré-requisitos

* Git: [https://git-scm.com/](https://git-scm.com/)
* Docker Desktop: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) (Certifique-se que esteja rodando!)

## Estrutura do Projeto Esperada

cpid-devops-test/         <-- Pasta raiz do projeto
├── .env                  # Arquivo local com segredos (NÃO versionado)
├── .env.example          # Exemplo de variáveis de ambiente (Versionado)
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── docker-compose.yml    # Arquivo de orquestração dos contêineres
├── README.md             # Este arquivo de documentação
├── cpid-devops-airquality-backend/  # Código fonte do Backend (clonado, nome em minúsculas)
│   ├── mysql-dump/       # <-- PASTA CONTENDO O .SQL
│   │   └── AirQuality-2025-03-28-09-40-01.sql  # <-- ARQUIVO .SQL (CONFIRME!)
│   ├── Dockerfile
│   └── ...
└── CPID-DevOps-AirQuality-Frontend/ # Código fonte do Frontend (clonado)
├── Dockerfile
└── ...


## Configuração Inicial

1.  **Clonar este repositório:**
    * Certifique-se de que este repositório (`cpid-devops-test`) contém as pastas `cpid-devops-airquality-backend` (nome corrigido, minúsculas) e `CPID-DevOps-AirQuality-Frontend` dentro dele, com seus respectivos códigos-fonte clonados.

2.  **Arquivo de Inicialização SQL:**
    * Verifique se o arquivo `AirQuality-2025-03-28-09-40-01.sql` está presente no caminho `cpid-devops-airquality-backend/mysql-dump/`.
    * O `docker-compose.yml` está configurado para usar este arquivo. Se o nome ou o local for diferente, **ajuste o caminho** na seção `volumes` do serviço `db` dentro do `docker-compose.yml`.

3.  **Variáveis de Ambiente (`.env`):**
    * Copie o arquivo de exemplo para criar seu arquivo local:
        ```bash
        cp .env.example .env
        ```
    * **Edite o arquivo `.env`** e preencha as senhas `MYSQL_PASSWORD` e `MYSQL_ROOT_PASSWORD` (os padrões gerados são `testpassword123` e `superrootpassword456`).

4.  **Porta Interna do Frontend (Verificação):**
    * O `docker-compose.yml` mapeia a porta `8080` do seu computador para a porta `80` do contêiner frontend (`ports: - "8080:80"`).
    * **Recomendado:** Abra o arquivo `Dockerfile` dentro da pasta `CPID-DevOps-AirQuality-Frontend` e verifique qual porta ele expõe (`EXPOSE`) ou qual porta o comando final (`CMD`) utiliza para servir a aplicação (pode ser 80, 3000, 5173, etc.). Se **não** for a porta 80, ajuste o mapeamento no `docker-compose.yml` (ex: para `ports: - "8080:3000"` se a porta interna for 3000).

## Executando o Ambiente

1.  **Abra o Terminal:** Navegue até a pasta raiz deste projeto (`cpid-devops-test`) no seu terminal.
2.  **Construa as Imagens e Inicie os Contêineres:**
    ```bash
    docker-compose up --build -d
    ```
    *(O `--build` é necessário na primeira vez ou se houver mudanças nos Dockerfiles. O `-d` roda em background.)*
3.  **Aguarde:** Espere um pouco para os contêineres subirem e o banco de dados ser inicializado (o healthcheck ajuda nisso).
4.  **Acesse as Aplicações:**
    * **Frontend:** [http://localhost:8080](http://localhost:8080)
    * **Backend (API Docs):** [http://localhost:18003/docs](http://localhost:18003/docs)

## Verificando e Parando

* **Listar Contêineres:** `docker-compose ps`
* **Ver Logs:** `docker-compose logs -f` (ou `docker-compose logs <nome_do_servico>`)
* **Parar Contêineres:** `docker-compose down`
* **Parar e Remover Volumes (Apaga dados do DB):** `docker-compose down -v`

## Entrega (Docker Hub e GitHub)

Conforme os requisitos do teste:

1.  **Faça o Push das Imagens para o Docker Hub:**
    * Faça login: `docker login` (use suas credenciais do Docker Hub)
    * Envie as imagens (após o build):
        ```bash
        docker push xdeivison/airquality-backend:latest
        docker push xdeivison/airquality-frontend:latest
        ```
2.  **Atualize o `docker-compose.yml`:**
    * Comente ou remova as seções `build:` para os serviços `backend` e `frontend`.
    * Certifique-se que as seções `image: xdeivison/airquality-...:latest` estejam descomentadas.
    * Salve o arquivo.
3.  **Envie para o GitHub:**
    * Adicione as alterações: `git add .` (Adicione arquivos específicos se preferir, como `git add docker-compose.yml Dockerfile README.md ...`)
    * Faça o commit: `git commit -m "Finaliza configuração e aponta docker-compose para imagens do Docker Hub"`
    * Envie para o seu repositório GitHub: `git push origin main`
    * O link deste repositório GitHub é a sua entrega final.

---

## Observações de Configuração e Ajustes

Durante a configuração deste ambiente Docker, alguns ajustes foram necessários para garantir a compatibilidade e o correto funcionamento dos códigos-fonte fornecidos dentro dos contêineres:

1.  **Sensibilidade de Caso (Nome da Pasta Backend):** Foi observado que a pasta do backend no sistema de arquivos local estava como `cpid-devops-airquality-backend` (com 'c' minúsculo), enquanto referências iniciais poderiam usar 'C' maiúsculo. O arquivo `docker-compose.yml` foi ajustado para usar o nome exato `cpid-devops-airquality-backend` nos caminhos `build.context` e `volumes` para evitar possíveis erros devido à sensibilidade de caso no Docker/Linux.

2.  **Importações Python e `PYTHONPATH` (Backend):** A aplicação backend utiliza importações absolutas (ex: `from app.routers import ...`). Ao rodar dentro do contêiner Docker, isso inicialmente causou erros `ModuleNotFoundError: No module named 'app'`, pois o Python não localizava o pacote 'app' a partir do diretório de execução padrão. A solução aplicada no `Dockerfile` do backend foi:
    * Definir o `WORKDIR` para `/usr/src` (o diretório pai da pasta `app`).
    * Adicionar `/usr/src` à variável de ambiente `PYTHONPATH` usando `ENV PYTHONPATH "${PYTHONPATH}:/usr/src"`.
    * Usar `CMD ["uvicorn", "app.main:app", ...]` para iniciar a aplicação a partir do diretório pai, permitindo que tanto o Uvicorn encontre `app.main` quanto as importações internas (`from app...`) sejam resolvidas corretamente.

3.  **Variáveis de Ambiente e Pydantic (Backend):** Durante a inicialização, a aplicação backend apresentou um erro `ValidationError` do Pydantic, indicando que variáveis de ambiente esperadas para a configuração do banco de dados (`db_hostname`, `db_username`, etc.) não foram encontradas. Isso ocorreu porque os nomes esperados pela classe `Settings` no código Python (`app/db/config.py`) não correspondiam aos nomes fornecidos inicialmente via `docker-compose.yml` e `.env` (`DB_HOST`, `MYSQL_USER`, etc.). A solução foi ajustar a seção `environment` do serviço `backend` no `docker-compose.yml` para definir explicitamente as variáveis com os nomes que a aplicação espera (`DB_HOSTNAME=db`, `DB_USERNAME=${MYSQL_USER}`, etc.), garantindo que as configurações sejam carregadas corretamente.

Estes ajustes foram essenciais para que o ambiente completo funcionasse conforme o esperado.
