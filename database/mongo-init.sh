#!/bin/bash
set -e

mongoimport --uri "mongodb://localhost:27017/tech-radar" --collection Technologies --type json --file /data/technologies.json

sleep 5

mongoimport --uri "mongodb://localhost:27017/tech-radar" --collection Users --type json --file /data/users.json
