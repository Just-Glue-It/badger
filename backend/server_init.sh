#! /usr/bin/env bash
set -e

# updating repos
apt-get update
sudo apt-get install dos2unix

# install docker
sudo curl https://get.docker.com | sh

# install docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.2.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
