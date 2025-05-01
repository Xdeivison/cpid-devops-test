# Usando uma imagem node
FROM node:lts-alpine AS build

# Definindo um diretório de trabalho
WORKDIR /app

COPY package*.json .

# Instalando as dependencias da aplicacao
RUN npm install

COPY . .

# Criacao do build da aplicacao
RUN rm -rf dist && npm run build

# Usando a imagem do nginx
FROM nginx:alpine

# Copiando o build anterior para a imagem nginx
COPY --from=build /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/

# Expondo uma porta do container
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
