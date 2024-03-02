#!/bin/bash

# Defina as variáveis
BRANCH="master"
DOCKER_CONTAINER="my-academy-api"

# Pare e remova o contêiner Docker existente
sudo docker stop $DOCKER_CONTAINER && sudo docker rm $DOCKER_CONTAINER

# Atualize o código
git pull origin $BRANCH

# Atualize a imagem docker
sudo docker build . -t my-academy-api

# Reconstrua e inicie o contêiner Docker
docker run -p 80:80 -e PORT=80 -e DIRECT_URL=$DIRECT_URL -e DATABASE_URL=$DATABASE_URL -e SA_TYPE=$SA_TYPE -e SA_PROJECT_ID=$SA_PROJECT_ID -e SA_PRIVATE_KEY_ID=$SA_PRIVATE_KEY -e SA_CLIENT_EMAIL=$SA_CLIENT_EMAIL -e SA_CLIENT_ID=$SA_CLIENT_ID -e SA_AUTH_URI=$SA_AUTH_URI -e SA_TOKEN_URI=$SA_TOKEN_URI -e SA_AUTH_PROVIDER=$SA_AUTH_PROVIDER -e SA_CLIENT_X509=$SA_CLIENT_X509 -e SA_UNIVERSE_DOMAIN=$SA_UNIVERSE_DOMAIN --name $DOCKER_CONTAINER --restart unless-stopped $DOCKER_CONTAINER
