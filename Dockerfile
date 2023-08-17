# Use a imagem oficial do Node.js como base
FROM node:alpine

# Crie um diretório para a aplicação
WORKDIR /usr/src/app

# Copie os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o código fonte da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta 5000, que é a porta em que a aplicação Node.js irá rodar
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]
