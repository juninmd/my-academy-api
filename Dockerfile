# Use a imagem oficial do Node.js como base
FROM node:22-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g pnpm && pnpm install
EXPOSE 5000
CMD ["pnpm", "start"]
