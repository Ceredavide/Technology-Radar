FROM mongo:latest

WORKDIR /data
COPY ./data/users.json /data/users.json
COPY ./data/technologies.json /data/technologies.json

COPY ./mongo-init.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/mongo-init.sh
