# Use a imagem oficial do Node.js como base
FROM node:alpine

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run prisma:pull
RUN npm run prisma:generate
EXPOSE 5000
CMD ["npm", "start"]
