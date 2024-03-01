#!/bin/bash

# Defina as variáveis
BRANCH="master"
DOCKER_CONTAINER="my-academy-api"

# Pare e remova o contêiner Docker existente
sudo docker stop $DOCKER_CONTAINER && sudo docker rm $DOCKER_CONTAINER

# Atualize o código
git pull origin $BRANCH

# Reconstrua e inicie o contêiner Docker
docker run -p 80:80 -e PORT=80 -e DIRECT_URL=$DIRECT_URL -e DATABASE_URL=$DATABASE_URL --name $DOCKER_CONTAINER $DOCKER_CONTAINER
