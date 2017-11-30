#!/bin/bash
IMAGENAME="app"
NAME="snojo"
SECOND="week1"



docker build -t ${IMAGENAME}

# Get the commit id
COMMIT_ID=$(git rev-parse HEAD)
# Tag your docker image
docker tag ${IMAGENAME} ${NAME}/${SECOND}:${COMMIT_ID}
# Push to docker hub
docker push ${NAME}/${SECOND}:${COMMIT_ID}