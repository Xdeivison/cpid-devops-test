# Teste de Conhecimento DevOps - Ambiente Air Quality (deivisonviana)

Este repositório contém a solução para o teste de conhecimento DevOps, configurando um ambiente containerizado com Frontend, Backend e Banco de Dados MySQL para a aplicação Air Quality utilizando Docker e Docker Compose.

**Autor:** deivisonviana *(Ajuste se seu handle no GitHub for outro)*

## Tecnologias Utilizadas

* Docker / Docker Compose
* Backend: Python (FastAPI, Uvicorn, Pydantic, SQLAlchemy - Inferido)
* Frontend: Node.js/Vite (Inferido de `package.json`, `vite.config.js`)
* Banco de Dados: MySQL 8.0

## Pré-requisitos

* Git: [https://git-scm.com/](https://git-scm.com/)
* Docker Desktop: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) (Certifique-se que esteja rodando!)

## Estrutura do Projeto Esperada

```text
cpid-devops-test/         <-- Pasta raiz do projeto
├── .env                  # Arquivo local com segredos (NÃO versionado)
├── .env.example          # Exemplo de variáveis de ambiente (Versionado)
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── docker-compose.yml    # Arquivo de orquestração dos contêineres (Versão final usa image:)
├── README.md             # Este arquivo de documentação
├── cpid-devops-airquality-backend/  # Código fonte do Backend (clonado, nome em minúsculas)
│   ├── mysql-dump/       # <-- PASTA CONTENDO O .SQL
│   │   └── AirQuality-2025-03-28-09-40-01.sql  # <-- ARQUIVO .SQL
│   ├── Dockerfile        # <-- Dockerfile ajustado
│   └── ...
├── CPID-DevOps-AirQuality-Frontend/
│   public/                  # Arquivos públicos (favicon, imagens, etc.)
│   src/                     # Código-fonte da aplicação (componentes, páginas, etc.)
│   Dockerfile               # Dockerfile para build da imagem do frontend
│   default.conf             # Configuração personalizada do NGINX
│   docker-compose.yaml      # Orquestração do frontend via Docker
│   eslint.config.js         # Configuração do ESLint
│   index.html               # HTML base da aplicação
│   jsconfig.json            # Configuração para suporte a importações no VSCode
│   package.json             # Dependências e scripts do projeto
│   package-lock.json        # Travamento de versões das dependências
└── vite.config.js           # Configuração do Vite


    ## Configuração Inicial

1.  **Clonar este repositório:**
    * Garanta que as pastas `cpid-devops-airquality-backend` e `CPID-DevOps-AirQuality-Frontend` estejam presentes dentro da pasta raiz, contendo o código fonte original.

2.  **Arquivo de Inicialização SQL:**
    * O arquivo `AirQuality-2025-03-28-09-40-01.sql` deve estar em `cpid-devops-airquality-backend/mysql-dump/`. O `docker-compose.yml` está configurado para usá-lo a partir deste caminho.

3.  **Variáveis de Ambiente (`.env`):**
    * Copie o `.env.example` para `.env`:
        ```bash
        cp .env.example .env
        ```
    * Edite o `.env` e defina as senhas `MYSQL_PASSWORD` e `MYSQL_ROOT_PASSWORD` (padrões no exemplo: `testpassword123` e `superrootpassword456`).

4.  **Porta Interna do Frontend (Verificação Opcional):**
    * O `docker-compose.yml` mapeia a porta `8080` do host para a porta `80` do contêiner frontend. Se o `Dockerfile` do frontend servir em outra porta interna (ex: 3000, 5173), ajuste o mapeamento (ex: `"8080:3000"`).

## Executando o Ambiente (Usando Imagens do Docker Hub)

1.  **Abra o Terminal:** Navegue até a pasta raiz deste projeto (`cpid-devops-test`) no seu terminal.
2.  **Inicie os Contêineres:**
    ```bash
    docker-compose up -d
    ```
    *(Este comando irá baixar as imagens `deivisonviana/airquality-backend:latest` e `deivisonviana/airquality-frontend:latest` do Docker Hub e iniciar os contêineres).*
3.  **Aguarde:** Espere alguns segundos para os contêineres subirem e o banco de dados ficar saudável (`healthy`). Verifique com `docker-compose ps`.
4.  **Acesse as Aplicações:**
    * **Frontend:** [http://localhost:8080](http://localhost:8080) (Teste buscando dados, ex: para 28/03/2025)
    * **Backend (API Docs):** [http://localhost:18003/docs](http://localhost:18003/docs)

## Verificando e Parando

* **Listar Contêineres:** `docker-compose ps`
* **Ver Logs:** `docker-compose logs -f <nome_do_servico>` (ex: `backend`, `frontend`, `db`)
* **Parar Contêineres:** `docker-compose down`
* **Parar e Remover Volumes (Apaga dados do DB):** `docker-compose down -v`

## Entrega (Docker Hub e GitHub)

Os passos a seguir já foram executados para preparar esta entrega:

1.  **Imagens no Docker Hub:** As imagens foram construídas e enviadas para:
    * `deivisonviana/airquality-backend:latest`
    * `deivisonviana/airquality-frontend:latest`
    *(Comandos usados: `docker login -u deivisonviana`, `docker tag ...`, `docker push ...`)*

2.  **`docker-compose.yml` Atualizado:** O arquivo `docker-compose.yml` neste repositório está configurado para usar as imagens do Docker Hub (usando `image:` em vez de `build:`).

3.  **Repositório no GitHub:** Este repositório contém toda a configuração final e o código fonte. O link deste repositório é a entrega.

---

## Observações de Configuração e Ajustes Realizados

Durante a montagem do ambiente Docker solicitado, identifiquei e corrigi alguns pontos para garantir que os códigos-fonte fornecidos funcionassem corretamente dentro dos contêineres:

1.  **Nome da Pasta Backend (Case Sensitivity):** Verifiquei que a pasta do backend no meu sistema era `cpid-devops-airquality-backend` (com 'c' minúsculo). Ajustei as referências a esta pasta no arquivo `docker-compose.yml` (nas seções `build.context` e `volumes`) para usar o nome exato em minúsculas, prevenindo potenciais erros em ambientes Docker/Linux que diferenciam maiúsculas de minúsculas.

2.  **Imports Python no Backend (Dockerfile):** Ao rodar o backend no contêiner, encontrei erros `ModuleNotFoundError: No module named 'app'` que não ocorriam ao rodar localmente. Isso acontecia porque o código utiliza importações absolutas (`from app...`) e o Python, no contexto do contêiner, não encontrava o pacote `app` raiz. Para resolver isso sem alterar o código Python original, ajustei o `Dockerfile` do backend da seguinte forma:
    * Mantive o `WORKDIR /usr/src` (o diretório pai da pasta `app` do código).
    * Adicionei `ENV PYTHONPATH "${PYTHONPATH}:/usr/src"` para incluir explicitamente o diretório `/usr/src` no caminho de busca de módulos do Python.
    * Utilizei o comando `CMD ["uvicorn", "app.main:app", ...]` para iniciar a aplicação a partir do diretório pai. Essa combinação permitiu que o Python localizasse o pacote `app` tanto para iniciar o Uvicorn quanto para resolver as importações internas do código.

3.  **Variáveis de Ambiente do Backend (docker-compose.yml):** A aplicação backend apresentou um erro de validação (`ValidationError`) do Pydantic ao carregar as configurações do banco de dados (`app/db/config.py`). O erro indicava que variáveis de ambiente como `db_hostname`, `db_username`, etc., não estavam definidas. O problema era que os nomes esperados pela aplicação eram diferentes dos nomes que eu havia configurado no `.env` (`MYSQL_USER`, etc.) e no `docker-compose.yml` (`DB_HOST`). Ajustei a seção `environment` do serviço `backend` no `docker-compose.yml` para criar explicitamente as variáveis com os nomes corretos (`DB_HOSTNAME=db`, `DB_USERNAME=${MYSQL_USER}`, `DB_PASSWORD=${MYSQL_PASSWORD}`, `DB_NAME=${MYSQL_DATABASE}`), usando os valores definidos no arquivo `.env`. Isso resolveu o erro de validação e permitiu que o backend inicializasse corretamente.

Estes ajustes foram cruciais para integrar os componentes e obter o ambiente funcional conforme solicitado no teste.
