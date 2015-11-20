#!/usr/bin/env sh
set -e

ssh root@159.203.8.77 "bash -s" < ./deploy_server_side.sh

echo "Deployed to production"
