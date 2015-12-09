#! /usr/bin/env bash
set -e

if ! hash curl 2>/dev/null; then
    sudo apt-get install curl
fi

if ! hash docker 2>/dev/null; then
    curl -sSL https://get.docker.com/ | sh
    sudo usermod -aG docker $USER
fi

if ! hash docker-compose 2>/dev/null; then
    sudo curl -L https://github.com/docker/compose/releases/download/1.4.0/docker-compose-`uname -s`-`uname -m` > ./docker-compose-temp
    sudo mv ./docker-compose-temp /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

if ! hash git 2>/dev/null; then
    sudo apt-get update
    sudo apt-get install git
fi

# TODO: save previous code to a backup so that we can revert back if the build fails
if [ -e code ]; then
    sudo rm -rf code
fi

git clone https://github.com/Just-Glue-It/badger.git code


cd 'code/backend'
docker-compose build
docker-compose kill
docker-compose up -d

