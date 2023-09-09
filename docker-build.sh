#!/bin/sh

PUSH=$1
NO_CACHE=$2
DATE="$(date "+%Y%m%d%H%M")"
REPOSITORY_PREFIX="latonaio"
SERVICE_NAME="ui-frontend-for-data-platform-smartphone"

#DOCKER_BUILDKIT=1 docker build --build-arg ENV_TARGET=aws --progress=plain -t ${SERVICE_NAME}:"${DATE}" .

if [[ $NO_CACHE == "true" ]]; then
  DOCKER_BUILDKIT=1 docker build --platform linux/amd64 --build-arg ENV_TARGET=aws --progress=plain -t ${SERVICE_NAME}:"${DATE}" . --no-cache
else
  DOCKER_BUILDKIT=1 docker build --platform linux/amd64 --build-arg ENV_TARGET=aws --progress=plain -t ${SERVICE_NAME}:"${DATE}" .
fi

# tagging
docker tag ${SERVICE_NAME}:"${DATE}" ${SERVICE_NAME}:latest
docker tag ${SERVICE_NAME}:"${DATE}" ${REPOSITORY_PREFIX}/${SERVICE_NAME}:"${DATE}"
docker tag ${REPOSITORY_PREFIX}/${SERVICE_NAME}:"${DATE}" ${REPOSITORY_PREFIX}/${SERVICE_NAME}:latest

if [[ $PUSH == "push" ]]; then
  docker push ${REPOSITORY_PREFIX}/${SERVICE_NAME}:"${DATE}"
  docker push ${REPOSITORY_PREFIX}/${SERVICE_NAME}:latest
fi
