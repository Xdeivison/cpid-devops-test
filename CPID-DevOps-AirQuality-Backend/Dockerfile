# Usando uma imagem Python como base
FROM python:3.10

# Escolhendo o diretório de trabalho
WORKDIR /usr/src

# Copiando requirements para o container
COPY requirements.txt .

# Instalando dependências
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiando os arquivos restantes
COPY . .

# Mudando o diretório de trabalho
WORKDIR /usr/src

# Define o PYTHONPATH para incluir o diretório onde está a pasta 'app'
ENV PYTHONPATH "${PYTHONPATH}:/usr/src" # <<< ADICIONE ESTA LINHA

# Rodando o servidor do FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003"]
