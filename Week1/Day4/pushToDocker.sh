#!/bin/bash
IMAGENAME="app"
NAME="snojo"
SECOND="week1"



docker build -t ${IMAGENAME} .

# Get the commit id
COMMIT_ID=$(git rev-parse HEAD)
# Tag your docker image
docker tag ${IMAGENAME} ${NAME}/${SECOND}:${COMMIT_ID}
#docker tag ${IMAGENAME} ${NAME}/${SECOND}:day2
# Push to docker hub
docker push ${NAME}/${SECOND}:${COMMIT_ID}
#docker push ${NAME}/${SECOND}:day2